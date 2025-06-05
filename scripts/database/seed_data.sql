-- Business of One - Sample Seed Data
-- This file contains sample data for development and testing purposes

BEGIN;

-- Insert sample users
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, timezone, is_active, email_verified) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'john.doe@example.com', '$2b$10$dummyhash1', 'John', 'Doe', '+1-555-0101', 'America/New_York', true, true),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'jane.smith@example.com', '$2b$10$dummyhash2', 'Jane', 'Smith', '+1-555-0102', 'America/Los_Angeles', true, true),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'mike.wilson@example.com', '$2b$10$dummyhash3', 'Mike', 'Wilson', '+1-555-0103', 'Europe/London', true, false);

-- Insert sample business profiles
INSERT INTO business_profiles (id, user_id, business_name, industry, business_stage, annual_revenue, target_revenue, business_model, main_challenges) VALUES
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Tech Solutions LLC', 'Technology', 'growing', 250000.00, 1000000.00, 'B2B SaaS consulting and development', '["Scaling operations", "Finding qualified talent", "Managing cash flow"]'),
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Creative Studio One', 'Design', 'startup', 75000.00, 300000.00, 'Freelance design and branding services', '["Building consistent client pipeline", "Pricing strategy", "Time management"]'),
    ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'Consulting Pro', 'Business Services', 'established', 500000.00, 2000000.00, 'Management consulting for SMBs', '["Market differentiation", "Automation of processes", "Strategic partnerships"]');

-- Insert sample consultations
INSERT INTO consultations (id, user_id, scheduled_at, duration_minutes, type, status, meeting_link) VALUES
    ('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW() + INTERVAL '7 days', 60, 'strategy', 'scheduled', 'https://meet.example.com/abc123'),
    ('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', NOW() - INTERVAL '3 days', 60, 'audit', 'completed', 'https://meet.example.com/def456'),
    ('30eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', NOW() + INTERVAL '14 days', 30, 'follow_up', 'scheduled', 'https://meet.example.com/ghi789');

-- Insert consultation notes for completed consultation
INSERT INTO consultation_notes (consultation_id, summary, key_insights, action_items, follow_up_required) VALUES
    ('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 
     'Comprehensive business audit completed. Client has strong creative skills but needs help with business operations.',
     '["Strong brand identity already established", "Client acquisition process needs systematization", "Pricing below market rates"]',
     '["Create service packages with tiered pricing", "Implement CRM system", "Develop standard operating procedures", "Create client onboarding checklist"]',
     true);

-- Insert sample business audit
INSERT INTO business_audits (business_profile_id, audit_date, overall_score, operations_score, marketing_score, finance_score, technology_score, recommendations) VALUES
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', CURRENT_DATE - INTERVAL '3 days', 6.5, 5.0, 7.5, 6.0, 7.0,
     '{"operations": ["Implement project management system", "Create standard workflows"], "marketing": ["Develop content marketing strategy", "Improve SEO"], "finance": ["Set up proper bookkeeping", "Review pricing strategy"], "technology": ["Automate invoicing", "Implement CRM"]}');

-- Insert sample growth strategies
INSERT INTO growth_strategies (id, business_profile_id, strategy_name, description, target_timeline, priority, status, expected_impact) VALUES
    ('40eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 
     'Productize Consulting Services', 
     'Transform custom consulting into scalable product offerings',
     '6 months',
     'high',
     'active',
     'Increase revenue by 3x while reducing time per client by 50%'),
    ('50eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
     'Build Recurring Revenue Stream',
     'Develop retainer-based service packages for ongoing design support',
     '3 months',
     'high',
     'active',
     'Create predictable monthly revenue of $10,000+');

-- Insert strategy milestones
INSERT INTO strategy_milestones (growth_strategy_id, milestone_name, description, target_date, status) VALUES
    ('40eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Define Core Offerings', 'Document and package three core service offerings', CURRENT_DATE + INTERVAL '30 days', 'in_progress'),
    ('40eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Create Sales Materials', 'Develop professional sales deck and case studies', CURRENT_DATE + INTERVAL '60 days', 'pending'),
    ('50eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Design Service Tiers', 'Create 3 retainer package options', CURRENT_DATE + INTERVAL '14 days', 'completed');

-- Insert sample automation tasks
INSERT INTO automation_tasks (business_profile_id, task_name, task_type, description, trigger_config, action_config, is_active) VALUES
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
     'Client Onboarding Automation',
     'workflow',
     'Automatically send onboarding materials when new client is added',
     '{"event": "new_client_added", "conditions": {"client_type": "new"}}',
     '{"send_email": {"template": "onboarding_welcome"}, "create_tasks": ["setup_call", "send_contract", "create_project"]}',
     true),
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
     'Invoice Reminder',
     'scheduled',
     'Send payment reminders for overdue invoices',
     '{"schedule": "daily", "time": "09:00"}',
     '{"check_invoices": {"status": "overdue"}, "send_reminder": {"days": [7, 14, 30]}}',
     true);

-- Insert sample resource downloads
INSERT INTO resource_downloads (user_id, resource_name, resource_type, file_path) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Solo Business Growth Guide', 'guide', '/resources/guides/solo-business-growth.pdf'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Pricing Strategy Template', 'template', '/resources/templates/pricing-strategy.xlsx'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Client Onboarding Checklist', 'checklist', '/resources/checklists/client-onboarding.pdf');

-- Insert newsletter subscriptions
INSERT INTO newsletter_subscriptions (user_id, email, frequency, topics, is_active) VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'john.doe@example.com', 'weekly', '["growth_strategies", "automation", "productivity"]', true),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'jane.smith@example.com', 'weekly', '["marketing", "pricing", "client_management"]', true),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'mike.wilson@example.com', 'monthly', '["industry_trends", "case_studies"]', true);

COMMIT;

-- Display summary
SELECT 'Seed data loaded successfully!' as message;
SELECT 'Users created:' as entity, COUNT(*) as count FROM users
UNION ALL
SELECT 'Business profiles created:', COUNT(*) FROM business_profiles
UNION ALL
SELECT 'Consultations scheduled:', COUNT(*) FROM consultations
UNION ALL
SELECT 'Growth strategies created:', COUNT(*) FROM growth_strategies
UNION ALL
SELECT 'Automation tasks created:', COUNT(*) FROM automation_tasks;