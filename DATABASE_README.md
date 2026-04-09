# ScholarFlow Database Documentation

**Complete database schema, implementation guide, and operational procedures for ScholarFlow**

---

## Documents Overview

This folder contains comprehensive database documentation for ScholarFlow:

### 1. **DATABASE_SCHEMA.md** (706 lines)
Complete technical specification of the database design:
- Entity Relationship Diagram (ERD)
- All 7 core tables with detailed field specifications
- Normalization (1NF, 2NF, 3NF compliance)
- Indexing strategy with query performance analysis
- Row-Level Security (RLS) policies
- Scalability considerations and partitioning strategy
- Example queries for common operations
- Future extensions and enhancement roadmap

**Read this for**: Understanding database structure, relationships, and design decisions

---

### 2. **scripts/01-init-database.sql** (448 lines)
Production-ready SQL migration script:
- Creates all tables with proper constraints
- Sets up 20+ critical indexes for performance
- Enables and configures Row-Level Security
- Creates views for analytics and reporting
- Inserts seed data (7 default templates)
- Configures functions and triggers for automation
- Sets up proper permissions and grants

**Use this for**: Initial database setup and schema creation

---

### 3. **DATABASE_IMPLEMENTATION_GUIDE.md** (693 lines)
Step-by-step implementation guide:
- Quick start checklist (4 steps)
- Integration with Next.js application
- Database utility functions (TypeScript)
- Migration strategy from localStorage to Supabase
- Backup and export procedures
- Performance optimization techniques
- Monitoring and maintenance schedules
- Security best practices and hardening
- Troubleshooting common issues

**Read this for**: Implementing database in your application

---

## Quick Start (5 Minutes)

### 1. Create Database Tables
Copy and run the SQL script in Supabase SQL Editor:
```bash
# Open Supabase Dashboard → SQL Editor
# Paste: scripts/01-init-database.sql
# Click: Run
```

### 2. Verify Installation
```sql
SELECT COUNT(*) as table_count 
FROM information_schema.tables 
WHERE table_schema = 'public';
-- Should return: 7
```

### 3. Connect to Application
Update your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

### 4. Integrate Database Functions
Copy database utilities from DATABASE_IMPLEMENTATION_GUIDE.md to your app

### 5. Test Connection
```typescript
import { db } from '@/lib/db'

const templates = await db.getTemplates()
console.log(templates) // Should return 7 templates
```

---

## Database Architecture

### Core Tables (7)

```
┌──────────────────────────────────────────────────────────────┐
│  user_profiles (user identity & settings, ~100K users)       │
├──────────────────────────────────────────────────────────────┤
│  id: UUID | email: string | display_name | institution_id    │
│  avatar_url | theme_preference | export_dpi | auto_sync       │
└──────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────┐
│  covers (main documents, ~5M expected at scale)              │
├──────────────────────────────────────────────────────────────┤
│  id: BIGSERIAL | user_id (FK) | template_id (FK)             │
│  student_name | subject | course_code | theme_color          │
│  university_name | status | visibility | metadata             │
└──────────────────────────────────────────────────────────────┘
          ↓                    ↓                   ↓
    cover_exports      cover_shares          templates
    (export history)    (sharing links)    (7 defaults)
```

### Relationships

- **1:N**: user_profiles ↔ covers (one user, many covers)
- **1:N**: user_profiles ↔ cover_exports (track all exports)
- **1:N**: covers ↔ cover_shares (one cover, multiple shares)
- **1:N**: templates ↔ covers (template reusable by many users)
- **1:N**: institutions ↔ user_profiles (organization members)

### Security

All tables use Row-Level Security (RLS):
- Users see only their own data by default
- Public covers visible to anyone
- Shared covers respect share permissions
- Admin functions restricted to service role

---

## Key Features

### 1. Data Integrity
- ✓ Foreign key constraints prevent orphaned data
- ✓ Check constraints ensure valid enum values
- ✓ UNIQUE constraints prevent duplicates
- ✓ NOT NULL constraints for required fields

### 2. Performance
- ✓ 20+ strategic indexes for fast queries
- ✓ Composite indexes on (user_id, created_at) for efficient sorting
- ✓ Partial indexes on status/visibility for filtered queries
- ✓ Connection pooling support via Supabase

### 3. Scalability
- ✓ BIGSERIAL for cover IDs (supports 9+ quintillion records)
- ✓ Partitioning strategy ready for tables > 10M rows
- ✓ Materialized views for pre-computed analytics
- ✓ Archive strategy for old data retention

### 4. Security
- ✓ Row-Level Security policies on all user-facing tables
- ✓ No public URLs stored in database (separate file storage)
- ✓ Audit logging of all user actions
- ✓ GDPR-compliant data export functionality

### 5. Operational
- ✓ Automated timestamp updates via triggers
- ✓ Comprehensive audit trail for debugging
- ✓ Backup and recovery procedures documented
- ✓ Monitoring alerts for performance degradation

---

## Schema at a Glance

### Sizes (Estimated at 100K Users)

| Table | Rows | Size | Purpose |
|-------|------|------|---------|
| user_profiles | 100K | 50MB | User accounts |
| covers | 5M | 5GB | Cover documents |
| cover_exports | 20M | 8GB | Export history |
| cover_shares | 1M | 500MB | Share links |
| templates | 7 | <1MB | Template definitions |
| institutions | 5K | 5MB | University directory |
| audit_logs | 50M | 30GB | Action audit trail |
| **Total** | **77M** | **43.5GB** | |

### Indexes (23 Total)

- 3 on user_profiles
- 3 on institutions
- 3 on templates
- 6 on covers (CRITICAL)
- 4 on cover_exports
- 4 on cover_shares

---

## Common Operations

### Create a New Cover
```typescript
const cover = await db.createCover({
  user_id: userId,
  template_id: 1,
  student_name: 'John Doe',
  subject: 'Research Project',
  course_code: 'CS101',
  status: 'draft'
})
```

### List User's Covers
```typescript
const covers = await db.getUserCovers(userId, limit=20)
// Returns: [cover1, cover2, ...] ordered by newest first
```

### Export Cover as PDF
```typescript
const export_record = await db.recordExport({
  cover_id: coverId,
  user_id: userId,
  format: 'pdf',
  file_size: 524288,
  export_duration_ms: 1240
})
```

### Share Cover with Link
```typescript
const share = await db.createShare({
  cover_id: coverId,
  shared_by_user_id: userId,
  can_download: true,
  expires_at: new Date(Date.now() + 7*24*60*60*1000) // 7 days
})
// share.share_token can be sent as URL
```

### Track User Action
```typescript
await supabase.from('audit_logs').insert({
  user_id: userId,
  action: 'cover_created',
  entity_type: 'cover',
  entity_id: coverId.toString(),
  changes: { status: 'draft' },
  ip_address: request.ip
})
```

---

## Query Examples

### Analytics: Most Used Templates
```sql
SELECT 
  t.name,
  COUNT(DISTINCT c.id) as usage,
  COUNT(DISTINCT c.user_id) as unique_users
FROM templates t
LEFT JOIN covers c ON t.id = c.template_id
GROUP BY t.name
ORDER BY usage DESC;
```

### Analytics: Export Trends
```sql
SELECT 
  DATE(generated_at) as date,
  format,
  COUNT(*) as exports,
  ROUND(AVG(export_duration_ms), 0) as avg_duration_ms
FROM cover_exports
WHERE generated_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(generated_at), format
ORDER BY date DESC;
```

### Cleanup: Remove Expired Shares
```sql
DELETE FROM cover_shares
WHERE expires_at < NOW() AND expires_at IS NOT NULL;
```

### Optimization: Find Slow Exports
```sql
SELECT 
  ce.id,
  ce.user_id,
  ce.cover_id,
  ce.export_duration_ms,
  c.subject
FROM cover_exports ce
JOIN covers c ON ce.cover_id = c.id
WHERE ce.export_duration_ms > 5000  -- > 5 seconds
ORDER BY ce.export_duration_ms DESC
LIMIT 10;
```

---

## Deployment Checklist

### Pre-Production
- [ ] Run migration script (scripts/01-init-database.sql)
- [ ] Verify all tables created (`\dt` in SQL)
- [ ] Test RLS policies with sample data
- [ ] Enable automated backups (Supabase default: yes)
- [ ] Set up monitoring alerts
- [ ] Create admin user account
- [ ] Load seed templates

### Production
- [ ] Enable point-in-time recovery
- [ ] Configure connection pooling
- [ ] Set up alerting for:
  - [ ] Query time > 1s
  - [ ] Table size > 5GB
  - [ ] Connection count > 90%
  - [ ] Backup failures
- [ ] Document database credentials
- [ ] Train team on RLS policies
- [ ] Test disaster recovery procedure

### Post-Launch
- [ ] Monitor slow query log weekly
- [ ] Analyze query performance monthly
- [ ] Update statistics quarterly
- [ ] Archive old exports every 3 months
- [ ] Review audit logs for anomalies

---

## Performance Expectations

### Query Response Times (With Proper Indexing)

| Query | Response Time | Notes |
|-------|---|---|
| Get user's covers | < 50ms | Indexed on (user_id, created_at) |
| Find public covers | < 100ms | Indexed on (visibility, created_at) |
| Lookup template | < 10ms | Small table, always cached |
| Get shared cover | < 50ms | Indexed on share_token |
| Record export | < 100ms | Insert operation |
| User profile | < 30ms | Single row, indexed email |
| Analytics query | < 500ms | Aggregate, may use temp table |

---

## Limitations & Constraints

| Constraint | Limit | Mitigation |
|---|---|---|
| Max table size | Unlimited (partionable) | Partition after 10GB |
| Max connections | 50-100 (plan dependent) | Enable connection pooling |
| Query timeout | 30 seconds | Rewrite inefficient queries |
| Storage | Plan dependent | Archive old data |
| File size | 5GB max per Supabase bucket | Use external storage if needed |

---

## Monitoring Commands

```sql
-- Table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Slow queries
SELECT query, calls, mean_time, max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Missing indexes
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public'
  AND n_distinct > 100
  AND correlation < 0.1
ORDER BY n_distinct DESC;

-- RLS policy verification
SELECT tablename, policyname, permissive, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;
```

---

## Troubleshooting Guide

**Problem**: "Permission denied" on query
- Solution: Check RLS policies, ensure user is authenticated

**Problem**: Slow cover list queries
- Solution: Verify index `idx_covers_user_created` exists

**Problem**: RLS policies not working
- Solution: Ensure RLS enabled: `ALTER TABLE covers ENABLE ROW LEVEL SECURITY;`

**Problem**: Foreign key violations when deleting
- Solution: Ensure CASCADE delete is configured on relations

**Problem**: Out of memory on aggregation
- Solution: Use materialized views, add WHERE clause, increase memory

---

## Files Included

```
/scripts
├── 01-init-database.sql          # Main migration script
└── backup-database.sh            # Backup automation script

/docs (this folder)
├── DATABASE_README.md            # This file
├── DATABASE_SCHEMA.md            # Complete schema specification  
└── DATABASE_IMPLEMENTATION_GUIDE.md  # Implementation instructions
```

---

## Getting Help

1. **Schema Questions**: See DATABASE_SCHEMA.md (sections on specific tables)
2. **Implementation Issues**: See DATABASE_IMPLEMENTATION_GUIDE.md (troubleshooting)
3. **SQL Syntax**: PostgreSQL docs at postgresql.org
4. **Supabase Specific**: Supabase docs at supabase.com/docs
5. **Performance**: Run EXPLAIN ANALYZE on slow queries

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-04-09 | 1.0 | Initial release with 7 core tables, 20+ indexes, RLS policies |

---

## Summary

This is a **production-ready database schema** designed for:
- ✓ **Scale**: 100K+ users, 5M+ documents
- ✓ **Performance**: Sub-100ms queries with proper indexing
- ✓ **Security**: Row-level security, audit logging, GDPR compliance
- ✓ **Reliability**: Automated backups, disaster recovery, monitoring
- ✓ **Maintainability**: Clear structure, documented relationships, upgrade path

**Next Step**: Run scripts/01-init-database.sql in Supabase SQL Editor
