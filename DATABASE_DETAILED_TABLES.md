# ScholarFlow Database - Detailed Table Specifications

## Complete Table Reference with Data Types, Constraints & Relationships

---

## Table 1: user_profiles

**Purpose**: Store extended user information linked to Supabase auth.users

**Scalability**: Indexed for 100K+ users with pagination support

### Field Specifications

| Field Name | Data Type | Constraints | Purpose |
|------------|-----------|-------------|---------|
| `id` | UUID | PRIMARY KEY, DEFAULT auth.uid() | Unique user identifier, synced with Supabase auth |
| `email` | TEXT | UNIQUE NOT NULL, INDEXED | User email, unique constraint prevents duplicates |
| `display_name` | TEXT | NULL allowed, max 255 chars | User's public name for attribution |
| `institution_id` | INTEGER | FOREIGN KEY → institutions.id, ON DELETE SET NULL | Links user to their institution |
| `department` | TEXT | NULL allowed, max 100 chars | Department/faculty name |
| `bio` | TEXT | NULL allowed, max 1000 chars | User biography, searchable field |
| `avatar_url` | TEXT | NULL allowed, validated URL | Profile picture stored in object storage |
| `theme_preference` | ENUM | Default: 'system', Values: [light, dark, system] | UI theme preference |
| `export_dpi` | INTEGER | DEFAULT 300, CHECK (72\|150\|300\|600) | PDF export quality setting |
| `auto_sync` | BOOLEAN | DEFAULT true | Whether to auto-sync covers to cloud |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL | Account creation timestamp |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL, TRIGGER | Profile last modification |

### Indexes
```sql
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_institution_id ON user_profiles(institution_id);
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at DESC);
```

### Relationships
- **1:N** with `covers` - One user can have many covers
- **1:N** with `cover_exports` - One user can export many times
- **1:N** with `cover_shares` - One user can share many covers
- **M:1** with `institutions` - Many users belong to one institution

### Row-Level Security (RLS)
```sql
-- Users can only view/edit their own profile
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE USING (auth.uid() = id);
```

---

## Table 2: institutions

**Purpose**: Institutional directory and metadata repository

**Scalability**: ~5,000-10,000 institutions globally, rarely updates

### Field Specifications

| Field Name | Data Type | Constraints | Purpose |
|------------|-----------|-------------|---------|
| `id` | INTEGER | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | Unique institution ID |
| `name` | TEXT | UNIQUE NOT NULL, INDEXED | Full institution name |
| `slug` | TEXT | UNIQUE NOT NULL, INDEXED | URL-friendly slug (oxford-university) |
| `country` | TEXT | NULL allowed, max 100 chars | Country name (ISO standard) |
| `state_province` | TEXT | NULL allowed, max 100 chars | State/province name |
| `city` | TEXT | NULL allowed, max 100 chars | City name |
| `logo_url` | TEXT | NULL allowed, URL validated | Institution logo for covers |
| `website_url` | TEXT | NULL allowed, URL validated | Official website URL |
| `email_domain` | TEXT | UNIQUE NULL allowed | Email domain for auto-association (oxford.ac.uk) |
| `verified` | BOOLEAN | DEFAULT false | Whether institution verified by admins |
| `verified_at` | TIMESTAMP WITH TIME ZONE | NULL allowed | Timestamp of verification |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL | Record creation date |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL | Last modification date |
| `user_count` | INTEGER | DEFAULT 0, TRIGGER UPDATED | Denormalized count of users |
| `cover_count` | INTEGER | DEFAULT 0, TRIGGER UPDATED | Denormalized count of covers |

### Indexes
```sql
CREATE INDEX idx_institutions_name ON institutions(name);
CREATE INDEX idx_institutions_slug ON institutions(slug);
CREATE INDEX idx_institutions_email_domain ON institutions(email_domain);
CREATE INDEX idx_institutions_verified ON institutions(verified);
CREATE INDEX idx_institutions_country ON institutions(country);
```

### Relationships
- **1:N** with `user_profiles` - One institution has many users

### Notes
- Denormalized counters (`user_count`, `cover_count`) updated via triggers for performance
- Email domain allows auto-association of users (e.g., any @oxford.ac.uk email)

---

## Table 3: templates

**Purpose**: Cover template definitions and metadata

**Scalability**: Static ~7 templates, rarely changes, fully cached in app

### Field Specifications

| Field Name | Data Type | Constraints | Purpose |
|------------|-----------|-------------|---------|
| `id` | INTEGER | PRIMARY KEY, GENERATED ALWAYS AS IDENTITY | Template ID |
| `slug` | TEXT | UNIQUE NOT NULL, INDEXED | URL-friendly identifier |
| `name` | TEXT | NOT NULL, max 100 chars | Display name |
| `description` | TEXT | NOT NULL, max 500 chars | Template description |
| `category` | TEXT | NOT NULL, max 50 chars | Category (academic, professional, etc.) |
| `thumbnail_url` | TEXT | NULL allowed | Small preview image (200x300px) |
| `preview_url` | TEXT | NULL allowed | Full preview image (800x1100px) |
| `is_premium` | BOOLEAN | DEFAULT false | Whether premium feature |
| `suggested_colors` | TEXT ARRAY | NULL allowed | Array of hex colors |
| `layout_type` | TEXT | NOT NULL, max 50 chars | Layout classification |
| `best_for` | TEXT | NULL allowed | Use case description |
| `html_template` | TEXT | NOT NULL | Raw HTML template |
| `css_styles` | TEXT | NOT NULL | CSS stylesheet |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL | Creation date |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL | Last update date |

### Indexes
```sql
CREATE INDEX idx_templates_slug ON templates(slug);
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_is_premium ON templates(is_premium);
```

### Caching Strategy
- Load all templates into app cache on startup
- Cache invalidated on `updated_at` change
- No RLS needed (all templates public)

---

## Table 4: covers (MAIN DATA TABLE)

**Purpose**: Central table storing all generated cover documents

**Scalability**: 5M+ documents, heavily indexed for rapid queries

### Field Specifications

| Field Name | Data Type | Constraints | Purpose |
|------------|-----------|-------------|---------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique cover ID |
| `user_id` | UUID | NOT NULL, FK → user_profiles.id, ON DELETE CASCADE, INDEXED | Owner of cover |
| `template_id` | INTEGER | NOT NULL, FK → templates.id, ON DELETE RESTRICT | Template used |
| `title` | TEXT | NOT NULL, max 255 chars, INDEXED | Cover title |
| `description` | TEXT | NULL allowed, max 1000 chars | Internal notes |
| `student_name` | TEXT | NOT NULL, max 100 chars | Student name on cover |
| `roll_number` | TEXT | NOT NULL, max 50 chars | Student ID |
| `class_roll` | TEXT | NULL allowed, max 50 chars | Class roll number |
| `semester` | TEXT | NULL allowed, max 50 chars | Semester/term |
| `subject` | TEXT | NOT NULL, max 200 chars, INDEXED | Assignment subject |
| `course_code` | TEXT | NOT NULL, max 20 chars, INDEXED | Course ID |
| `assignment_type` | TEXT | NULL allowed, max 50 chars | Type (project, report, etc.) |
| `submission_date` | DATE | NULL allowed | Due date |
| `theme_color` | VARCHAR(7) | NOT NULL, FORMAT: #RRGGBB | Primary color |
| `university_name` | TEXT | NOT NULL, max 100 chars | Institution name |
| `department` | TEXT | NULL allowed, max 100 chars | Department name |
| `logo_url` | TEXT | NULL allowed | Institution logo URL |
| `metadata` | JSONB | DEFAULT '{}' | Additional structured data |
| `status` | ENUM | DEFAULT 'draft', Values: [draft, published, archived] | Document status |
| `visibility` | ENUM | DEFAULT 'private', Values: [private, shared, public] | Sharing status |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL, INDEXED | Creation time |
| `updated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL, INDEXED | Last update time |
| `exported_at` | TIMESTAMP WITH TIME ZONE | NULL allowed | Last export time |

### Indexes (CRITICAL for Performance)
```sql
-- User retrieval (most common query)
CREATE INDEX idx_covers_user_id_created_at 
  ON covers(user_id, created_at DESC) 
  INCLUDE (title, status);

-- Search queries
CREATE INDEX idx_covers_title_gin 
  ON covers USING GIN (to_tsvector('english', title));
CREATE INDEX idx_covers_subject_gin 
  ON covers USING GIN (to_tsvector('english', subject));

-- Status filters
CREATE INDEX idx_covers_status_user_id 
  ON covers(user_id, status);

-- Time-based queries
CREATE INDEX idx_covers_created_at 
  ON covers(created_at DESC);

-- Visibility queries (for sharing)
CREATE INDEX idx_covers_visibility 
  ON covers(visibility, created_at DESC);

-- Course/subject lookups
CREATE INDEX idx_covers_course_code 
  ON covers(course_code);
```

### Relationships
- **M:1** with `user_profiles` - Many covers per user
- **M:1** with `templates` - Many covers use same template
- **1:N** with `cover_exports` - One cover has many exports
- **1:N** with `cover_shares` - One cover can be shared multiple times

### Row-Level Security (RLS)
```sql
ALTER TABLE covers ENABLE ROW LEVEL SECURITY;

-- Users see own covers or shared covers
CREATE POLICY "Users view own or shared covers"
  ON covers FOR SELECT USING (
    auth.uid() = user_id 
    OR visibility = 'public'
    OR EXISTS (
      SELECT 1 FROM cover_shares 
      WHERE cover_id = covers.id 
      AND shared_with_email = auth.jwt() ->> 'email'
    )
  );

-- Users can only modify own covers
CREATE POLICY "Users update own covers"
  ON covers FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete own covers
CREATE POLICY "Users delete own covers"
  ON covers FOR DELETE USING (auth.uid() = user_id);
```

### Performance Notes
- Covers table is write-heavy and read-heavy
- Composite index `(user_id, created_at DESC)` enables pagination
- JSONB `metadata` allows flexible extension without schema changes
- GIN indexes on `title` and `subject` enable full-text search

---

## Table 5: cover_exports

**Purpose**: Audit trail of all PDF/image exports

**Scalability**: 10M+ export records, heavily accessed for statistics

### Field Specifications

| Field Name | Data Type | Constraints | Purpose |
|------------|-----------|-------------|---------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique export ID |
| `cover_id` | BIGINT | NOT NULL, FK → covers.id, ON DELETE CASCADE, INDEXED | Cover exported |
| `user_id` | UUID | NOT NULL, FK → user_profiles.id, ON DELETE CASCADE, INDEXED | User who exported |
| `format` | ENUM | NOT NULL, Values: [pdf, jpg, png] | Export format |
| `file_size` | BIGINT | NOT NULL, CHECK (file_size > 0) | File size in bytes |
| `file_url` | TEXT | NOT NULL | URL to exported file |
| `dpi` | INTEGER | DEFAULT 300, CHECK (dpi IN (72,150,300,600)) | Export resolution |
| `generated_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL, INDEXED | Export timestamp |

### Indexes
```sql
CREATE INDEX idx_cover_exports_cover_id 
  ON cover_exports(cover_id);
CREATE INDEX idx_cover_exports_user_id 
  ON cover_exports(user_id, generated_at DESC);
CREATE INDEX idx_cover_exports_format 
  ON cover_exports(format);
CREATE INDEX idx_cover_exports_generated_at 
  ON cover_exports(generated_at DESC);
```

### Relationships
- **M:1** with `covers` - Many exports per cover
- **M:1** with `user_profiles` - Many exports per user

### Use Cases
- **Analytics**: Track most exported covers
- **Usage statistics**: Monitor export patterns
- **Storage management**: Calculate disk usage by user
- **Audit compliance**: Document export history

---

## Table 6: cover_shares

**Purpose**: Track cover sharing relationships and temporary access

**Scalability**: 1M+ share records with expiration support

### Field Specifications

| Field Name | Data Type | Constraints | Purpose |
|------------|-----------|-------------|---------|
| `id` | BIGSERIAL | PRIMARY KEY | Unique share ID |
| `cover_id` | BIGINT | NOT NULL, FK → covers.id, ON DELETE CASCADE, INDEXED | Shared cover |
| `shared_by_user_id` | UUID | NOT NULL, FK → user_profiles.id, ON DELETE CASCADE, INDEXED | User who shared |
| `shared_with_email` | TEXT | NOT NULL, max 255 chars, INDEXED | Recipient email |
| `share_token` | UUID | UNIQUE NOT NULL, DEFAULT gen_random_uuid() | Secret share link token |
| `permission` | ENUM | DEFAULT 'view', Values: [view, comment, edit] | Access level |
| `expires_at` | TIMESTAMP WITH TIME ZONE | NULL allowed | Link expiration (NULL = never) |
| `created_at` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL | Share creation date |

### Indexes
```sql
CREATE INDEX idx_cover_shares_cover_id 
  ON cover_shares(cover_id);
CREATE INDEX idx_cover_shares_shared_by_user_id 
  ON cover_shares(shared_by_user_id, created_at DESC);
CREATE INDEX idx_cover_shares_share_token 
  ON cover_shares(share_token) WHERE expires_at > NOW();
CREATE INDEX idx_cover_shares_expires_at 
  ON cover_shares(expires_at) WHERE expires_at IS NOT NULL;
```

### Relationships
- **M:1** with `covers` - Many shares per cover
- **M:1** with `user_profiles` (shared_by_user_id) - Sharer

### Use Cases
- **Sharing**: Generate temporary links with expiration
- **Collaboration**: Share with instructors for feedback
- **Public access**: Generate public view-only links

---

## Table 7: audit_logs

**Purpose**: Security audit trail for compliance and debugging

**Scalability**: 50M+ records, optimized for archival

### Field Specifications

| Field Name | Data Type | Constraints | Purpose |
|------------|-----------|-------------|---------|
| `id` | BIGSERIAL | PRIMARY KEY | Audit ID |
| `user_id` | UUID | NULL allowed, FK → user_profiles.id | Acting user |
| `action` | TEXT | NOT NULL, max 50 chars, INDEXED | Action type |
| `resource_type` | TEXT | NOT NULL, max 50 chars | Entity type (cover, export, share) |
| `resource_id` | TEXT | NOT NULL, max 50 chars, INDEXED | Entity ID |
| `old_values` | JSONB | NULL allowed | Previous data (for updates) |
| `new_values` | JSONB | NULL allowed | New data (for updates) |
| `ip_address` | INET | NULL allowed | Client IP |
| `user_agent` | TEXT | NULL allowed | Browser user agent |
| `timestamp` | TIMESTAMP WITH TIME ZONE | DEFAULT NOW(), NOT NULL, INDEXED | When action occurred |

### Indexes
```sql
CREATE INDEX idx_audit_logs_user_id 
  ON audit_logs(user_id, timestamp DESC);
CREATE INDEX idx_audit_logs_resource_type_id 
  ON audit_logs(resource_type, resource_id, timestamp DESC);
CREATE INDEX idx_audit_logs_action 
  ON audit_logs(action);
CREATE INDEX idx_audit_logs_timestamp 
  ON audit_logs(timestamp DESC) WHERE timestamp > NOW() - INTERVAL '1 year';
```

### Use Cases
- **GDPR compliance**: Export user activity history
- **Security**: Detect unauthorized access attempts
- **Debugging**: Trace issue root causes
- **Analytics**: Understand user behavior patterns

---

## Summary Statistics

| Metric | Value | Notes |
|--------|-------|-------|
| **Total Tables** | 7 | All normalized to 3NF |
| **Total Indexes** | 23+ | Optimized for common queries |
| **Foreign Keys** | 8 | Maintain referential integrity |
| **Enums** | 4 | Restrict invalid states |
| **Check Constraints** | 6 | Validate data ranges |
| **Max Scalability** | 5M+ docs | Designed for enterprise scale |

