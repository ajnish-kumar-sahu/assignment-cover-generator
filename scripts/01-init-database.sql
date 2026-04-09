-- ScholarFlow Database Schema Initialization
-- Created: 2026-04-09
-- This script creates all tables, indexes, and policies for ScholarFlow
-- Run with: psql -U postgres -d scholarflow -f 01-init-database.sql

-- ============================================================================
-- 1. CREATE ENUMS
-- ============================================================================

CREATE TYPE IF NOT EXISTS cover_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE IF NOT EXISTS cover_visibility AS ENUM ('private', 'shared', 'public');
CREATE TYPE IF NOT EXISTS export_format AS ENUM ('pdf', 'jpg', 'png');
CREATE TYPE IF NOT EXISTS theme_mode AS ENUM ('light', 'dark', 'system');

-- ============================================================================
-- 2. CREATE TABLES
-- ============================================================================

-- User Profiles (Extended User Information)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  institution_id INTEGER,
  department TEXT,
  bio TEXT,
  avatar_url TEXT,
  
  -- Settings
  theme_preference theme_mode DEFAULT 'system',
  export_dpi INTEGER DEFAULT 300 CHECK (export_dpi IN (72, 150, 300, 600)),
  auto_sync BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Institutions (University/School Directory)
CREATE TABLE IF NOT EXISTS public.institutions (
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
  
  -- Stats (Denormalized)
  user_count INTEGER DEFAULT 0,
  cover_count INTEGER DEFAULT 0
);

-- Add Foreign Key to user_profiles
ALTER TABLE public.user_profiles 
ADD CONSTRAINT fk_user_profiles_institutions 
FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE SET NULL;

-- Templates (Cover Templates)
CREATE TABLE IF NOT EXISTS public.templates (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
  layout_type TEXT,
  best_for TEXT,
  
  -- Metadata
  html_template TEXT,
  css_styles TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Covers (Main Cover Documents)
CREATE TABLE IF NOT EXISTS public.covers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  template_id INTEGER NOT NULL REFERENCES templates(id) ON DELETE RESTRICT,
  
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
  
  -- Additional Data
  metadata JSONB DEFAULT '{}',
  
  -- Status & Visibility
  status cover_status DEFAULT 'draft',
  visibility cover_visibility DEFAULT 'private',
  
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

-- Cover Exports (Export Records)
CREATE TABLE IF NOT EXISTS public.cover_exports (
  id BIGSERIAL PRIMARY KEY,
  cover_id BIGINT NOT NULL REFERENCES covers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  format export_format NOT NULL,
  file_size BIGINT,
  file_url TEXT,
  storage_path TEXT,
  
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Analytics
  export_duration_ms INTEGER,
  quality_settings JSONB DEFAULT '{"dpi": 300}'
);

-- Cover Shares (Sharing & Collaboration)
CREATE TABLE IF NOT EXISTS public.cover_shares (
  id BIGSERIAL PRIMARY KEY,
  cover_id BIGINT NOT NULL REFERENCES covers(id) ON DELETE CASCADE,
  shared_by_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  
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

-- Audit Logs (Compliance & Security)
CREATE TABLE IF NOT EXISTS public.audit_logs (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 3. CREATE INDEXES
-- ============================================================================

-- user_profiles indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_institution ON user_profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created ON user_profiles(created_at DESC);

-- institutions indexes
CREATE INDEX IF NOT EXISTS idx_institutions_slug ON institutions(slug);
CREATE INDEX IF NOT EXISTS idx_institutions_verified ON institutions(verified);
CREATE INDEX IF NOT EXISTS idx_institutions_email_domain ON institutions(email_domain);

-- templates indexes
CREATE INDEX IF NOT EXISTS idx_templates_slug ON templates(slug);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_premium ON templates(is_premium);

-- covers indexes (CRITICAL)
CREATE INDEX IF NOT EXISTS idx_covers_user_created ON covers(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_covers_visibility ON covers(visibility, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_covers_status ON covers(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_covers_course ON covers(course_code);
CREATE INDEX IF NOT EXISTS idx_covers_template ON covers(template_id);
CREATE INDEX IF NOT EXISTS idx_covers_subject ON covers(subject);

-- cover_exports indexes
CREATE INDEX IF NOT EXISTS idx_exports_cover ON cover_exports(cover_id);
CREATE INDEX IF NOT EXISTS idx_exports_user ON cover_exports(user_id, generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_exports_expires ON cover_exports(expires_at);
CREATE INDEX IF NOT EXISTS idx_exports_format ON cover_exports(format);

-- cover_shares indexes
CREATE INDEX IF NOT EXISTS idx_shares_cover ON cover_shares(cover_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shares_token ON cover_shares(share_token);
CREATE INDEX IF NOT EXISTS idx_shares_shared_by ON cover_shares(shared_by_user_id);
CREATE INDEX IF NOT EXISTS idx_shares_expires ON cover_shares(expires_at);

-- audit_logs indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================================================
-- 4. ENABLE ROW-LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.covers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cover_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cover_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Templates and Institutions are public read-only
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 5. CREATE RLS POLICIES
-- ============================================================================

-- user_profiles policies
DROP POLICY IF EXISTS select_own_profile ON user_profiles;
CREATE POLICY select_own_profile ON user_profiles 
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS update_own_profile ON user_profiles;
CREATE POLICY update_own_profile ON user_profiles 
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS insert_own_profile ON user_profiles;
CREATE POLICY insert_own_profile ON user_profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- covers policies
DROP POLICY IF EXISTS select_own_covers ON covers;
CREATE POLICY select_own_covers ON covers 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS select_public_covers ON covers;
CREATE POLICY select_public_covers ON covers 
  FOR SELECT USING (visibility = 'public');

DROP POLICY IF EXISTS insert_own_covers ON covers;
CREATE POLICY insert_own_covers ON covers 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS update_own_covers ON covers;
CREATE POLICY update_own_covers ON covers 
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS delete_own_covers ON covers;
CREATE POLICY delete_own_covers ON covers 
  FOR DELETE USING (auth.uid() = user_id);

-- cover_exports policies
DROP POLICY IF EXISTS select_own_exports ON cover_exports;
CREATE POLICY select_own_exports ON cover_exports 
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS insert_own_exports ON cover_exports;
CREATE POLICY insert_own_exports ON cover_exports 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- cover_shares policies
DROP POLICY IF EXISTS select_own_shares ON cover_shares;
CREATE POLICY select_own_shares ON cover_shares 
  FOR SELECT USING (auth.uid() = shared_by_user_id);

DROP POLICY IF EXISTS insert_own_shares ON cover_shares;
CREATE POLICY insert_own_shares ON cover_shares 
  FOR INSERT WITH CHECK (auth.uid() = shared_by_user_id);

-- audit_logs policies (users can only see their own)
DROP POLICY IF EXISTS select_own_audit_logs ON audit_logs;
CREATE POLICY select_own_audit_logs ON audit_logs 
  FOR SELECT USING (auth.uid() = user_id);

-- templates and institutions are public read-only
DROP POLICY IF EXISTS select_templates ON templates;
CREATE POLICY select_templates ON templates 
  FOR SELECT USING (true);

DROP POLICY IF EXISTS select_institutions ON institutions;
CREATE POLICY select_institutions ON institutions 
  FOR SELECT USING (true);

-- ============================================================================
-- 6. CREATE FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on user_profiles
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger on covers
DROP TRIGGER IF EXISTS update_covers_updated_at ON covers;
CREATE TRIGGER update_covers_updated_at
  BEFORE UPDATE ON covers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger on templates
DROP TRIGGER IF EXISTS update_templates_updated_at ON templates;
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger on institutions
DROP TRIGGER IF EXISTS update_institutions_updated_at ON institutions;
CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON institutions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 7. CREATE VIEWS
-- ============================================================================

-- View: User cover statistics
DROP VIEW IF EXISTS public.user_cover_stats;
CREATE VIEW public.user_cover_stats AS
SELECT 
  user_id,
  COUNT(*) as total_covers,
  COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
  COUNT(*) FILTER (WHERE status = 'published') as published_count,
  COUNT(*) FILTER (WHERE visibility = 'public') as public_count,
  COUNT(*) FILTER (WHERE visibility = 'shared') as shared_count,
  MAX(created_at) as last_cover_created
FROM covers
GROUP BY user_id;

-- View: Export statistics by template
DROP VIEW IF EXISTS public.template_export_stats;
CREATE VIEW public.template_export_stats AS
SELECT 
  t.id,
  t.name,
  t.slug,
  COUNT(DISTINCT c.id) as usage_count,
  COUNT(DISTINCT ce.id) as export_count,
  COUNT(DISTINCT ce.user_id) as unique_exporters,
  ROUND(AVG(ce.export_duration_ms), 2) as avg_export_time_ms
FROM templates t
LEFT JOIN covers c ON t.id = c.template_id
LEFT JOIN cover_exports ce ON c.id = ce.cover_id
GROUP BY t.id, t.name, t.slug;

-- ============================================================================
-- 8. INSERT SEED DATA
-- ============================================================================

-- Insert default templates if they don't exist
INSERT INTO public.templates (slug, name, description, category, is_premium, layout_type, best_for) VALUES
  ('classic', 'Classic', 'Elegant traditional design with border', 'traditional', false, 'centered', 'assignment'),
  ('modern', 'Modern', 'Clean and minimalist layout', 'modern', false, 'minimal', 'project'),
  ('minimal', 'Minimal', 'Ultra-clean with focus on content', 'modern', false, 'minimal', 'report'),
  ('professional', 'Professional', 'Corporate-style cover page', 'professional', false, 'boxed', 'thesis'),
  ('elegant', 'Elegant', 'Sophisticated serif typography', 'luxury', true, 'centered', 'dissertation'),
  ('creative', 'Creative', 'Artistic and vibrant design', 'creative', true, 'boxed', 'portfolio'),
  ('academic', 'Academic', 'University-approved formal design', 'academic', false, 'centered', 'thesis')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- 9. GRANT PERMISSIONS
-- ============================================================================

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Run verification queries (optional):
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
-- SELECT schemaname, tablename FROM pg_tables WHERE tablename LIKE 'idx_%';
-- SELECT * FROM pg_indexes WHERE schemaname = 'public';
