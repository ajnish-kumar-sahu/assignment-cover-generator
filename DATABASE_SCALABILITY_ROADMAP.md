# ScholarFlow Database - Scalability Roadmap

## Future-Proof Design & Expansion Strategy

---

## Executive Summary

ScholarFlow database is architected to scale from current (100K users, 5M documents) to enterprise scale (10M users, 500M documents) without major redesigns. This document outlines growth stages and expansion strategies.

---

## Growth Stages & Architecture

### Stage 1: Current (2026)
**Metrics**: 100K users, 5M covers, 50M exports
**Architecture**: Single PostgreSQL (via Supabase)
**Database Size**: ~50GB
**Performance**: Sub-100ms queries

**No changes needed** - Current schema handles this scale.

---

### Stage 2: Early Growth (2027-2028)
**Metrics**: 500K users, 25M covers, 250M exports
**Database Size**: ~250GB
**Potential Issues**: Table bloat, index size

#### Changes Required
```sql
-- Add table partitioning by date
CREATE TABLE covers_2026_q1 PARTITION OF covers
  FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');

-- Archive old exports
CREATE TABLE cover_exports_archive AS
SELECT * FROM cover_exports WHERE generated_at < NOW() - INTERVAL '2 years';
DELETE FROM cover_exports WHERE generated_at < NOW() - INTERVAL '2 years';

-- Add columnar compression for audit logs
ALTER TABLE audit_logs SET (compression = pglz);
```

---

### Stage 3: Mature Growth (2028-2029)
**Metrics**: 2M users, 100M covers, 1B exports
**Database Size**: ~1TB
**Required Changes**: Sharding, read replicas

#### Horizontal Scaling Strategy

```sql
-- Option A: Shard by user_id (hash-based)
-- Database 1: users 0-500K
-- Database 2: users 500K-1M
-- Database 3: users 1M-1.5M
-- Database 4: users 1.5M-2M

-- Routing logic in application:
-- user_shard = hash(user_id) % 4
-- connect to database[user_shard]

-- Benefits:
-- - 4x capacity per table
-- - Parallel writes to covers
-- - Each DB: 100K users (manageable)

-- Schema stays identical across shards
-- user_profiles, covers, exports all sharded together
```

---

### Stage 4: Enterprise Scale (2030+)
**Metrics**: 10M users, 500M covers, 5B exports
**Architecture**: Multi-shard, multi-region

#### Multi-Region Strategy
```sql
-- Regional Databases
-- REGION 1 (North America): 3M users, 150M covers
-- REGION 2 (Europe): 4M users, 200M covers
-- REGION 3 (Asia): 3M users, 150M covers

-- Central Database
-- Contains: institutions, templates, audit_logs (replicated)
-- Real-time sync via CDC (Change Data Capture)

-- Benefits:
-- - Lower latency (users in nearest region)
-- - Disaster recovery (region-isolated)
-- - Regulatory compliance (data residency)
```

---

## Partitioning Strategy

### Temporal Partitioning (By Date)

**Best for**: covers, cover_exports, audit_logs

```sql
-- Covers partitioned by creation month
CREATE TABLE covers_2026_01 PARTITION OF covers
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE covers_2026_02 PARTITION OF covers
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

-- Benefits:
-- - Smaller indexes (per partition)
-- - Faster scans (skip irrelevant partitions)
-- - Easy archival (drop old partitions)
-- - Parallel queries (query multiple partitions simultaneously)

-- Example: Archive 2-year-old data
DROP TABLE covers_2024_01;
-- Much faster than: DELETE FROM covers WHERE created_at < '2024-02-01'
```

### List Partitioning (By Status)

**Best for**: covers, cover_exports

```sql
-- Covers partitioned by visibility status
CREATE TABLE covers_private PARTITION OF covers
  FOR VALUES IN ('private');

CREATE TABLE covers_shared PARTITION OF covers
  FOR VALUES IN ('shared');

CREATE TABLE covers_public PARTITION OF covers
  FOR VALUES IN ('public');

-- Benefits:
-- - Index on public_covers much smaller
-- - Public covers queries faster
-- - Separate index strategies per partition
```

### Hash Partitioning (For Sharding)

**Best for**: User-based sharding at enterprise scale

```sql
-- Future: When we need 4-way sharding
-- Covers distributed by user_id hash

CREATE TABLE covers_shard_0 PARTITION OF covers
  FOR VALUES WITH (MODULUS 4, REMAINDER 0);

CREATE TABLE covers_shard_1 PARTITION OF covers
  FOR VALUES WITH (MODULUS 4, REMAINDER 1);

CREATE TABLE covers_shard_2 PARTITION OF covers
  FOR VALUES WITH (MODULUS 4, REMAINDER 2);

CREATE TABLE covers_shard_3 PARTITION OF covers
  FOR VALUES WITH (MODULUS 4, REMAINDER 3);

-- Benefits:
-- - Even distribution across shards
-- - Covers evenly split
-- - Each shard: 25M covers
```

---

## Caching Strategy

### Application-Level Cache

**Template Cache** (Small, static)
```sql
-- Load on startup
SELECT * FROM templates;
-- Cache for entire app lifecycle
-- Invalidate on admin template update
```

**Institution Cache** (Medium, read-heavy)
```sql
-- Load institutions on-demand
SELECT * FROM institutions WHERE verified = true;
-- Cache for 1 hour
-- Invalidate on manual update
```

### Database Query Cache

**Index-Only Scans**
```sql
-- User profile lookups (index covers all fields)
CREATE INDEX idx_user_full ON user_profiles(id) 
INCLUDE (email, display_name, institution_id);

-- Query returns from index (cache hit)
SELECT email, display_name FROM user_profiles WHERE id = X;
```

**Materialized Views** (Pre-computed results)
```sql
-- Institution statistics (pre-calculated)
CREATE MATERIALIZED VIEW institution_stats AS
SELECT 
  i.id,
  i.name,
  COUNT(DISTINCT up.id) as user_count,
  COUNT(DISTINCT c.id) as cover_count
FROM institutions i
LEFT JOIN user_profiles up ON up.institution_id = i.id
LEFT JOIN covers c ON c.user_id = up.id
GROUP BY i.id, i.name;

CREATE INDEX idx_institution_stats ON institution_stats(id);

-- Refresh on schedule
REFRESH MATERIALIZED VIEW CONCURRENTLY institution_stats;
-- Runs nightly at 2 AM
-- Doesn't block queries
```

---

## Read Replica Strategy

### For High Read Volume

```sql
-- Primary Database (writes)
-- - Hosted in us-east-1 (primary region)
-- - All writes go here
-- - Size: handles user writes (~1000 writes/sec)

-- Read Replica 1 (analytics)
-- - Queries: Reports, dashboards, statistics
-- - Slightly stale (~100ms replication lag)
-- - No lock contention with writes

-- Read Replica 2 (backups)
-- - Continuous backup server
-- - Can be promoted if primary fails
-- - ~500ms replication lag acceptable

-- Read Replica 3 (OLAP/Reporting)
-- - Separate from OLTP primary
-- - Optimized for complex queries
-- - ~1 second lag acceptable
```

### Routing Logic

```javascript
// In application code
const isPrimaryQuery = writeOperation;
const isAnalyticsQuery = reportQuery;

const db = isPrimaryQuery 
  ? primaryConnection 
  : isAnalyticsQuery 
    ? analyticsReplica 
    : readReplica1;

await db.query(sql);
```

---

## Data Archive & Retention

### Archive Strategy

**Data Lifecycle**:
```
ACTIVE (0-30 days)      → Frequently accessed
WARM (1 month - 1 year) → Occasionally accessed
COLD (1-2 years)        → Rarely accessed
ARCHIVED (2+ years)     → Compliance only
```

**Implementation**:
```sql
-- ACTIVE: Main covers table
SELECT * FROM covers WHERE created_at > NOW() - INTERVAL '30 days';

-- WARM: Covers partition for past year
-- Separate partition: covers_2025
-- Index maintenance once weekly

-- COLD: Archive table with compression
CREATE TABLE covers_archive (
  LIKE covers INCLUDING ALL
) WITH (compression = pglz);

-- Move old covers to archive
INSERT INTO covers_archive 
SELECT * FROM covers WHERE created_at < NOW() - INTERVAL '2 years';

DELETE FROM covers WHERE created_at < NOW() - INTERVAL '2 years';

-- ARCHIVED: Immutable snapshot
-- Store in S3 with Parquet format
-- Query via external table if needed
```

### Deletion & GDPR Compliance

**Right to be Forgotten**:
```sql
-- Mark user for deletion
UPDATE user_profiles SET deleted_at = NOW() WHERE id = X;

-- Async job: Delete user's data
DELETE FROM covers WHERE user_id = X;
DELETE FROM cover_exports WHERE user_id = X;
DELETE FROM cover_shares WHERE shared_by_user_id = X;
DELETE FROM user_profiles WHERE id = X;

-- Audit logged (audit_logs not deleted)
SELECT * FROM audit_logs WHERE user_id = X;
```

---

## Index Optimization Over Time

### Stage 1: Initial Indexes (100K users)
- Total index size: ~50MB
- Focus: Correctness

### Stage 2: Growth Indexes (500K users)
- Total index size: ~300MB
- Add: Partial indexes, covering indexes
- Remove: Redundant single-column indexes

### Stage 3: Mature Indexes (2M users)
- Total index size: ~2GB
- Strategy: Horizontal partitioning per partition
- Compression: INCLUDE columns

### Stage 4: Enterprise Indexes (10M users)
- Total index size: ~10GB across shards
- Strategy: Sharded indexes (per shard: ~2.5GB)
- Maintenance: Scheduled reindex during low traffic

---

## Query Optimization Roadmap

### Stage 1: No optimization needed
All queries sub-100ms with current indexes

### Stage 2: Optimization required (500K users)
```sql
-- Problematic query now
SELECT * FROM covers 
WHERE user_id IN (SELECT id FROM user_profiles WHERE institution_id = 1)
ORDER BY created_at DESC;

-- Optimized version
SELECT c.* FROM covers c
JOIN user_profiles up ON up.id = c.user_id
WHERE up.institution_id = 1
ORDER BY c.created_at DESC;
-- Add index: (institution_id, user_id)
```

### Stage 3: Analytics optimization (2M users)
```sql
-- Use read replica for heavy analytics
-- Pre-calculate in materialized view
-- Use columnar storage for OLAP queries
```

### Stage 4: Distributed query optimization
```sql
-- Route query to correct shard based on user_id
-- Parallel execution across shards
-- Merge results in application layer
```

---

## Monitoring & Metrics

### Key Performance Indicators

```sql
-- Query performance
SELECT 
  query,
  mean_exec_time,
  max_exec_time,
  calls
FROM pg_stat_statements
WHERE query ILIKE '%covers%'
ORDER BY mean_exec_time DESC;

-- Table growth
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
  n_live_tup as row_count
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Index efficiency
SELECT 
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

### Monitoring Schedule

| Metric | Frequency | Alert Threshold |
|--------|-----------|-----------------|
| Query latency | Real-time | >500ms |
| Index size | Daily | >100MB growth/day |
| Table bloat | Weekly | >20% bloat |
| Disk usage | Daily | >80% capacity |
| Replication lag | Real-time | >1 second |
| Cache hit ratio | Hourly | <95% |

---

## Migration Path: Stage 1 → Stage 2

**Timeline**: When user_count reaches 300K

### Pre-migration Checklist
- ✓ Backup entire database
- ✓ Test partitioning on staging
- ✓ Prepare rollback procedure
- ✓ Plan maintenance window (2 hours)
- ✓ Notify users of planned downtime

### Migration Steps
```sql
-- 1. Enable partitioning extension
CREATE EXTENSION IF NOT EXISTS pg_partman;

-- 2. Create partitioned covers table
CREATE TABLE covers_partitioned (
  LIKE covers INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- 3. Create partitions for existing data
CREATE TABLE covers_2024_01 PARTITION OF covers_partitioned
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- 4. Copy data (can take 1-2 hours for 25M rows)
INSERT INTO covers_partitioned SELECT * FROM covers;

-- 5. Swap tables
ALTER TABLE covers RENAME TO covers_old;
ALTER TABLE covers_partitioned RENAME TO covers;

-- 6. Update foreign keys
-- All FKs automatically reference new table

-- 7. Verify data
SELECT COUNT(*) FROM covers;

-- 8. Drop old table
DROP TABLE covers_old;
```

---

## Summary: Scalability by Numbers

| Metric | Stage 1 | Stage 2 | Stage 3 | Stage 4 |
|--------|---------|---------|---------|---------|
| Users | 100K | 500K | 2M | 10M |
| Covers | 5M | 25M | 100M | 500M |
| Exports | 50M | 250M | 1B | 5B |
| DB Size | 50GB | 250GB | 1TB | 5TB |
| Architecture | Single | Single + Partitions | 4 Shards | 4 Shards × 3 Regions |
| Avg Query | <5ms | <10ms | <20ms | <50ms |
| Max Users/Shard | 100K | 500K | 500K | 2.5M |

The schema grows with you - no fundamental redesign needed.

