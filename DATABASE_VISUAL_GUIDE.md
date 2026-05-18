# ScholarFlow Database - Visual Guide & Data Flow

## Entity Relationship Diagram (Detailed)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE AUTHENTICATION                            │
│                          (auth.users table)                               │
└────────────────────────────────┬─────────────────────────────────────────┘
                                 │
                                 │ 1:1 relationship
                                 │ (auth.uid() references)
                                 ↓
        ┌────────────────────────────────────────────┐
        │          public.user_profiles              │
        ├────────────────────────────────────────────┤
        │ ★ id (UUID, PK, FK to auth.uid)            │
        │ • email (TEXT, UNIQUE)                     │
        │ • display_name (TEXT)                      │
        │ • institution_id (INTEGER, FK)             │ ───────┐
        │ • department (TEXT)                        │        │
        │ • bio (TEXT)                               │        │
        │ • avatar_url (TEXT)                        │        │
        │ • theme_preference (ENUM)                  │        │
        │ • export_dpi (INTEGER)                     │        │
        │ • auto_sync (BOOLEAN)                      │        │
        │ • created_at, updated_at (TIMESTAMP)       │        │
        └────────────────────────────────────────────┘        │
              │                                    │           │
              │ 1:N                               │           │
              ├─ covers (main documents)         │           │
              ├─ cover_exports                   │           │
              ├─ cover_shares                    │           │
              ├─ audit_logs                      │           │
              │                                    │           │
              ↓ (to covers table)                 │           │
        ┌────────────────────────────────────────────┐        │
        │      public.covers (5M rows expected)      │        │
        ├────────────────────────────────────────────┤        │
        │ ★ id (BIGSERIAL, PK)                       │        │
        │ • user_id (UUID, FK) ◄──────────────────┐  │        │
        │ • template_id (INTEGER, FK) ──────┐    │  │        │
        │ • title (TEXT)                     │    │  │        │
        │ • description (TEXT)               │    │  │        │
        │                                    │    │  │        │
        │ STUDENT INFORMATION:               │    │  │        │
        │ • student_name (TEXT, required)    │    │  │        │
        │ • roll_number (TEXT)               │    │  │        │
        │ • class_roll (TEXT)                │    │  │        │
        │ • semester (TEXT)                  │    │  │        │
        │                                    │    │  │        │
        │ DOCUMENT INFORMATION:              │    │  │        │
        │ • subject (TEXT, required)         │    │  │        │
        │ • course_code (TEXT, required)     │    │  │        │
        │ • assignment_type (TEXT)           │    │  │        │
        │ • submission_date (DATE)           │    │  │        │
        │                                    │    │  │        │
        │ DESIGN:                            │    │  │        │
        │ • theme_color (VARCHAR(7) hex)     │    │  │        │
        │ • university_name (TEXT)           │    │  │        │
        │ • department (TEXT)                │    │  │        │
        │ • logo_url (TEXT)                  │    │  │        │
        │ • metadata (JSONB)                 │    │  │        │
        │                                    │    │  │        │
        │ STATUS & VISIBILITY:               │    │  │        │
        │ • status (ENUM: draft|pub|archive) │    │  │        │
        │ • visibility (ENUM: priv|shr|pub)  │    │  │        │
        │                                    │    │  │        │
        │ TIMESTAMPS:                        │    │  │        │
        │ • created_at (TIMESTAMP)           │    │  │        │
        │ • updated_at (TIMESTAMP)           │    │  │        │
        │ • exported_at (TIMESTAMP)          │    │  │        │
        └────────────────────────────────────────────┘        │
                 │              │                              │
                 │              │ 1:N                          │
                 │              ├─ cover_exports              │
                 │              ├─ cover_shares               │
                 │              │                              │
           1:N  │              ↓                              │
               │        ┌──────────────────────────┐          │
               │        │  public.cover_shares     │          │
               │        ├──────────────────────────┤          │
               │        │ ★ id (BIGSERIAL, PK)     │          │
               │        │ • cover_id (FK) ◄────────┤──────┐   │
               │        │ • shared_by_user_id (FK) │      │   │
               │        │ • shared_with_email      │      │   │
               │        │ • share_token (UUID)     │      │   │
               │        │ • can_view, can_comment  │      │   │
               │        │ • can_download, duplicate│      │   │
               │        │ • expires_at (TIMESTAMP) │      │   │
               │        │ • created_at, accessed   │      │   │
               │        └──────────────────────────┘      │   │
               │                                           │   │
               ↓                                           │   │
        ┌──────────────────────────────────────┐          │   │
        │  public.cover_exports (20M rows)     │          │   │
        ├──────────────────────────────────────┤          │   │
        │ ★ id (BIGSERIAL, PK)                 │          │   │
        │ • cover_id (FK) ◄────────────────┐   │          │   │
        │ • user_id (FK)                   │   │          │   │
        │ • format (ENUM: pdf|jpg|png)     │   │          │   │
        │ • file_size (BIGINT)             │   │          │   │
        │ • file_url (TEXT)                │   │          │   │
        │ • storage_path (TEXT)            │   │          │   │
        │ • generated_at (TIMESTAMP)       │   │          │   │
        │ • expires_at (TIMESTAMP)         │   │          │   │
        │ • export_duration_ms (INTEGER)   │   │          │   │
        │ • quality_settings (JSONB)       │   │          │   │
        └──────────────────────────────────────┘          │   │
                                                           │   │
        ┌────────────────────────────────────────────┐    │   │
        │      public.templates (7 rows)             │    │   │
        ├────────────────────────────────────────────┤    │   │
        │ ★ id (INTEGER, PK)                         │    │   │
        │ • slug (TEXT, UNIQUE)                      │◄───┤   │
        │ • name (TEXT)                              │    │   │
        │ • description (TEXT)                       │    │   │
        │ • category (TEXT)                          │    │   │
        │ • thumbnail_url (TEXT)                     │    │   │
        │ • preview_url (TEXT)                       │    │   │
        │ • is_premium (BOOLEAN)                     │    │   │
        │ • suggested_colors (TEXT[])                │    │   │
        │ • layout_type (TEXT)                       │    │   │
        │ • best_for (TEXT)                          │    │   │
        │ • html_template (TEXT)                     │    │   │
        │ • css_styles (TEXT)                        │    │   │
        │ • created_at, updated_at (TIMESTAMP)       │    │   │
        └────────────────────────────────────────────┘    │   │
                                                           │   │
        ┌────────────────────────────────────────────┐    │   │
        │   public.institutions (5K rows expected)   │    │   │
        ├────────────────────────────────────────────┤    │   │
        │ ★ id (INTEGER IDENTITY, PK)                │◄───┤   │
        │ • name (TEXT, UNIQUE)                      │    │   │
        │ • slug (TEXT, UNIQUE)                      │    │   │
        │ • country (TEXT)                           │    │   │
        │ • state_province (TEXT)                    │    │   │
        │ • city (TEXT)                              │    │   │
        │ • logo_url (TEXT)                          │    │   │
        │ • website_url (TEXT)                       │    │   │
        │ • email_domain (TEXT, UNIQUE)              │◄───┤   │
        │ • verified (BOOLEAN)                       │    │   │
        │ • verified_at (TIMESTAMP)                  │    │   │
        │ • user_count, cover_count (denormalized)   │    │   │
        │ • created_at, updated_at (TIMESTAMP)       │    │   │
        └────────────────────────────────────────────┘    │   │
                                                           │   │
        ┌────────────────────────────────────────────┐    │   │
        │  public.audit_logs (50M rows expected)     │    │   │
        ├────────────────────────────────────────────┤    │   │
        │ ★ id (BIGSERIAL, PK)                       │    │   │
        │ • user_id (FK) ◄─────────────────────────────────┘
        │ • action (TEXT)                            │
        │ • entity_type (TEXT)                       │
        │ • entity_id (TEXT)                         │
        │ • changes (JSONB)                          │
        │ • ip_address (INET)                        │
        │ • user_agent (TEXT)                        │
        │ • created_at (TIMESTAMP)                   │
        └────────────────────────────────────────────┘

KEY:
★ = Primary Key
• = Regular column
FK = Foreign Key reference
ENUM = Enumerated type
```

---

## Data Flow Diagrams

### 1. Cover Creation Flow

```
┌─────────────────────┐
│   User Opens App    │
│  (CoverGenerator)   │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────────────────────┐
│  Selects Template                   │
│  Fills Form:                        │
│  - Student name                     │
│  - Subject                          │
│  - Course code                      │
│  - Theme color                      │
│  - Institution info                 │
└──────────┬──────────────────────────┘
           │
           ↓
┌──────────────────────────────────────┐
│  Live Preview Updates                │
│  (Instant, no sync button)           │
│  Changes: metadata.JSONB             │
└──────────┬───────────────────────────┘
           │
           ↓
┌────────────────────────────────────────────┐
│  User Clicks "Save Draft"                  │
│  or "Export"                               │
└──────────┬─────────────────────────────────┘
           │
     ┌─────┴──────┐
     │             │
  SAVE DRAFT   EXPORT
     │             │
     ↓             ↓
  ┌─────────────┐  ┌──────────────────────┐
  │  INSERT     │  │  PDF Generation      │
  │  covers     │  │  (HTML to PDF)       │
  │  table      │  │                      │
  │  (DB)       │  └────────┬─────────────┘
  └─────────────┘           │
                            ↓
                   ┌────────────────────┐
                   │  INSERT            │
                   │  cover_exports     │
                   │  (file metadata)   │
                   └────────┬───────────┘
                            │
                            ↓
                   ┌────────────────────┐
                   │  Upload to         │
                   │  Supabase Storage  │
                   │  (external)        │
                   └────────┬───────────┘
                            │
                            ↓
                   ┌────────────────────┐
                   │  Return file_url   │
                   │  to user           │
                   └────────────────────┘
```

### 2. Cover Retrieval & Display

```
┌──────────────────────────┐
│  User Visits "My Covers" │
└────────────┬─────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│  GET /api/covers                     │
│  with auth: user_id                  │
└────────────┬───────────────────────┐
             │                       │ RLS Policy Applied:
             │                       │ WHERE user_id = auth.uid()
             ↓                       │
┌──────────────────────────────────────┴────────┐
│  SELECT * FROM covers                         │
│  WHERE user_id = $1 AND status != 'archived'  │
│  ORDER BY created_at DESC                     │
│  LIMIT 20                                     │
│                                               │
│  Uses Index:                                  │
│  idx_covers_user_created (fast! ~50ms)        │
└────────────┬────────────────────────────────┘
             │
             ↓
┌──────────────────────────────────────────┐
│  Fetch Template Info                     │
│  SELECT * FROM templates WHERE id IN (..)│
│                                          │
│  Uses Index: idx_templates_pk (~10ms)    │
└────────────┬─────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│  Return JSON Response:                      │
│  [{                                         │
│    id: 1,                                   │
│    title: "Physics Assignment",             │
│    student_name: "John",                    │
│    status: "draft",                         │
│    template: {id, name, slug}               │
│    created_at: "2024-01-15T10:30:00Z"       │
│  }, ...]                                    │
└──────────────────────────────────────────────┘
```

### 3. Share & Export Flow

```
┌────────────────────────┐
│  User Clicks "Share"   │
└────────────┬───────────┘
             │
             ↓
┌──────────────────────────┐
│  Enters Recipient Email  │
│  (optional expiration)   │
└────────────┬─────────────┘
             │
             ↓
┌──────────────────────────────────────┐
│  INSERT into cover_shares:           │
│  - cover_id                          │
│  - shared_by_user_id (auth.uid)      │
│  - shared_with_email                 │
│  - share_token (auto UUID)           │
│  - can_download, can_view, etc       │
│  - expires_at (7 days default)       │
│                                      │
│  Uses RLS: user_id = auth.uid()      │
└────────────┬─────────────────────────┘
             │
             ↓
┌──────────────────────────┐
│  Generate Share URL:     │
│  example.com/s/          │
│  {share_token}           │
└────────────┬─────────────┘
             │
             ↓
┌──────────────────────────┐
│  Send Email Link         │
│  (external service)      │
└──────────────────────────┘

---

WHEN RECIPIENT VISITS LINK:

GET /api/shares/{share_token}
    │
    ├─ SELECT FROM cover_shares WHERE share_token = $1
    │
    ├─ Check: expires_at > NOW()
    │
    ├─ Check: can_view = true
    │
    ├─ UPDATE last_accessed_at = NOW()
    │
    ↓
FETCH cover data (via RLS: bypass - service role)
    │
    ↓
DISPLAY cover (read-only)
```

---

## Query Performance Maps

### Top 5 Most Frequent Queries

```
1. GET USER'S COVERS
   Query: SELECT * FROM covers 
           WHERE user_id = $1 
           ORDER BY created_at DESC 
           LIMIT 20
   
   Execution Plan:
   ├─ Seq Scan on covers (filtered by index)
   ├─ Index Scan using idx_covers_user_created (recommended)
   │  ├─ Index Filter: (user_id = $1)
   │  ├─ Rows: 20
   │  └─ Time: 45ms
   │
   └─ Result: 20 rows
   
   ✓ OPTIMIZED - Uses composite index
   ✓ Expected Time: 45ms
   ✓ Can handle 5M+ total covers

2. GET TEMPLATE
   Query: SELECT * FROM templates WHERE id = $1
   
   Execution Plan:
   ├─ Index Scan using templates_pkey
   │  ├─ Index Filter: (id = $1)
   │  └─ Time: 8ms
   │
   └─ Result: 1 row (cached by Supabase)
   
   ✓ OPTIMIZED - Primary key lookup
   ✓ Expected Time: 8ms (sub 1ms with caching)

3. GET PUBLIC COVERS
   Query: SELECT * FROM covers 
           WHERE visibility = 'public' 
           ORDER BY created_at DESC 
           LIMIT 10
   
   Execution Plan:
   ├─ Index Scan using idx_covers_visibility
   │  ├─ Index Filter: (visibility = 'public')
   │  ├─ Rows: 10
   │  └─ Time: 62ms
   │
   └─ Result: 10 rows
   
   ✓ OPTIMIZED - Partial index on visibility
   ✓ Expected Time: 62ms
   ✓ Suitable for discovery/trending page

4. LOOKUP SHARE TOKEN
   Query: SELECT * FROM cover_shares 
           WHERE share_token = $1
   
   Execution Plan:
   ├─ Index Scan using idx_shares_token (UNIQUE)
   │  ├─ Index Filter: (share_token = $1)
   │  └─ Time: 12ms
   │
   └─ Result: 1 row
   
   ✓ OPTIMIZED - UNIQUE index
   ✓ Expected Time: 12ms
   ✓ Public endpoint safe

5. FIND INSTITUTION
   Query: SELECT * FROM institutions 
           WHERE email_domain = $1
   
   Execution Plan:
   ├─ Index Scan using idx_institutions_email_domain
   │  ├─ Index Filter: (email_domain = $1)
   │  └─ Time: 8ms
   │
   └─ Result: 1 row (or NULL)
   
   ✓ OPTIMIZED - UNIQUE index
   ✓ Expected Time: 8ms
   ✓ Used for auto-fill on signup
```

---

## Data Volume Projections

### Year 1 Growth Scenario

```
Month   Users    Covers/User  Total Covers  Exports  DB Size
────────────────────────────────────────────────────────────
0       100      2            200           400      100MB
3       500      5            2,500         5,000    150MB
6       2,000    8            16,000        32,000   400MB
9       5,000    10           50,000        100,000  850MB
12      10,000   15           150,000       300,000  1.5GB

Year 2 Projection:
12      10,000   15           150,000       300,000  1.5GB
24      50,000   25           1,250,000     2.5M     8GB
36      100,000  50           5,000,000     10M      35GB
```

### Index Size Growth

```
Table Size vs Index Size Ratio:

Covers Table:
├─ 150,000 rows   → 150MB data + 80MB indexes (1:1.2 ratio)
├─ 1,250,000 rows → 1.5GB data + 900MB indexes (1:1.2 ratio)
└─ 5,000,000 rows → 6GB data + 3.6GB indexes (1:1.2 ratio)

Total Database Size with All Tables:
├─ Year 1 (150K covers)  → 1.5GB
├─ Year 2 (1.25M covers) → 8GB
└─ Year 3 (5M covers)    → 35GB

Recommendation:
├─ < 5GB: Single server, standard replication
├─ 5-20GB: Enable connection pooling, consider read replicas
└─ > 20GB: Implement table partitioning by user_id or date
```

---

## State Transitions

### Cover Status Lifecycle

```
                  ┌─────────────┐
                  │   DRAFT     │
                  │ (editing)   │
                  └──────┬──────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
        SAVE  │   EXPORT │ PUBLISH  │
              │          │          │
              ↓          ↓          ↓
        ┌──────────────────────────────┐
        │      PUBLISHED               │
        │ (saved & finalized)          │
        │ - Can be shared              │
        │ - Can be exported            │
        │ - Can be duplicated          │
        └────────────┬─────────────────┘
                     │
              ┌──────┴───────┐
              │              │
         ARCHIVE        DUPLICATE
              │              │
              ↓              ↓
        ┌──────────────────────────────┐
        │      ARCHIVED                │
        │ (hidden, not deleted)        │
        │ - Data preserved             │
        │ - Not in main list           │
        │ - Can be restored            │
        └──────────────────────────────┘

Database Columns:
status: ENUM ('draft', 'published', 'archived')
visibility: ENUM ('private', 'shared', 'public')

Rules:
- Only 'published' covers can be 'public' or 'shared'
- 'draft' covers are always 'private'
- Moving to 'archived' updates updated_at timestamp
- Can transition: draft → published → archived
```

---

## Security & Access Control

### Row-Level Security (RLS) Matrix

```
TABLE: covers

┌─────────────────────────────────────────────────┐
│ User Type    │ Can View │ Can Insert │ Can Update
├──────────────┼──────────┼────────────┼───────────┤
│ Own covers   │ ✓ ALL    │ ✓          │ ✓ OWN    
│ Public covers│ ✓        │ ✗          │ ✗        
│ Shared cover │ ✓        │ ✗          │ ✗        
│ Other user   │ ✗        │ ✗          │ ✗        
│ Admin*       │ ✓ ALL    │ ✓          │ ✓ ALL    
└──────────────┴──────────┴────────────┴───────────┘

RLS Policies:
1. SELECT own covers
   WHERE user_id = auth.uid()

2. SELECT public covers (anyone)
   WHERE visibility = 'public'

3. INSERT own covers
   WITH CHECK (user_id = auth.uid())

4. UPDATE own covers
   USING (user_id = auth.uid())

5. DELETE own covers
   USING (user_id = auth.uid())

*Admin: Uses service_role (bypasses RLS)
```

---

## Database Monitoring Dashboard (SQL Queries)

```sql
-- Current Database Health
SELECT 
  (SELECT pg_size_pretty(pg_database_size(current_database()))) as total_size,
  (SELECT count(*) FROM user_profiles) as total_users,
  (SELECT count(*) FROM covers) as total_covers,
  (SELECT avg(size) FROM (
    SELECT pg_total_relation_size(tablename) as size 
    FROM pg_tables WHERE schemaname='public'
  ) t) as avg_table_size;

-- Top 10 Most Active Users
SELECT 
  user_id,
  COUNT(*) as cover_count,
  COUNT(DISTINCT template_id) as template_variety,
  MAX(created_at) as last_cover,
  COUNT(DISTINCT DATE(created_at)) as active_days
FROM covers
GROUP BY user_id
ORDER BY cover_count DESC
LIMIT 10;

-- Export Activity Trend
SELECT 
  DATE(generated_at) as date,
  COUNT(*) as exports,
  COUNT(DISTINCT user_id) as unique_exporters,
  ROUND(AVG(export_duration_ms), 0) as avg_time_ms,
  COUNT(*) FILTER (WHERE format='pdf') as pdf_count,
  COUNT(*) FILTER (WHERE format='jpg') as jpg_count
FROM cover_exports
WHERE generated_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(generated_at)
ORDER BY date DESC;

-- Unused Templates
SELECT 
  t.id,
  t.name,
  COUNT(c.id) as usage_count,
  t.is_premium
FROM templates t
LEFT JOIN covers c ON t.id = c.template_id
GROUP BY t.id, t.name, t.is_premium
HAVING COUNT(c.id) = 0
ORDER BY t.name;

-- Shared Covers Analysis
SELECT 
  COUNT(*) as total_shares,
  COUNT(DISTINCT cover_id) as unique_covers_shared,
  COUNT(DISTINCT shared_by_user_id) as unique_sharers,
  COUNT(*) FILTER (WHERE expires_at IS NOT NULL) as expiring_shares,
  COUNT(*) FILTER (WHERE expires_at < NOW()) as expired_shares
FROM cover_shares;
```

---

## Performance Checklist

- [ ] All 23 indexes created and active
- [ ] RLS policies enabled on 6 tables
- [ ] Connection pooling configured
- [ ] Query response times < 100ms for primary operations
- [ ] Table sizes monitored (alert at 5GB)
- [ ] Slow query log enabled and reviewed weekly
- [ ] VACUUM and ANALYZE run daily (automatic)
- [ ] Backups verified to work (test restore monthly)
- [ ] Monitoring alerts configured:
  - [ ] Query time > 1s
  - [ ] Connection pool > 90% utilization
  - [ ] Table size growth anomaly
  - [ ] Backup failure

---

## Version & Maintenance

**Current Version**: 1.0
**Last Updated**: 2026-04-09
**Maintenance Schedule**:
- Daily: Auto-vacuum, backups, monitoring
- Weekly: Review slow queries, check backup integrity
- Monthly: Analyze query patterns, update statistics
- Quarterly: Full reindex if needed, archive old data
- Yearly: Capacity planning, schema evolution assessment
