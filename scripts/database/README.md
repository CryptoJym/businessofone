# Business of One - Database Setup

This directory contains the database schema and related files for the Business of One platform.

## Files Overview

- `schema.sql` - Complete PostgreSQL database schema
- `migrations/001_initial_schema.sql` - Initial migration file
- `seed_data.sql` - Sample data for development and testing
- `../../docs/database-schema.md` - Detailed schema documentation with ERD

## Prerequisites

- PostgreSQL 12+ (with uuid-ossp and pgcrypto extensions)
- psql command-line tool

## Setup Instructions

### 1. Create Database

```bash
# Create a new database
createdb businessofone_dev

# Or using psql
psql -c "CREATE DATABASE businessofone_dev;"
```

### 2. Run Initial Schema

```bash
# Option 1: Run the complete schema file
psql -d businessofone_dev -f schema.sql

# Option 2: Run via migration
cd migrations
psql -d businessofone_dev -f 001_initial_schema.sql
```

### 3. Load Sample Data (Optional)

```bash
# Load seed data for development
psql -d businessofone_dev -f seed_data.sql
```

## Schema Overview

The database consists of 11 main tables:

1. **users** - User accounts and authentication
2. **business_profiles** - Business information for each user
3. **consultations** - Scheduled consultation sessions
4. **consultation_notes** - Notes from consultations
5. **business_audits** - Business assessment scores
6. **growth_strategies** - Strategic growth plans
7. **strategy_milestones** - Progress tracking for strategies
8. **automation_tasks** - Automated workflow configurations
9. **task_executions** - Automation execution logs
10. **resource_downloads** - Tracking of downloaded resources
11. **newsletter_subscriptions** - Email subscription management

## Key Features

- **UUID Primary Keys** - All tables use UUIDs for distributed compatibility
- **JSONB Fields** - Flexible storage for arrays and structured data
- **Row Level Security** - Enabled on all tables for multi-tenant security
- **Audit Timestamps** - Automatic created_at and updated_at tracking
- **Full-Text Search** - Indexes on business names and strategies
- **Custom Types** - ENUMs for consistent status values

## Database Migrations

Migrations should be numbered sequentially and placed in the `migrations/` directory:

```
migrations/
  001_initial_schema.sql
  002_add_feature_x.sql
  003_update_table_y.sql
```

Each migration should:
1. Begin with a transaction (`BEGIN;`)
2. Include descriptive comments
3. Update the `schema_migrations` table
4. End with a commit (`COMMIT;`)

## Security Considerations

1. **Enable SSL** - Always use SSL connections in production
2. **Use RLS** - Row Level Security is enabled on all tables
3. **Separate Roles** - Create separate database roles for:
   - Application (limited permissions)
   - Admin (full permissions)
   - Read-only (for analytics)
4. **Regular Backups** - Implement automated backup strategy

## Common Operations

### Check Schema Version
```sql
SELECT * FROM schema_migrations ORDER BY executed_at DESC;
```

### Create Application User
```sql
CREATE USER app_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE businessofone_dev TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

### Enable Row Level Security Policies
```sql
-- Example policy for users table
CREATE POLICY users_isolation ON users
    USING (id = current_setting('app.current_user_id')::uuid);
```

## Troubleshooting

### Extension Not Found
If you get errors about missing extensions:
```sql
-- Check available extensions
SELECT * FROM pg_available_extensions WHERE name IN ('uuid-ossp', 'pgcrypto');

-- Install if needed (requires superuser)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Permission Denied
Ensure your database user has proper permissions:
```sql
-- Grant schema permissions
GRANT ALL ON SCHEMA public TO your_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

## Development Tips

1. Use transactions when testing schema changes
2. Keep a separate test database for unit tests
3. Use `EXPLAIN ANALYZE` to optimize slow queries
4. Monitor index usage with `pg_stat_user_indexes`
5. Regular `VACUUM ANALYZE` for performance

## Support

For questions or issues with the database schema:
1. Check the detailed documentation in `/docs/database-schema.md`
2. Review the ERD diagram for table relationships
3. Consult PostgreSQL documentation for specific features