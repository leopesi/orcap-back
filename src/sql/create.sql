DROP TABLE usuarios;

CREATE TABLE IF NOT EXISTS users (
   id serial PRIMARY KEY,
   name VARCHAR ( 50 ) NOT NULL,
   mail VARCHAR ( 255 ) UNIQUE NOT NULL,
   password VARCHAR ( 255 ) NOT NULL,
   created_on TIMESTAMP NOT NULL,
   last_login TIMESTAMP
);

insert into users (id, name, mail, password, created_on, last_login) values (1, 'Admin', 'admin@orcap.com.br', '', now(), now());
update users set password = '$2a$08$EAmMB9jhdtQWp86tbWwiseB3GHo5AXAlV8y0dQZj6Zklo0RGPQWzm' where id = 1;

