-- Business of One Database Schema
-- PostgreSQL Database Schema Definition

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE business_stage AS ENUM ('idea', 'startup', 'growing', 'established');
CREATE TYPE consultation_type AS ENUM ('strategy', 'audit', 'follow_up');
CREATE TYPE consultation_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE strategy_status AS ENUM ('draft', 'active', 'completed', 'paused');
CREATE TYPE milestone_status AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE execution_status AS ENUM ('running', 'success', 'failed');
CREATE TYPE newsletter_frequency AS ENUM ('daily', 'weekly', 'monthly');

-- 1. Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'UTC',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Business profiles table
CREATE TABLE business_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    business_stage business_stage,
    annual_revenue DECIMAL(12,2),
    target_revenue DECIMAL(12,2),
    business_model TEXT,
    main_challenges JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Consultations table
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    type consultation_type,
    status consultation_status DEFAULT 'scheduled',
    meeting_link VARCHAR(500),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Consultation notes table
CREATE TABLE consultation_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
    summary TEXT,
    key_insights JSONB,
    action_items JSONB,
    follow_up_required BOOLEAN DEFAULT false,
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Business audits table
CREATE TABLE business_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_profile_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    audit_date DATE NOT NULL,
    overall_score DECIMAL(3,2) CHECK (overall_score >= 0 AND overall_score <= 10),
    operations_score DECIMAL(3,2) CHECK (operations_score >= 0 AND operations_score <= 10),
    marketing_score DECIMAL(3,2) CHECK (marketing_score >= 0 AND marketing_score <= 10),
    finance_score DECIMAL(3,2) CHECK (finance_score >= 0 AND finance_score <= 10),
    technology_score DECIMAL(3,2) CHECK (technology_score >= 0 AND technology_score <= 10),
    recommendations JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Growth strategies table
CREATE TABLE growth_strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_profile_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    strategy_name VARCHAR(255) NOT NULL,
    description TEXT,
    target_timeline INTERVAL,
    priority priority_level,
    status strategy_status DEFAULT 'draft',
    expected_impact TEXT,
    resources_required JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Strategy milestones table
CREATE TABLE strategy_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    growth_strategy_id UUID NOT NULL REFERENCES growth_strategies(id) ON DELETE CASCADE,
    milestone_name VARCHAR(255) NOT NULL,
    description TEXT,
    target_date DATE,
    completed_date DATE,
    status milestone_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Automation tasks table
CREATE TABLE automation_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_profile_id UUID NOT NULL REFERENCES business_profiles(id) ON DELETE CASCADE,
    task_name VARCHAR(255) NOT NULL,
    task_type VARCHAR(100),
    description TEXT,
    trigger_config JSONB,
    action_config JSONB,
    is_active BOOLEAN DEFAULT true,
    last_run_at TIMESTAMP WITH TIME ZONE,
    next_run_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Task executions table
CREATE TABLE task_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    automation_task_id UUID NOT NULL REFERENCES automation_tasks(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    status execution_status DEFAULT 'running',
    error_message TEXT,
    execution_log JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Resource downloads table
CREATE TABLE resource_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resource_name VARCHAR(255) NOT NULL,
    resource_type VARCHAR(50),
    file_path VARCHAR(500),
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    frequency newsletter_frequency DEFAULT 'weekly',
    topics JSONB,
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_consultations_user_scheduled ON consultations(user_id, scheduled_at);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_business_audits_profile ON business_audits(business_profile_id, audit_date);
CREATE INDEX idx_growth_strategies_profile_status ON growth_strategies(business_profile_id, status);
CREATE INDEX idx_automation_tasks_profile_active ON automation_tasks(business_profile_id, is_active);
CREATE INDEX idx_task_executions_task_status ON task_executions(automation_task_id, status);

-- Full-text search indexes
CREATE INDEX idx_business_profiles_search ON business_profiles 
    USING gin(to_tsvector('english', business_name || ' ' || COALESCE(industry, '')));
CREATE INDEX idx_growth_strategies_search ON growth_strategies 
    USING gin(to_tsvector('english', strategy_name || ' ' || COALESCE(description, '')));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE ON business_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_notes_updated_at BEFORE UPDATE ON consultation_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_growth_strategies_updated_at BEFORE UPDATE ON growth_strategies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_automation_tasks_updated_at BEFORE UPDATE ON automation_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (example for users table - similar patterns for other tables)
CREATE POLICY users_select_own ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY users_update_own ON users
    FOR UPDATE USING (auth.uid() = id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;