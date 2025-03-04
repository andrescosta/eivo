--\cc lingv;
-- Drop existing database and roles
DROP DATABASE IF EXISTS lingv;
DROP ROLE IF EXISTS lingv_admin;
DROP ROLE IF EXISTS lingv_service;

-- Create administrative role with full privileges
CREATE ROLE lingv_admin WITH 
    LOGIN 
    PASSWORD 'lingv'
    CREATEDB 
    CREATEROLE;

-- Create service role with restricted privileges
CREATE ROLE lingv_service WITH 
    LOGIN 
    PASSWORD 'lingv'
    NOCREATEDB 
    NOCREATEROLE;

-- Create application database
CREATE DATABASE lingv
    WITH 
    OWNER = lingv_admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TEMPLATE = template0;

\c lingv;

-- Create application schema owned by admin
CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION lingv_admin;

-- Revoke public schema privileges from lingv_service to ensure minimal access
REVOKE ALL ON SCHEMA public FROM lingv_service;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM lingv_service;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM lingv_service;

GRANT CONNECT ON DATABASE lingv TO lingv_service;
GRANT USAGE ON SCHEMA app TO lingv_service;
GRANT USAGE ON SCHEMA public TO lingv_service;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app TO lingv_service;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app TO lingv_service;
ALTER DEFAULT PRIVILEGES FOR ROLE lingv_admin IN SCHEMA app
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO lingv_service;
ALTER DEFAULT PRIVILEGES FOR ROLE lingv_admin IN SCHEMA app
    GRANT USAGE, SELECT ON SEQUENCES TO lingv_service;


ALTER ROLE lingv_admin SET search_path TO app, public;
ALTER ROLE lingv_service SET search_path TO app, public;