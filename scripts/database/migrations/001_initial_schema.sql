-- Migration: 001_initial_schema
-- Created: 2024-01-01
-- Description: Initial database schema for Business of One platform

-- This migration creates the foundational database structure
-- Run this migration with: psql -d your_database -f 001_initial_schema.sql

BEGIN;

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

-- Create all tables
\i ../schema.sql

-- Create migration tracking table
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Record this migration
INSERT INTO schema_migrations (version) VALUES ('001_initial_schema');

COMMIT;