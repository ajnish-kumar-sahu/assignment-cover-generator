# Database Implementation Guide for ScholarFlow

## Quick Start

### 1. Execute Migration Script
```bash
# Using Supabase SQL Editor (Easiest)
# 1. Go to Supabase Dashboard → SQL Editor
# 2. Create New Query
# 3. Copy & paste contents of scripts/01-init-database.sql
# 4. Click "Run"

# OR using psql command line
psql -U postgres -d scholarflow -f scripts/01-init-database.sql
```

### 2. Verify Installation
```sql
-- Check tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should return:
-- audit_logs
-- cover_exports
-- cover_shares
-- covers
-- institutions
-- templates
-- user_profiles
```

### 3. Verify Indexes
```sql
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

### 4. Check RLS Policies
```sql
SELECT tablename, policyname, permissive, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;
```

---

## Implementation Steps

### Step 1: Enable Row-Level Security
All tables require RLS to be enabled (already done by migration script):
```sql
ALTER TABLE public.covers ENABLE ROW LEVEL SECURITY;
```

### Step 2: Set Up Authentication
Ensure Supabase Auth is configured in your Next.js app:

```typescript
// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Step 3: Create Database Utilities

```typescript
// lib/db.ts
import { supabase } from './supabaseClient'

export const db = {
  // User Management
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Cover Management
  async createCover(cover: any) {
    const { data, error } = await supabase
      .from('covers')
      .insert([cover])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserCovers(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from('covers')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async getCoverById(coverId: number) {
    const { data, error } = await supabase
      .from('covers')
      .select('*')
      .eq('id', coverId)
      .single()
    
    if (error) throw error
    return data
  },

  async updateCover(coverId: number, updates: any) {
    const { data, error } = await supabase
      .from('covers')
      .update(updates)
      .eq('id', coverId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteCover(coverId: number) {
    const { error } = await supabase
      .from('covers')
      .delete()
      .eq('id', coverId)
    
    if (error) throw error
  },

  // Templates
  async getTemplates() {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  // Institutions
  async getInstitutions() {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('verified', true)
      .order('name')
    
    if (error) throw error
    return data
  },

  async findInstitutionByEmail(emailDomain: string) {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('email_domain', emailDomain)
      .single()
    
    if (error) throw null
    return data
  },

  // Exports
  async recordExport(export_data: any) {
    const { data, error } = await supabase
      .from('cover_exports')
      .insert([export_data])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Sharing
  async createShare(share_data: any) {
    const { data, error } = await supabase
      .from('cover_shares')
      .insert([share_data])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getSharedCover(shareToken: string) {
    const { data, error } = await supabase
      .from('cover_shares')
      .select('covers(*)')
      .eq('share_token', shareToken)
      .single()
    
    if (error) throw error
    return data?.covers
  }
}
```

### Step 4: Update Application Store

Migrate from localStorage to Supabase:

```typescript
// store/useAppStore.ts (Updated)
import { create } from 'zustand'
import { db } from '@/lib/db'

interface AppState {
  // ... existing state
  loadUserCovers: () => Promise<void>
  saveCoverToDatabase: (cover: CoverData) => Promise<void>
  deleteCoverFromDatabase: (coverId: number) => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
  // ... existing state

  loadUserCovers: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const covers = await db.getUserCovers(user.id)
      set({ savedCovers: covers })
    } catch (error) {
      console.error('Failed to load covers:', error)
    }
  },

  saveCoverToDatabase: async (cover: CoverData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const newCover = await db.createCover({
        user_id: user.id,
        title: cover.subject,
        template_id: 1,
        status: 'draft',
        ...cover
      })

      set((state) => ({
        savedCovers: [newCover, ...state.savedCovers]
      }))
    } catch (error) {
      console.error('Failed to save cover:', error)
    }
  },

  deleteCoverFromDatabase: async (coverId: number) => {
    try {
      await db.deleteCover(coverId)
      set((state) => ({
        savedCovers: state.savedCovers.filter(c => c.id !== coverId)
      }))
    } catch (error) {
      console.error('Failed to delete cover:', error)
    }
  }
}))
```

### Step 5: Update Components

Convert MyCovers to use database:

```typescript
// pages/MyCovers.tsx (Updated)
import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export default function MyCovers() {
  const { savedCovers, loadUserCovers } = useAppStore()

  useEffect(() => {
    loadUserCovers()
  }, [loadUserCovers])

  // ... rest of component
}
```

---

## Data Migration Strategy

### From localStorage to Supabase

```typescript
// scripts/migrate-local-to-db.ts
import { supabase } from '@/lib/supabaseClient'

export async function migrateLocalStorageToDatabase() {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Get local covers
    const localStore = JSON.parse(localStorage.getItem('scholarflow-storage') || '{}')
    const localCovers = localStore.state?.savedCovers || []

    if (localCovers.length === 0) {
      console.log('No local covers to migrate')
      return
    }

    // Migrate to database
    const { data, error } = await supabase
      .from('covers')
      .insert(
        localCovers.map((cover: any) => ({
          user_id: user.id,
          title: cover.subject || 'Untitled',
          template_id: 1, // Default to first template
          student_name: cover.studentName,
          subject: cover.subject,
          course_code: cover.courseCode,
          roll_number: cover.rollNumber,
          semester: cover.semester,
          assignment_type: cover.assignmentType,
          submission_date: cover.submissionDate,
          theme_color: cover.themeColor,
          university_name: cover.universityName,
          department: cover.department,
          logo_url: cover.logoUrl,
          status: 'draft',
          visibility: 'private',
          metadata: {
            migrated_from: 'localStorage',
            original_id: cover.id,
            migrated_at: new Date().toISOString()
          }
        }))
      )

    if (error) throw error

    console.log(`Successfully migrated ${data.length} covers`)

    // Optionally: Clear local storage after verification
    // localStorage.removeItem('scholarflow-storage')

    return data
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}

// Run in your app:
// await migrateLocalStorageToDatabase()
```

---

## Backup & Export Scripts

### Export All User Data (GDPR Compliance)

```typescript
export async function exportUserData(userId: string) {
  try {
    const userProfile = await db.getUserProfile(userId)
    const covers = await db.getUserCovers(userId, 10000)
    const exports = await supabase
      .from('cover_exports')
      .select('*')
      .eq('user_id', userId)

    const data = {
      profile: userProfile,
      covers: covers,
      exports: exports.data,
      exportedAt: new Date().toISOString()
    }

    // Convert to JSON and download
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scholarflow-data-${userId}.json`
    a.click()
  } catch (error) {
    console.error('Export failed:', error)
  }
}
```

### Database Backup Script

```bash
#!/bin/bash
# scripts/backup-database.sh

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
BACKUP_FILE="$BACKUP_DIR/scholarflow_backup_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

# Export tables
pg_dump \
  --host=$POSTGRES_HOST \
  --user=$POSTGRES_USER \
  --password \
  --db=$POSTGRES_DATABASE \
  > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

echo "Backup completed: ${BACKUP_FILE}.gz"
```

---

## Performance Optimization

### 1. Query Optimization

Always use indexes:

```typescript
// GOOD - Uses index on (user_id, created_at DESC)
const covers = await supabase
  .from('covers')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(20)

// BAD - Would require full table scan
const covers = await supabase
  .from('covers')
  .select('*')
  .like('subject', `%${query}%`)
```

### 2. Connection Pooling

Enable PgBouncer in Supabase project settings:
- Settings → Database → Connection Pooling
- Set to "transaction" mode for serverless

### 3. Materialized Views

For frequent aggregations:

```sql
CREATE MATERIALIZED VIEW public.cover_stats AS
SELECT 
  user_id,
  COUNT(*) as total_covers,
  COUNT(*) FILTER (WHERE status = 'published') as published_count,
  COUNT(*) FILTER (WHERE visibility = 'public') as public_count
FROM covers
GROUP BY user_id;

-- Refresh weekly
REFRESH MATERIALIZED VIEW public.cover_stats;
```

### 4. Caching Strategy

```typescript
import { cache } from 'react'

// Cache at request level
export const getTemplates = cache(async () => {
  return await db.getTemplates()
})

// Cache at application level (if using Redis)
export async function getTemplatesWithCache() {
  const cached = await redis.get('templates')
  if (cached) return JSON.parse(cached)

  const templates = await db.getTemplates()
  await redis.setex('templates', 3600, JSON.stringify(templates))
  return templates
}
```

---

## Monitoring & Maintenance

### Setup Alerts (Supabase Dashboard)

1. **Database Size**
   - Alert if tables > 5GB
   - Action: Archive old exports, delete archived covers

2. **Query Performance**
   - Alert if max query time > 1 second
   - Action: Check slow query logs, optimize queries

3. **Connection Limit**
   - Alert if active connections > 90% of limit
   - Action: Investigate long-running queries

4. **Backup Status**
   - Daily automated backups (Supabase managed)
   - Verify point-in-time recovery works weekly

### Regular Maintenance Tasks

```sql
-- Monthly: Analyze query performance
ANALYZE public.covers;

-- Quarterly: Remove expired shares
DELETE FROM cover_shares 
WHERE expires_at < NOW() - INTERVAL '1 month';

-- Quarterly: Archive old exports
UPDATE cover_exports 
SET storage_path = 'archive/' || storage_path
WHERE generated_at < NOW() - INTERVAL '90 days';

-- Yearly: Archive old audit logs
INSERT INTO audit_logs_archive SELECT * 
FROM audit_logs 
WHERE created_at < NOW() - INTERVAL '1 year';
```

---

## Security Best Practices

### 1. Row-Level Security (RLS)

All implemented via policies (see DATABASE_SCHEMA.md)

### 2. Data Encryption

Enable encryption at rest (Supabase default):
```sql
-- Enable pge_crypt for sensitive fields if needed
CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE user_profiles 
ALTER COLUMN bio USING pgp_sym_encrypt(bio, 'key');
```

### 3. API Rate Limiting

```typescript
// pages/api/covers.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
})

export async function GET(request: Request) {
  const { limit, pending } = await ratelimit.limit(`ip_${request.ip}`)
  
  if (!limit) {
    return new Response('Rate limited', { status: 429 })
  }

  // ... handle request
}
```

### 4. Input Validation

```typescript
import { z } from 'zod'

const CoverSchema = z.object({
  student_name: z.string().min(1).max(255),
  roll_number: z.string().max(50),
  subject: z.string().min(1).max(500),
  course_code: z.string().min(1).max(50),
  theme_color: z.string().regex(/^#[0-9A-F]{6}$/i),
})

// Validate before saving
const validatedCover = CoverSchema.parse(coverData)
await db.createCover(validatedCover)
```

---

## Troubleshooting

### Common Issues

**Issue**: RLS policies blocking legitimate queries
```sql
-- Debug: Check which policies are applied
SELECT * FROM pg_policies WHERE tablename = 'covers';

-- Test: Temporarily disable RLS for testing
ALTER TABLE covers DISABLE ROW LEVEL SECURITY;
```

**Issue**: Slow queries on user_id lookups
```sql
-- Ensure index exists
CREATE INDEX CONCURRENTLY idx_covers_user_created 
ON covers(user_id, created_at DESC);

-- Check query plan
EXPLAIN ANALYZE SELECT * FROM covers 
WHERE user_id = '...' 
ORDER BY created_at DESC LIMIT 20;
```

**Issue**: Foreign key constraint violations
```sql
-- Check constraints
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'covers';

-- Allow cascade delete if needed
ALTER TABLE cover_exports 
DROP CONSTRAINT fk_exports_covers,
ADD CONSTRAINT fk_exports_covers 
FOREIGN KEY (cover_id) REFERENCES covers(id) ON DELETE CASCADE;
```

---

## Next Steps

1. **Execute migration script** (scripts/01-init-database.sql)
2. **Set up authentication** (Supabase Auth)
3. **Create database utilities** (lib/db.ts)
4. **Update application store** (store/useAppStore.ts)
5. **Migrate existing data** (localStorage to database)
6. **Test RLS policies** in development
7. **Set up monitoring** (Supabase alerts)
8. **Deploy to production** with backup verification

---

## Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row-Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Performance Tuning](https://supabase.com/docs/guides/database/postgres/performance)

---

## Document Version
- Created: 2026-04-09
- Version: 1.0
- Last Updated: 2026-04-09
