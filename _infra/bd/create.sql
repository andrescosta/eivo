-- Create type for c_type
DO $$ BEGIN
    CREATE TYPE c_type_enum AS ENUM ('humain', 'IA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create tables
CREATE TABLE IF NOT EXISTS locataires (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS utilisateurs (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    locataire_id BIGINT NOT NULL REFERENCES locataires(id),
    nom VARCHAR(255) NOT NULL,
    ext_id VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS domaines (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    locataire_id BIGINT NOT NULL REFERENCES locataires(id),
    topique VARCHAR(255),
    domaine_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS classes (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    domaine_id BIGINT NOT NULL REFERENCES domaines(id),
    nom VARCHAR(255) NOT NULL,
    topiques VARCHAR(255)[] NOT NULL
);

CREATE TABLE IF NOT EXISTS membres (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    utilisateur_id BIGINT NOT NULL REFERENCES utilisateurs(id),
    classe_id BIGINT NOT NULL REFERENCES classes(id),
    membre_role VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS historique (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    membre_id BIGINT NOT NULL REFERENCES membres(id),
    event_date TIMESTAMP NOT NULL,
    note TEXT NOT NULL,
    temps_ecoule INTERVAL NOT NULL
);

CREATE TABLE IF NOT EXISTS activites (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    classe_id BIGINT NOT NULL REFERENCES classes(id),
    application_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS topiques (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    topique_description TEXT
);

CREATE TABLE IF NOT EXISTS applications (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    application_description TEXT,
    p_image BYTEA,
    g_image BYTEA,
    c_type c_type_enum NOT NULL
);

CREATE TABLE IF NOT EXISTS application_topiques (
    application_id BIGINT NOT NULL REFERENCES applications(id),
    topique_id BIGINT NOT NULL REFERENCES topiques(id),
    PRIMARY KEY (application_id, topique_id)
);

CREATE TABLE IF NOT EXISTS jeux (
    id BIGINT GENERATED ALWAYS AS IDENTITY (CACHE 200) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    jeu_description TEXT,
    membres_ids BIGINT[] NOT NULL,
    event_date TIMESTAMP NOT NULL,
    activite_id BIGINT NOT NULL REFERENCES activites(id)
);
