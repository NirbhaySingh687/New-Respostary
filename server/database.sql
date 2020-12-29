CREATE database login_form


create extension if not exists "uuid-ossp";//create the extension for uuid


CREATE TABLE user_login(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

create table user_gallery(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR,
    message VARCHAR,
    creator VARCHAR,
    tags VARCHAR [],
    selectedFile VARCHAR,
    likeCount INTEGER default 0
);