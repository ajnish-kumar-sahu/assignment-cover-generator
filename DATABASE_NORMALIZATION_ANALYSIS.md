# ScholarFlow Database - Normalization Analysis

## Comprehensive Normalization Strategy and Denormalization Decisions

---

## Executive Summary

This database follows **Third Normal Form (3NF)** with strategic **selective denormalization** for performance optimization. The schema eliminates data redundancy while maintaining referential integrity through foreign key constraints.

**Design Philosophy**: "Normalize by default, denormalize only where performance metrics justify it"

---

## Normalization Levels Explained

### First Normal Form (1NF)
**Goal**: Eliminate repeating groups - all values must be atomic (non-divisible)

**ScholarFlow Compliance**: ✓ FULL COMPLIANCE

| Aspect | Implementation |
|--------|-----------------|
| **Atomic Values** | All fields contain single values (no arrays except JSONB) |
| **Repeating Groups** | Relationships stored in separate tables (shares, exports) |
| **Primary Keys** | Every table has unique identifier |
| **No Composite Attributes** | Address split into city/state/country, not stored as one field |

**Examples of 1NF in ScholarFlow**:
```sql
-- ✓ CORRECT (1NF compliant)
covers: student_name, roll_number, course_code (separate fields)

-- ✗ WRONG (violates 1NF)
covers: student_info "John,12345,CS101" (composite string)
```

---

### Second Normal Form (2NF)
**Goal**: Eliminate partial dependencies - non-key attributes must depend on ENTIRE primary key

**ScholarFlow Compliance**: ✓ FULL COMPLIANCE

#### Analysis by Table

**Table: user_profiles**
- Primary Key: `id` (UUID)
- Every non-key field depends on entire primary key
- No partial dependencies exist

```sql
-- All fields depend on USER id
id → email, display_name, institution_id, department, ...
```

**Table: covers**
- Primary Key: `id` (BIGSERIAL)
- All non-key fields depend on `id`
- No dependencies on `user_id` alone (user data in separate table)

```sql
-- Correct: User data not mixed with cover data
covers.id → user_id, template_id, student_name, ...
user_profiles.id → display_name, email, ...
```

**Table: cover_exports**
- Primary Key: `id` (BIGSERIAL)
- Composite key pattern: `(cover_id, user_id, format)` could form secondary key
- Current design: Single surrogate key with separate FKs

```sql
-- Why separate table:
-- cover_id → export data
-- user_id → export data
-- Not: cover_id → user_id (would violate 2NF)
```

---

### Third Normal Form (3NF)
**Goal**: Eliminate transitive dependencies - non-key attributes must depend only on primary key, not other non-key attributes

**ScholarFlow Compliance**: ✓ FULL COMPLIANCE

#### Transitive Dependency Analysis

**What we AVOID** (transitive dependencies):
```sql
-- ✗ VIOLATES 3NF
covers: user_id → institution_id → logo_url
        (user determines institution, institution determines logo)

-- ✓ CORRECT (3NF compliant)
covers: logo_url (stored directly)
user_profiles: institution_id (links to institutions)
institutions: id → logo_url (logo depends on institution)
```

**Key Principle Applied**:
Every non-key attribute depends on "the key, the whole key, and nothing but the key"

#### Examples in ScholarFlow

**✓ Correct 3NF Design**:
```sql
-- user_profiles table
id (key) → email, display_name, institution_id
institution_id (FK, not key) → points to institutions table

-- institutions table
id (key) → name, logo_url, email_domain
(All fields depend on institution ID only)

-- covers table
id (key) → user_id, student_name, course_code
(All fields depend on cover ID, user data accessed via FK)
```

**Why This Matters**:
- Eliminates anomalies (update, delete, insert)
- Reduces redundancy
- Maintains data consistency

---

## Redundancy Analysis

### Planned Redundancy (Denormalization)

Some fields are intentionally denormalized for performance. These are documented here:

#### 1. **Denormalized Counters in institutions table**

```sql
institutions:
  user_count INTEGER (denormalized)
  cover_count INTEGER (denormalized)
```

**Why**: Querying 100K+ users for institution stats would be slow
**Updated By**: TRIGGER on user_profiles INSERT/DELETE
**Trade-off**: 
- **Pro**: O(1) query for institution stats
- **Con**: Must maintain trigger to keep consistent

**Query Cost Comparison**:
```sql
-- WITHOUT denormalization (costly)
SELECT COUNT(*) FROM user_profiles 
WHERE institution_id = 1;
-- Cost: ~100-500ms for large tables

-- WITH denormalization (fast)
SELECT user_count FROM institutions 
WHERE id = 1;
-- Cost: ~1ms
```

#### 2. **Cached Template HTML in templates table**

```sql
templates:
  html_template TEXT (denormalized)
  css_styles TEXT (denormalized)
```

**Why**: Fetching template content on every app startup should be instant
**Updated By**: Admin updates only
**Strategy**: Load all templates into app memory cache
**Trade-off**:
- **Pro**: Single query loads all templates
- **Con**: Duplicates template content across app instances

---

### Eliminated Redundancy

Data that could be duplicated but ISN'T:

#### ✓ Removed: User Data from covers
```sql
-- ✗ ORIGINAL (redundant)
covers: user_id, user_email, user_name, ...
(User data duplicated in every cover)

-- ✓ REFACTORED (normalized)
covers: user_id (FK)
user_profiles: id → email, display_name
(User data stored once)
```

**Savings**: ~200 bytes × 5M covers = 1TB storage reduction

#### ✓ Removed: Institution Data from covers
```sql
-- ✗ ORIGINAL
covers: institution_id, logo_url, institution_name, email_domain, ...

-- ✓ REFACTORED
covers: logo_url, institution_name (as-of-snapshot)
institutions: id → official logo_url, institution_name
```

**Note**: Institution branding stored in cover for versioning (user's cover keeps original logo, even if institution logo changes)

#### ✓ Removed: Template HTML from covers
```sql
-- ✗ WRONG (massive redundancy)
covers: template_id, html_template (entire HTML in each cover)

-- ✓ CORRECT (references only)
covers: template_id (FK)
templates: id → html_template
(HTML generated at render time)
```

---

## Foreign Key Strategy

### Referential Integrity

All relationships enforced at database level:

```sql
-- User → Institution (SET NULL on delete)
ALTER TABLE user_profiles 
ADD CONSTRAINT fk_user_institution
FOREIGN KEY (institution_id) REFERENCES institutions(id) 
ON DELETE SET NULL;
-- Why SET NULL: Deleted institution doesn't delete users

-- Cover → User (CASCADE on delete)
ALTER TABLE covers 
ADD CONSTRAINT fk_cover_user
FOREIGN KEY (user_id) REFERENCES user_profiles(id) 
ON DELETE CASCADE;
-- Why CASCADE: Delete user's covers automatically

-- Cover → Template (RESTRICT on delete)
ALTER TABLE covers 
ADD CONSTRAINT fk_cover_template
FOREIGN KEY (template_id) REFERENCES templates(id) 
ON DELETE RESTRICT;
-- Why RESTRICT: Can't delete template if covers use it
```

### Deletion Cascades

```
user_profiles DELETE
  ↓ CASCADE
covers (all user's covers)
  ↓ CASCADE
cover_exports (export records)
cover_shares (share records)
  ↓ CASCADE
audit_logs (for those resources)
```

---

## Update Anomalies Prevention

### Insert Anomalies

**Problem**: Can't add institution data without user

**Solution**: Separate institutions table
```sql
-- ✓ Can insert institution without users
INSERT INTO institutions (name, slug, country) 
VALUES ('Harvard', 'harvard', 'USA');

-- Then users can reference it
INSERT INTO user_profiles (institution_id, ...) 
VALUES (1, ...);
```

### Update Anomalies

**Problem**: Changing institution logo requires updating all 100K covers

**Solution**: Store logo in institutions, reference in covers
```sql
-- Change once
UPDATE institutions SET logo_url = '...' WHERE id = 1;

-- All covers automatically use new logo
SELECT logo_url FROM institutions WHERE id = 1;
```

**Exception**: Covers store snapshot of logo for versioning
```sql
covers.logo_url (snapshot of logo at creation time)
-- Allows: Users to see original logo even if institution updates it
```

### Delete Anomalies

**Problem**: Deleting last cover for user loses template usage data

**Solution**: Separate cover_exports table
```sql
-- Delete cover, but keep export history
DELETE FROM covers WHERE id = 1;
-- cover_exports records still exist (linked by cover_id)

-- OR: Use SOFT DELETE
covers: deleted_at TIMESTAMP (NULL until deleted)
-- Never actually delete, just mark deleted_at
```

---

## Denormalization vs Performance Analysis

| Factor | Decision | Justification |
|--------|----------|---------------|
| Institution counters | DENORMALIZED | User/cover counts queried every page load |
| Template content | DENORMALIZED | All templates loaded on app startup |
| Cover logo snapshot | DENORMALIZED | Track logo as-of-creation-date |
| User name in cover | NOT DENORMALIZED | Can access via FK join |
| Institution name | STORED (snapshot) | Allows covers to show original institution name |

---

## Scalability and Normalization

### How Normalization Enables Scaling

**1. Horizontal Partitioning**
```sql
-- Can shard covers by user_id across databases
-- user_profiles stays on central database
-- Possible because: Foreign key to user_id, not embedded user data
```

**2. Archive Old Data**
```sql
-- Can archive covers from 2023 separately
-- Covers don't contain user data duplication
-- Archiving one table doesn't affect others
```

**3. Index Optimization**
```sql
-- Normalized schema allows strategic indexing
-- user_profiles: (id, email) - small table
-- covers: (user_id, created_at) - composite on hot path
-- No redundant indexes on duplicated fields
```

---

## Future Normalization Decisions

### If Adding NEW Features

**Example: Colleges/Schools within Institutions**

```sql
-- ✓ NORMALIZED APPROACH
institutions: id, name, slug
colleges: id, institution_id, name, dean_email
user_profiles: college_id (FK)

-- Allows:
-- - Multiple colleges per institution
-- - Different settings per college
-- - Analytics by college
```

**Example: Cover Templates with Variants**

```sql
-- ✓ NORMALIZED APPROACH
templates: id, name
template_variants: id, template_id, name, variant_type
covers: template_variant_id (FK)

-- Allows:
-- - A4 vs Letter variants
-- - Dark mode variant
-- - Multiple language variants
```

---

## Normalization Checklist

- ✓ 1NF: All atomic values, no repeating groups
- ✓ 2NF: No partial dependencies on composite keys
- ✓ 3NF: No transitive dependencies
- ✓ BCNF: Every determinant is candidate key
- ✓ Foreign key constraints enforced
- ✓ Delete cascades designed carefully
- ✓ Denormalization justified and documented
- ✓ No redundant column storage
- ✓ Audit trail maintained (audit_logs)

