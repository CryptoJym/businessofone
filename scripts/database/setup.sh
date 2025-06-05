#!/bin/bash

# Business of One - Database Setup Script
# This script automates the database setup process

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
DB_NAME="${DB_NAME:-businessofone_dev}"
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Function to check if PostgreSQL is installed
check_postgres() {
    if ! command -v psql &> /dev/null; then
        print_error "PostgreSQL client (psql) is not installed or not in PATH"
        exit 1
    fi
    print_status "PostgreSQL client found"
}

# Function to check database connection
check_connection() {
    print_status "Checking database connection..."
    if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c '\q' 2>/dev/null; then
        print_status "Database connection successful"
    else
        print_error "Cannot connect to PostgreSQL server"
        print_error "Please check your connection settings and credentials"
        exit 1
    fi
}

# Function to create database
create_database() {
    print_status "Creating database '$DB_NAME'..."
    
    # Check if database exists
    if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
        print_warning "Database '$DB_NAME' already exists"
        read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_status "Dropping existing database..."
            psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "DROP DATABASE IF EXISTS $DB_NAME;"
        else
            print_status "Using existing database"
            return
        fi
    fi
    
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
    print_status "Database created successfully"
}

# Function to run schema
run_schema() {
    print_status "Running database schema..."
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f schema.sql
    
    if [ $? -eq 0 ]; then
        print_status "Schema created successfully"
    else
        print_error "Failed to create schema"
        exit 1
    fi
}

# Function to load seed data
load_seed_data() {
    read -p "Do you want to load sample seed data? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Loading seed data..."
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f seed_data.sql
        
        if [ $? -eq 0 ]; then
            print_status "Seed data loaded successfully"
        else
            print_warning "Failed to load seed data"
        fi
    fi
}

# Function to create application user
create_app_user() {
    read -p "Do you want to create an application database user? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter username for application (default: businessofone_app): " APP_USER
        APP_USER=${APP_USER:-businessofone_app}
        
        read -s -p "Enter password for $APP_USER: " APP_PASSWORD
        echo
        
        print_status "Creating application user '$APP_USER'..."
        
        psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" <<EOF
-- Create user
CREATE USER $APP_USER WITH PASSWORD '$APP_PASSWORD';

-- Grant permissions
GRANT CONNECT ON DATABASE $DB_NAME TO $APP_USER;
GRANT USAGE ON SCHEMA public TO $APP_USER;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $APP_USER;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO $APP_USER;

-- Grant future table permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $APP_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO $APP_USER;
EOF
        
        if [ $? -eq 0 ]; then
            print_status "Application user created successfully"
            echo
            echo "Connection string:"
            echo "postgresql://$APP_USER:****@$DB_HOST:$DB_PORT/$DB_NAME"
        else
            print_warning "Failed to create application user"
        fi
    fi
}

# Function to display summary
display_summary() {
    echo
    print_status "Database setup completed!"
    echo
    echo "Database Information:"
    echo "  Name: $DB_NAME"
    echo "  Host: $DB_HOST"
    echo "  Port: $DB_PORT"
    echo
    echo "Next steps:"
    echo "1. Update your application configuration with the database connection details"
    echo "2. Review the security settings in scripts/database/README.md"
    echo "3. Set up regular backups for production use"
    echo
}

# Main execution
main() {
    echo "Business of One - Database Setup"
    echo "================================"
    echo
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --db-name)
                DB_NAME="$2"
                shift 2
                ;;
            --db-user)
                DB_USER="$2"
                shift 2
                ;;
            --db-host)
                DB_HOST="$2"
                shift 2
                ;;
            --db-port)
                DB_PORT="$2"
                shift 2
                ;;
            -h|--help)
                echo "Usage: $0 [options]"
                echo "Options:"
                echo "  --db-name NAME    Database name (default: businessofone_dev)"
                echo "  --db-user USER    Database user (default: postgres)"
                echo "  --db-host HOST    Database host (default: localhost)"
                echo "  --db-port PORT    Database port (default: 5432)"
                echo "  -h, --help        Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Run setup steps
    check_postgres
    check_connection
    create_database
    run_schema
    load_seed_data
    create_app_user
    display_summary
}

# Run main function
main "$@"