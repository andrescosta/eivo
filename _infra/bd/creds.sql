--\cc eivo;
-- Drop existing database and roles
DROP DATABASE IF EXISTS eivo;
DROP ROLE IF EXISTS eivo_admin;
DROP ROLE IF EXISTS eivo_service;

-- Create administrative role with full privileges
CREATE ROLE eivo_admin WITH 
    LOGIN 
    PASSWORD 'eivo'
    CREATEDB 
    CREATEROLE;

-- Create service role with restricted privileges
CREATE ROLE eivo_service WITH 
    LOGIN 
    PASSWORD 'eivo'
    NOCREATEDB 
    NOCREATEROLE;

-- Create application database
CREATE DATABASE eivo
    WITH 
    OWNER = eivo_admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TEMPLATE = template0;

\c eivo;

-- Create application schema owned by admin
CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION eivo_admin;

-- Revoke public schema privileges from eivo_service to ensure minimal access
REVOKE ALL ON SCHEMA public FROM eivo_service;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM eivo_service;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM eivo_service;

GRANT CONNECT ON DATABASE eivo TO eivo_service;
GRANT USAGE ON SCHEMA app TO eivo_service;
GRANT USAGE ON SCHEMA public TO eivo_service;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app TO eivo_service;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app TO eivo_service;
ALTER DEFAULT PRIVILEGES FOR ROLE eivo_admin IN SCHEMA app
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO eivo_service;
ALTER DEFAULT PRIVILEGES FOR ROLE eivo_admin IN SCHEMA app
    GRANT USAGE, SELECT ON SEQUENCES TO eivo_service;


ALTER ROLE eivo_admin SET search_path TO app, public;
ALTER ROLE eivo_service SET search_path TO app, public;