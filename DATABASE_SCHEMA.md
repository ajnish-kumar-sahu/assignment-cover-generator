# ScholarFlow Database Schema

## Overview

This document defines the complete database schema for ScholarFlow - an academic cover document generator with user management, cover storage, templates, and institutional data management capabilities.

**Database System**: PostgreSQL (via Supabase)
**Approach**: Normalized relational design with Row-Level Security (RLS)
**Scalability**: Designed to handle 100,000+ users with millions of cover documents

---

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────┐
│                         DATABASE ENTITIES                         │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│      auth.users      │ (Supabase Built-in)
│ ─────────────────── │
│ id (UUID)           │
│ email               │
│ created_at          │
│ updated_at          │
└──────────────────────┘
         │
         │ 1:1
         │
    ┌────▼────────────────────────────────┐
    │      public.user_profiles          │
    │ ─────────────────────────────────── │
    │ id (UUID, PRIMARY KEY)              │
    │ email (TEXT, UNIQUE)                │
    │ display_name (TEXT)                 │
    │ institution_id (FK → institutions)  │
    │ department (TEXT)                   │
    │ bio (TEXT)                          │
    │ avatar_url (TEXT)                   │
    │ theme_preference (TEXT)             │
    │ export_dpi (INTEGER)                │
    │ auto_sync (BOOLEAN)                 │
    │ created_at (TIMESTAMP)              │
    │ updated_at (TIMESTAMP)              │
    └────┬────────────────────────────────┘
         │
         ├─────┬─────────┬────────────┐
         │1:N  │1:N      │1:N         │
         │     │         │            │
    ┌────▼──────────────────────────────────────────┐
    │      public.covers (MAIN TABLE)              │
    │ ─────────────────────────────────────────────┤
    │ id (BIGSERIAL, PRIMARY KEY)                   │
    │ user_id (UUID, FK → user_profiles)           │
    │ template_id (INTEGER, FK → templates)        │
    │ title (TEXT)                                  │
    │ description (TEXT)                            │
    │ student_name (TEXT)                           │
    │ roll_number (TEXT)                            │
    │ class_roll (TEXT)                             │
    │ semester (TEXT)                               │
    │ subject (TEXT)                                │
    │ course_code (TEXT)                            │
    │ assignment_type (TEXT)                        │
    │ submission_date (DATE)                        │
    │ theme_color (VARCHAR(7))                      │
    │ university_name (TEXT)                        │
    │ department (TEXT)                             │
    │ logo_url (TEXT)                               │
    │ metadata (JSONB)                              │
    │ status (ENUM: draft, published, archived)    │
    │ visibility (ENUM: private, shared, public)   │
    │ created_at (TIMESTAMP)                        │
    │ updated_at (TIMESTAMP)                        │
    │ exported_at (TIMESTAMP)                       │
    └────┬──────────────────────────────────────────┘
         │
         ├─────────┬───────────┐
         │1:N      │1:N        │
         │         │           │
    ┌────▼──────────────────┐  ┌──────────────────────┐
    │  public.cover_exports │  │  public.cover_shares │
    │ ─────────────────────┤  │ ─────────────────────┤
    │ id (BIGSERIAL, PK)    │  │ id (BIGSERIAL, PK)   │
    │ cover_id (FK)         │  │ cover_id (FK)        │
    │ user_id (FK)          │  │ shared_by_user_id (FK)
    │ format (ENUM)         │  │ shared_with_email    │
    │ file_size (BIGINT)    │  │ share_token (UUID)   │
    │ file_url (TEXT)       │  │ expires_at           │
    │ generated_at          │  │ created_at           │
    └───────────────────────┘  └──────────────────────┘

    ┌──────────────────────────────────────────┐
    │      public.templates                   │
    │ ─────────────────────────────────────────┤
    │ id (INTEGER, PRIMARY KEY)                │
    │ slug (TEXT, UNIQUE)                      │
    │ name (TEXT)                              │
    │ description (TEXT)                       │
    │ category (TEXT)                          │
    │ thumbnail_url (TEXT)                     │
    │ preview_url (TEXT)                       │
    │ is_premium (BOOLEAN)                     │
    │ suggested_colors (TEXT[])                │
    │ layout_type (TEXT)                       │
    │ best_for (TEXT)                          │
    │ created_at (TIMESTAMP)                   │
    │ updated_at (TIMESTAMP)                   │
    └──────────────────────────────────────────┘

    ┌──────────────────────────────────────────┐
    │      public.institutions                │
    │ ─────────────────────────────────────────┤
    │ id (INTEGER, PRIMARY KEY)                │
    │ name (TEXT, UNIQUE)                      │
    │ slug (TEXT, UNIQUE)                      │
    │ country (TEXT)                           │
    │ state_province (TEXT)                    │
    │ city (TEXT)                              │
    │ logo_url (TEXT)                          │
    │ website_url (TEXT)                       │
    │ email_domain (TEXT, UNIQUE)              │
    │ verified (BOOLEAN)                       │
    │ created_at (TIMESTAMP)                   │
    │ updated_at (TIMESTAMP)                   │
    └──────────────────────────────────────────┘

    ┌──────────────────────────────────────────┐
    │      public.audit_logs                  │
    │ ─────────────────────────────────────────┤
    │ id (BIGSERIAL, PRIMARY KEY)              │
    │ user_id (UUID, FK)                       │
    │ action (TEXT)                            │
    │ entity_type (TEXT)                       │
    │ entity_id (TEXT)                         │
    │ changes (JSONB)                          │
    │ ip_address (INET)                        │
    │ user_agent (TEXT)                        │
    │ created_at (TIMESTAMP)                   │
    └──────────────────────────────────────────┘
```

---

## Detailed Table Specifications

### 1. **user_profiles** (Public User Data)

**Purpose**: Stores extended user profile information linked to Supabase auth

```sql
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  institution_id INTEGER REFERENCES institutions(id),
  department TEXT,
  bio TEXT,
  avatar_url TEXT,
  
  -- Settings
  theme_preference TEXT DEFAULT 'system' CHECK (theme_preference IN ('light', 'dark', 'system')),
  export_dpi INTEGER DEFAULT 300 CHECK (export_dpi IN (72, 150, 300, 600)),
  auto_sync BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT email_matches_auth CHECK (email = auth.email())
);
```

**Indexes**:
- `email` (UNIQUE)
- `institution_id` (Foreign Key)
- `created_at` (Ordering)

**RLS Policy**: Users can only view their own profile, admins can view all

---

### 2. **covers** (Main Cover Documents)

**Purpose**: Core table storing all generated cover documents with their metadata

```sql
CREATE TABLE public.covers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  template_id INTEGER NOT NULL REFERENCES templates(id),
  
  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,
  
  -- Student Information
  student_name TEXT NOT NULL,
  roll_number TEXT,
  class_roll TEXT,
  semester TEXT,
  
  -- Document Information
  subject TEXT NOT NULL,
  course_code TEXT NOT NULL,
  assignment_type TEXT,
  submission_date DATE,
  
  -- Design
  theme_color VARCHAR(7) DEFAULT '#1a237e',
  
  -- Institution
  university_name TEXT,
  department TEXT,
  logo_url TEXT,
  
  -- Additional Data (for future extensions)
  metadata JSONB DEFAULT '{}',
  
  -- Status & Visibility
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'shared', 'public')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  exported_at TIMESTAMP WITH TIME ZONE,
  
  -- Constraints
  CONSTRAINT required_fields CHECK (
    student_name IS NOT NULL AND 
    subject IS NOT NULL AND 
    course_code IS NOT NULL
  )
);
```

**Indexes**:
- `(user_id, created_at DESC)` (User's covers, newest first)
- `(status, created_at)` (Status filtering)
- `(visibility, created_at)` (Public discovery)
- `template_id` (Template relationships)
- `course_code` (Search optimization)

**RLS Policy**:
- Users can view their own covers
- Public covers visible to all
- Shared covers visible to intended recipients

---

### 3. **cover_exports** (Export Records)

**Purpose**: Track all PDF/JPG exports for audit and analytics

```sql
CREATE TABLE public.cover_exports (
  id BIGSERIAL PRIMARY KEY,
  cover_id BIGINT NOT NULL REFERENCES covers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id),
  
  format TEXT NOT NULL CHECK (format IN ('pdf', 'jpg', 'png')),
  file_size BIGINT,
  file_url TEXT,
  storage_path TEXT,
  
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- For analytics
  export_duration_ms INTEGER,
  quality_settings JSONB DEFAULT '{"dpi": 300}'
);
```

**Indexes**:
- `(cover_id, format)` (Find exports by cover)
- `(user_id, generated_at DESC)` (User export history)
- `(expires_at)` (Cleanup of old exports)

---

### 4. **cover_shares** (Sharing & Collaboration)

**Purpose**: Manage sharing links and collaboration features

```sql
CREATE TABLE public.cover_shares (
  id BIGSERIAL PRIMARY KEY,
  cover_id BIGINT NOT NULL REFERENCES covers(id) ON DELETE CASCADE,
  shared_by_user_id UUID NOT NULL REFERENCES user_profiles(id),
  
  -- Recipient info
  shared_with_email TEXT,
  share_token UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  
  -- Permissions
  can_view BOOLEAN DEFAULT true,
  can_comment BOOLEAN DEFAULT true,
  can_download BOOLEAN DEFAULT false,
  can_duplicate BOOLEAN DEFAULT false,
  
  -- Expiration
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  
  CONSTRAINT expiration_in_future CHECK (expires_at IS NULL OR expires_at > NOW())
);
```

**Indexes**:
- `(share_token)` (Public share lookup)
- `(cover_id, created_at)` (View share history)
- `(expires_at)` (Find expired shares)

---

### 5. **templates** (Cover Templates)

**Purpose**: Define available templates with metadata and suggestions

```sql
CREATE TABLE public.templates (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  
  -- Presentation
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  preview_url TEXT,
  
  -- Features
  is_premium BOOLEAN DEFAULT false,
  suggested_colors TEXT[],
  layout_type TEXT, -- 'centered', 'boxed', 'minimal', etc.
  best_for TEXT, -- 'thesis', 'report', 'assignment', etc.
  
  -- Metadata
  html_template TEXT,
  css_styles TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Indexes**:
- `slug` (Template lookup)
- `category` (Browsing)
- `is_premium` (Premium filtering)

---

### 6. **institutions** (University/School Directory)

**Purpose**: Store institutional metadata for auto-fill and branding

```sql
CREATE TABLE public.institutions (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  
  -- Location
  country TEXT,
  state_province TEXT,
  city TEXT,
  
  -- Branding
  logo_url TEXT,
  website_url TEXT,
  email_domain TEXT UNIQUE,
  
  -- Verification
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Stats (Denormalized for performance)
  user_count INTEGER DEFAULT 0,
  cover_count INTEGER DEFAULT 0
);
```

**Indexes**:
- `name` (UNIQUE)
- `slug` (URL-friendly lookup)
- `email_domain` (Auto-detect institution)
- `verified` (Filter trusted institutions)

---

### 7. **audit_logs** (Compliance & Security)

**Purpose**: Track all user actions for compliance, debugging, and security

```sql
CREATE TABLE public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  
  -- Action details
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  changes JSONB DEFAULT '{}',
  
  -- Request metadata
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- TTL: Logs older than 1 year can be archived
  CONSTRAINT created_before_check CHECK (created_at <= NOW())
);
```

**Indexes**:
- `(user_id, created_at DESC)` (User action history)
- `(entity_type, entity_id)` (Track changes to specific entities)
- `(created_at DESC)` (Recent activity)
- `action` (Action type filtering)

---

## Data Types & Constraints

### Custom Enums

```sql
CREATE TYPE cover_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE cover_visibility AS ENUM ('private', 'shared', 'public');
CREATE TYPE export_format AS ENUM ('pdf', 'jpg', 'png');
CREATE TYPE theme_mode AS ENUM ('light', 'dark', 'system');
```

### Field Constraints

| Field | Type | Constraint | Rationale |
|-------|------|-----------|-----------|
| email | TEXT | UNIQUE, NOT NULL | Authentication key |
| course_code | TEXT | NOT NULL | Required for identification |
| student_name | TEXT | NOT NULL | Core document element |
| subject | TEXT | NOT NULL | Document title |
| theme_color | VARCHAR(7) | Hex format | CSS color format |
| export_dpi | INTEGER | 72/150/300/600 | Standard DPI values |
| status | ENUM | draft/published/archived | State machine |
| visibility | ENUM | private/shared/public | Access control |

---

## Normalization & Design Decisions

### 1. First Normal Form (1NF)
- ✓ No repeating groups
- ✓ All attributes are atomic
- Exception: `TEXT[]` for `suggested_colors`, `JSONB` for `metadata` (stored structured data)

### 2. Second Normal Form (2NF)
- ✓ In 1NF
- ✓ All non-key attributes depend on entire primary key
- ✓ No partial dependencies

### 3. Third Normal Form (3NF)
- ✓ In 2NF
- ✓ No transitive dependencies
- ✓ Separate tables for templates, institutions

### Design Decisions

**Why JSONB for metadata?**
- Allows future extensions without schema migrations
- Stores template-specific data, export settings, custom fields
- Queryable with PostgreSQL JSON operators

**Why denormalize user_count/cover_count in institutions?**
- Frequent aggregation queries would be slow
- Values updated asynchronously via triggers
- Cache layer can be invalidated on updates

**Why separate cover_exports table?**
- Track export history and analytics
- File lifecycle management separate from cover data
- Audit trail for compliance

---

## Indexing Strategy

### Primary Indexes (Critical)
```sql
-- User's covers list (most frequent query)
CREATE INDEX idx_covers_user_created ON covers(user_id, created_at DESC);

-- Public cover discovery
CREATE INDEX idx_covers_visibility ON covers(visibility, created_at DESC);

-- Share token lookup (public endpoint)
CREATE INDEX idx_shares_token ON cover_shares(share_token);

-- Export history
CREATE INDEX idx_exports_user ON cover_exports(user_id, generated_at DESC);
```

### Secondary Indexes (Performance)
```sql
-- Search/filter by course code
CREATE INDEX idx_covers_course ON covers(course_code);

-- Status-based queries
CREATE INDEX idx_covers_status ON covers(status, created_at);

-- Cleanup queries
CREATE INDEX idx_exports_expires ON cover_exports(expires_at);
CREATE INDEX idx_shares_expires ON cover_shares(expires_at);

-- User lookup
CREATE INDEX idx_profiles_email ON user_profiles(email);
CREATE INDEX idx_profiles_institution ON user_profiles(institution_id);
```

### Full-Text Search (Future)
```sql
-- If implementing full-text search
CREATE INDEX idx_covers_fulltext ON covers 
USING GIN (to_tsvector('english', subject || ' ' || course_code));
```

---

## Row-Level Security (RLS)

All tables have RLS enabled with the following policies:

### user_profiles
```sql
-- Users can view/update their own profile
CREATE POLICY select_own_profile ON user_profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY update_own_profile ON user_profiles 
  FOR UPDATE USING (auth.uid() = id);
```

### covers
```sql
-- Users can view own + public covers
CREATE POLICY select_own_covers ON covers 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY select_public_covers ON covers 
  FOR SELECT USING (visibility = 'public');

-- Only owner can update/delete
CREATE POLICY update_own_covers ON covers 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY delete_own_covers ON covers 
  FOR DELETE USING (auth.uid() = user_id);
```

### cover_shares
```sql
-- View own shares + shared with you
CREATE POLICY view_own_shares ON cover_shares 
  FOR SELECT USING (auth.uid() = shared_by_user_id);
```

---

## Scalability Considerations

### 1. Horizontal Partitioning
As `covers` table grows beyond 10M rows:
```sql
CREATE TABLE covers_2024_q1 PARTITION OF covers
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
```

### 2. Archive Strategy
- Move covers older than 2 years to archive tables
- Compress exports older than 6 months
- Archive audit logs annually

### 3. Connection Pooling
- Use pgBouncer or Supabase connection pooling
- Recommend: 20-30 connections per app instance

### 4. Query Optimization
- Use EXPLAIN ANALYZE for complex queries
- Materialized views for stats dashboards
- Cache frequently accessed institution data

---

## Backup & Recovery

### Backup Strategy
- Daily automated backups (Supabase managed)
- Point-in-time recovery enabled
- Export critical tables weekly to S3

### Data Retention
- Covers: Indefinite (user-deletable)
- Exports: 90 days (then archive to cold storage)
- Audit logs: 1 year (then archive)
- Shares: Until expiration

---

## Migration Path

### Phase 1: Initial Setup (Week 1)
- Create all tables with indexes
- Enable RLS on all tables
- Set up audit logging triggers

### Phase 2: Data Migration (Week 2)
- Migrate from localStorage to database
- Validate data integrity
- Set up monitoring

### Phase 3: Optimization (Week 3)
- Add materialized views for analytics
- Implement caching layer
- Performance testing

---

## Future Extensions

### Phase 4: Advanced Features
- **Comments/Annotations**: `cover_comments` table
- **Versions/History**: `cover_versions` table with full snapshots
- **Collaboration**: `cover_collaborators` with real-time sync
- **Analytics**: `cover_analytics` table tracking downloads/views

### Phase 5: Enterprise
- **Teams**: `teams`, `team_members` tables
- **Billing**: `subscriptions`, `usage_logs` tables
- **SAML/SSO**: Enhanced institution integration
- **Webhooks**: Event-driven integrations

---

## Example Queries

### Get user's recent covers
```sql
SELECT id, title, template_id, created_at 
FROM covers 
WHERE user_id = $1 AND status != 'archived'
ORDER BY created_at DESC 
LIMIT 20;
```

### Find shared covers
```sql
SELECT c.* 
FROM covers c
INNER JOIN cover_shares cs ON c.id = cs.cover_id
WHERE cs.share_token = $1 AND 
      (cs.expires_at IS NULL OR cs.expires_at > NOW());
```

### Export statistics
```sql
SELECT 
  DATE(generated_at) AS date,
  format,
  COUNT(*) as export_count,
  ROUND(AVG(export_duration_ms), 2) as avg_duration_ms
FROM cover_exports
WHERE user_id = $1 AND generated_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(generated_at), format
ORDER BY date DESC;
```

---

## Monitoring & Alerts

Set up alerts for:
- Table size growth (if `covers` > 5GB)
- Slow queries (execution time > 1s)
- RLS policy violations
- Audit log spike (possible attack)
- Backup failures

---

## Document Version
- Created: 2026-04-09
- Version: 1.0
- Status: Ready for Implementation
