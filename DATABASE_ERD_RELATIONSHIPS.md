# ScholarFlow Database - Entity Relationship Diagrams & Relationships

## Complete Visual Documentation of Table Relationships

---

## Master ERD (All Tables)

```
                              ┌─────────────────────────────────────────────────────────────┐
                              │                    SUPABASE auth.users                      │
                              │ ───────────────────────────────────────────────────────────┤
                              │ • id (UUID) - Primary Key                                  │
                              │ • email - User email from authentication                    │
                              │ • created_at - Account creation date                       │
                              └────────────┬────────────────────────────────────────────────┘
                                           │
                                           │ 1:1 Relationship
                                           │ (auth.uid() = user_profiles.id)
                                           │
        ┌──────────────────────────────────▼──────────────────────────────────┐
        │                         user_profiles                               │
        │ ─────────────────────────────────────────────────────────────────  │
        │ ◆ id (UUID, PK) ─ Linked to auth.users.id                         │
        │ • email (TEXT, UNIQUE) - Cached from auth                         │
        │ • display_name (TEXT) - User's public name                         │
        │ • institution_id (FK → institutions.id) - Links to school         │
        │ • department (TEXT) - Faculty/department                           │
        │ • bio (TEXT) - User biography                                      │
        │ • avatar_url (TEXT) - Profile picture URL                         │
        │ • theme_preference (ENUM) - UI theme preference                   │
        │ • export_dpi (INTEGER) - PDF export quality                       │
        │ • auto_sync (BOOLEAN) - Auto-sync setting                         │
        │ • created_at, updated_at (TIMESTAMPS)                             │
        └─────────┬──────────────────────────┬──────────────────┬───────────┘
                  │                          │                  │
        ┌─────────▼────────────┐    ┌────────▼─────────┐   ┌───▼────────────────────┐
        │   institutions (1:N)  │    │  covers (1:N)    │   │ cover_shares (1:N)     │
        │ ─────────────────────│    │ ──────────────── │   │ ──────────────────────│
        │ ◆ id (PK)            │    │ ◆ id (PK)        │   │ ◆ id (PK)             │
        │ • name (UNIQUE)      │    │ • user_id (FK)   │   │ • cover_id (FK)       │
        │ • slug (UNIQUE)      │    │ • template_id(FK)│   │ • shared_by_user_id   │
        │ • country, city      │    │ • title          │   │ • shared_with_email   │
        │ • logo_url           │    │ • student_name   │   │ • share_token         │
        │ • verified, verified_at   │ • subject       │   │ • expires_at          │
        │ • user_count (denorm)│    │ • course_code    │   │ • created_at          │
        │ • cover_count (denorm)    │ • theme_color   │   │                       │
        │ • created_at, updated_at  │ • status (ENUM) │   │                       │
        └──────────────────────┘    │ • visibility    │   │                       │
                                    │ • metadata (JSON)│  │                       │
                                    │ • created_at    │   │                       │
                                    │ • updated_at    │   │                       │
                                    │ • exported_at   │   │                       │
                                    └────────┬────────┘   └───────────────────────┘
                                             │
                                             │ 1:N
                                             │
                                    ┌────────▼──────────────────┐
                                    │  cover_exports            │
                                    │ ───────────────────────── │
                                    │ ◆ id (PK)                 │
                                    │ • cover_id (FK)           │
                                    │ • user_id (FK)            │
                                    │ • format (ENUM: pdf/jpg)  │
                                    │ • file_size (BIGINT)      │
                                    │ • file_url (TEXT)         │
                                    │ • dpi (INTEGER)           │
                                    │ • generated_at (TS)       │
                                    └───────────────────────────┘


                              ┌──────────────────────────────────────────┐
                              │         templates (Standalone)           │
                              │ ──────────────────────────────────────── │
                              │ ◆ id (PK)                               │
                              │ • slug (UNIQUE)                         │
                              │ • name - Template name                  │
                              │ • description - Brief description       │
                              │ • category - Type (academic, prof)      │
                              │ • thumbnail_url - Preview image        │
                              │ • preview_url - Full preview           │
                              │ • is_premium - Premium flag             │
                              │ • suggested_colors - Color palette      │
                              │ • html_template - Template HTML         │
                              │ • css_styles - Template CSS             │
                              │ • created_at, updated_at               │
                              │                                         │
                              │ (Links to covers.template_id) ←────────│
                              │ (Used by ~7 different covers each)     │
                              └──────────────────────────────────────────┘


                              ┌──────────────────────────────────────────┐
                              │      audit_logs (Independent Table)      │
                              │ ──────────────────────────────────────── │
                              │ ◆ id (PK)                               │
                              │ • user_id (FK, nullable) - Actor       │
                              │ • action - Type of action               │
                              │ • resource_type - What was changed      │
                              │ • resource_id - Which resource          │
                              │ • old_values (JSONB) - Before values    │
                              │ • new_values (JSONB) - After values     │
                              │ • ip_address - Client IP                │
                              │ • user_agent - Browser info             │
                              │ • timestamp - When it happened          │
                              │                                         │
                              │ (Tracks all actions on all tables)     │
                              └──────────────────────────────────────────┘

Legend:
  ◆ = Primary Key (PK)
  • = Regular Column
  FK = Foreign Key (references another table)
  1:1 = One to One relationship
  1:N = One to Many relationship
  denorm = Denormalized (intentionally duplicated for performance)
```

---

## Relationship Definitions

### 1. auth.users ↔ user_profiles (1:1)

```
┌─────────────────────┐
│    auth.users       │
│ ─────────────────── │
│ id (UUID)           │
│ email               │
│ created_at          │
└──────────┬──────────┘
           │ 1:1
           │ (Foreign key constraint)
           │
┌──────────▼──────────────────┐
│   user_profiles             │
│ ─────────────────────────── │
│ id (UUID, FK→auth.users.id) │
│ email (synced from auth)    │
│ display_name                │
│ ...                         │
└─────────────────────────────┘
```

**Type**: One auth user → One user_profile
**Why Separate Tables**:
- Supabase auth handles authentication
- user_profiles extends with app-specific data
- Separation of concerns

**Foreign Key**:
```sql
ALTER TABLE user_profiles
ADD CONSTRAINT fk_user_profiles_auth_user
FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
```

**Access Pattern**:
```sql
-- Get user profile after login
SELECT * FROM user_profiles WHERE id = auth.uid();
```

---

### 2. user_profiles ↔ institutions (M:1)

```
┌─────────────────────────────┐
│   institutions              │
│ ─────────────────────────── │
│ ◆ id (PK)                   │
│ • name                      │
│ • slug                      │
│ • country                   │
│ • logo_url                  │
│ • user_count (denormalized) │
│ • cover_count (denormalized)│
└──────────┬──────────────────┘
           │ 1:N (One institution has many users)
           │
┌──────────▼──────────────────────────────────┐
│         user_profiles                       │
│ ─────────────────────────────────────────── │
│ ◆ id (PK)                                   │
│ • email                                     │
│ • institution_id (FK→institutions.id) ◄────┘
│ • display_name                              │
│ • department                                │
└─────────────────────────────────────────────┘
```

**Type**: Many users → One institution
**Cardinality**: 100K users could belong to same university
**Delete Strategy**: ON DELETE SET NULL
- If institution deleted, users remain (institution_id becomes NULL)

**Foreign Key**:
```sql
ALTER TABLE user_profiles
ADD CONSTRAINT fk_user_profiles_institutions
FOREIGN KEY (institution_id) REFERENCES institutions(id) 
ON DELETE SET NULL;
```

**Query Examples**:
```sql
-- Get all users from Oxford
SELECT * FROM user_profiles 
WHERE institution_id = (
  SELECT id FROM institutions WHERE slug = 'oxford-university'
);

-- Get stats for institution
SELECT 
  i.name,
  i.user_count,
  i.cover_count
FROM institutions i
WHERE i.id = 1;
```

**Denormalized Counters**:
```sql
-- Maintained by triggers:
-- ON INSERT user_profiles: UPDATE institutions SET user_count = user_count + 1
-- ON DELETE user_profiles: UPDATE institutions SET user_count = user_count - 1
```

---

### 3. user_profiles ↔ covers (1:N)

```
┌──────────────────────────────────┐
│      user_profiles (1 user)      │
│ ─────────────────────────────── │
│ ◆ id (UUID)                      │
│ • email                          │
│ • display_name                   │
└──────────┬───────────────────────┘
           │ 1:N (User has many covers)
           │
      ┌────▼──────────────────────────────┐
      │ covers (Multiple covers per user)  │
      │ ──────────────────────────────────│
      │ ◆ id #1 (user_id = X)             │
      │ ◆ id #2 (user_id = X)             │
      │ ◆ id #3 (user_id = X)             │
      │ ◆ id #4 (user_id = X)             │
      │ ... (5M total covers)              │
      └─────────────────────────────────┘
```

**Type**: One user → Many covers
**Cardinality**: One user can have 10-1000 covers
**Delete Strategy**: ON DELETE CASCADE
- If user deleted, all their covers deleted

**Foreign Key**:
```sql
ALTER TABLE covers
ADD CONSTRAINT fk_covers_user_profiles
FOREIGN KEY (user_id) REFERENCES user_profiles(id) 
ON DELETE CASCADE;
```

**Query Examples**:
```sql
-- Get user's covers (MOST COMMON QUERY)
SELECT * FROM covers 
WHERE user_id = '550e8400' 
ORDER BY created_at DESC 
LIMIT 20;
-- Uses index: idx_covers_user_created

-- Delete user and all covers
DELETE FROM user_profiles WHERE id = 'X';
-- Cascades: Deletes all covers, exports, shares for this user
```

**Index Strategy**:
```sql
-- Composite index for this relationship
CREATE INDEX idx_covers_user_created 
ON covers(user_id, created_at DESC) 
INCLUDE (title, status);
-- Allows: Filter by user + Sort by date in single index scan
```

---

### 4. covers ↔ templates (M:1)

```
┌──────────────────────────────┐
│    templates (7 static)      │
│ ──────────────────────────── │
│ ◆ id (1-7)                   │
│ • slug                       │
│ • name                       │
│ • html_template              │
│ • css_styles                 │
└──────────┬───────────────────┘
           │ 1:N (Each template used by many covers)
           │
      ┌────▼──────────────────────┐
      │ covers                     │
      │ ──────────────────────────│
      │ ◆ id #1 (template_id = 1) │
      │ ◆ id #2 (template_id = 1) │
      │ ◆ id #3 (template_id = 3) │
      │ ◆ id #4 (template_id = 1) │
      │ ... (5M covers)            │
      └──────────────────────────┘
```

**Type**: One template → Many covers
**Cardinality**: Each template used by ~700K covers
**Delete Strategy**: ON DELETE RESTRICT
- Can't delete template if covers use it

**Foreign Key**:
```sql
ALTER TABLE covers
ADD CONSTRAINT fk_covers_template
FOREIGN KEY (template_id) REFERENCES templates(id) 
ON DELETE RESTRICT;
```

**Query Examples**:
```sql
-- Get most popular template
SELECT template_id, COUNT(*) as usage_count
FROM covers
GROUP BY template_id
ORDER BY usage_count DESC
LIMIT 1;

-- Can't delete template if covers reference it
DELETE FROM templates WHERE id = 1;
-- ERROR: violates foreign key constraint
```

**Caching Strategy**:
```sql
-- Load all templates at app startup
SELECT * FROM templates;
-- Cache in memory (7 rows, ~10KB total)
-- Invalidate on template update
```

---

### 5. covers ↔ cover_exports (1:N)

```
┌────────────────────────────────────┐
│   covers (One cover)               │
│ ────────────────────────────────── │
│ ◆ id #12345                        │
│ • title: "Assignment Cover"        │
│ • student_name: "John Doe"        │
│ • ...                              │
└────────────┬──────────────────────┘
             │ 1:N (Cover exported multiple times)
             │
       ┌─────▼───────────────────────────────────┐
       │ cover_exports                           │
       │ ───────────────────────────────────────│
       │ ◆ id #1 (cover_id=12345, format=pdf) │
       │ ◆ id #2 (cover_id=12345, format=jpg) │
       │ ◆ id #3 (cover_id=12345, format=pdf) │
       │ ... (50M total exports)                │
       └─────────────────────────────────────────┘
```

**Type**: One cover → Many exports
**Cardinality**: Cover exported 5-50 times on average
**Delete Strategy**: ON DELETE CASCADE
- If cover deleted, export records deleted

**Foreign Key**:
```sql
ALTER TABLE cover_exports
ADD CONSTRAINT fk_cover_exports_cover
FOREIGN KEY (cover_id) REFERENCES covers(id) 
ON DELETE CASCADE;
```

**Query Examples**:
```sql
-- Get export history for a cover
SELECT 
  format, 
  file_size, 
  generated_at
FROM cover_exports
WHERE cover_id = 12345
ORDER BY generated_at DESC;

-- Total exports per cover
SELECT 
  c.title,
  COUNT(e.id) as export_count
FROM covers c
LEFT JOIN cover_exports e ON e.cover_id = c.id
GROUP BY c.id, c.title
ORDER BY export_count DESC;

-- Delete cover (exports auto-deleted)
DELETE FROM covers WHERE id = 12345;
-- Cascade: Deletes all export records
```

---

### 6. covers ↔ cover_shares (1:N)

```
┌────────────────────────────┐
│   covers (One cover)       │
│ ──────────────────────────│
│ ◆ id #12345               │
│ • title: "Assignment"     │
│ • visibility: 'shared'    │
└────────────┬──────────────┘
             │ 1:N (Shared with multiple people)
             │
       ┌─────▼──────────────────────────────────┐
       │ cover_shares                           │
       │ ──────────────────────────────────────│
       │ ◆ id #1 (cover_id=12345, email=...) │
       │ ◆ id #2 (cover_id=12345, email=...) │
       │ ◆ id #3 (cover_id=12345, email=...) │
       │ ... (1M total shares)                  │
       └──────────────────────────────────────┘
```

**Type**: One cover → Many shares
**Cardinality**: Cover shared with 1-20 people typically
**Delete Strategy**: ON DELETE CASCADE
- If cover deleted, share links deleted

**Foreign Key**:
```sql
ALTER TABLE cover_shares
ADD CONSTRAINT fk_cover_shares_cover
FOREIGN KEY (cover_id) REFERENCES covers(id) 
ON DELETE CASCADE;
```

**Query Examples**:
```sql
-- Share a cover
INSERT INTO cover_shares (cover_id, shared_by_user_id, shared_with_email, share_token)
VALUES (12345, 'user-id', 'recipient@example.com', gen_random_uuid());

-- Check if email can access cover
SELECT COUNT(*) FROM cover_shares
WHERE cover_id = 12345 
AND (shared_with_email = 'recipient@example.com'
  OR expires_at IS NULL OR expires_at > NOW());

-- Get shares for a cover
SELECT shared_with_email, expires_at, created_at
FROM cover_shares
WHERE cover_id = 12345;
```

---

### 7. user_profiles ↔ cover_shares (1:N)

```
┌─────────────────────────────────┐
│   user_profiles                 │
│ ───────────────────────────────│
│ ◆ id (User who shared)          │
│ • email: "professor@uni.edu"    │
└────────────┬────────────────────┘
             │ 1:N (Shares covers with others)
             │
       ┌─────▼────────────────────────────┐
       │ cover_shares                      │
       │ ──────────────────────────────── │
       │ • shared_by_user_id = X          │
       │ • shared_with_email = "..."      │
       │ ... (1M total shares)             │
       └──────────────────────────────────┘
```

**Type**: One user → Many shares they created
**Cardinality**: User shares 0-100 covers
**Delete Strategy**: ON DELETE CASCADE
- If user deleted, shares they created are deleted

**Foreign Key**:
```sql
ALTER TABLE cover_shares
ADD CONSTRAINT fk_cover_shares_user
FOREIGN KEY (shared_by_user_id) REFERENCES user_profiles(id) 
ON DELETE CASCADE;
```

---

### 8. user_profiles ↔ cover_exports (1:N)

```
┌──────────────────────────────┐
│   user_profiles (User)       │
│ ────────────────────────────│
│ ◆ id                         │
│ • email: "student@uni.edu"   │
└────────────┬─────────────────┘
             │ 1:N (User exports covers)
             │
       ┌─────▼─────────────────────────┐
       │ cover_exports                  │
       │ ───────────────────────────── │
       │ • user_id (exporter)           │
       │ ... (50M total exports)        │
       └────────────────────────────────┘
```

**Type**: One user → Many exports they created
**Cardinality**: User exports 100-10K times
**Delete Strategy**: ON DELETE CASCADE
- If user deleted, their export history deleted

**Foreign Key**:
```sql
ALTER TABLE cover_exports
ADD CONSTRAINT fk_cover_exports_user
FOREIGN KEY (user_id) REFERENCES user_profiles(id) 
ON DELETE CASCADE;
```

**Query Examples**:
```sql
-- Get user's export history
SELECT c.title, e.format, e.generated_at
FROM cover_exports e
JOIN covers c ON e.cover_id = c.id
WHERE e.user_id = 'user-id'
ORDER BY e.generated_at DESC;
```

---

## Relationship Cardinality Summary

| Relationship | Type | Cardinality | Delete Strategy |
|--|--|--|--|
| auth.users → user_profiles | 1:1 | 1 user → 1 profile | CASCADE |
| user_profiles → institutions | M:1 | 100K users → 1 institution | SET NULL |
| user_profiles → covers | 1:N | 1 user → 1000 covers | CASCADE |
| user_profiles → cover_exports | 1:N | 1 user → 10K exports | CASCADE |
| user_profiles → cover_shares | 1:N | 1 user → 100 shares | CASCADE |
| covers → templates | M:1 | 700K covers → 1 template | RESTRICT |
| covers → cover_exports | 1:N | 1 cover → 50 exports | CASCADE |
| covers → cover_shares | 1:N | 1 cover → 20 shares | CASCADE |

---

## Data Flow Diagram

```
USER JOURNEY:
─────────────

[Sign Up] 
    ↓
[Create auth.users] 
    ↓
[Create user_profiles] 
    ↓
[Link to institution]  → institutions table
    ↓
[Create first cover]  → covers table
    ↓
[Select template]     → links to templates
    ↓
[Edit cover fields]   → updates covers
    ↓
[Export PDF]          → creates cover_exports record
    ↓
[Share cover]         → creates cover_shares record
    ↓
[Other users view]    → verifies share_token exists


DELETION CASCADE FLOW:
──────────────────────

DELETE user_profiles WHERE id = X
    ↓ CASCADE DELETE covers
        ↓ CASCADE DELETE cover_exports
        ↓ CASCADE DELETE cover_shares
            ↓ DELETE audit_logs references


QUERY OPTIMIZATION FLOW:
────────────────────────

User requests dashboard
    ↓
Query: GET user_profiles (1ms, index: email)
    ↓
Query: GET covers (5ms, index: user_id + created_at)
    ↓
Query: GET institutions (1ms, cached in memory)
    ↓
Query: GET templates (cached in memory)
    ↓
Render dashboard (total: 10ms)
```

---

## Referential Integrity Rules

All relationships enforced with constraints:

```sql
-- Cannot have orphaned covers (must have user)
covers.user_id REFERENCES user_profiles(id) NOT NULL

-- Cannot have orphaned exports (must have cover)
cover_exports.cover_id REFERENCES covers(id) NOT NULL

-- Cannot share deleted cover
cover_shares.cover_id REFERENCES covers(id) NOT NULL

-- Can unlink institution (user still exists)
user_profiles.institution_id REFERENCES institutions(id) ON DELETE SET NULL

-- Cannot use deleted template
covers.template_id REFERENCES templates(id) ON DELETE RESTRICT

-- Delete user → deletes all their data
user_profiles.id REFERENCED BY:
  - covers ON DELETE CASCADE
  - cover_exports ON DELETE CASCADE
  - cover_shares ON DELETE CASCADE
  - audit_logs (not deleted, preserved)
```

This ensures **data consistency** - impossible to have orphaned records.

