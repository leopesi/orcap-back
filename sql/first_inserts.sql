
insert into users (id, name, phone, active) values ('98121754-4a25-4b02-addf-cf15374b2d8d', 'Administrador', '', false);

insert into logists (id, name, phone, active) values ('3d7615ae-d514-48a0-b269-6e563984c6ba', 'Lojista', '', false);

insert into sellers (id, name, phone, active) values ('584ead51-a3d8-49d7-b69e-32380bb31825', 'Vendedor', '', false);
insert into clients (id, name, phone, active) values ('2a1a5117-b923-436f-9b46-8a0869013796', 'Cliente', '', false);

insert into sessions (id, person, "table", type, mail, password) values ('98121754-4a25-4b02-addf-cf15374b2d8d', '98121754-4a25-4b02-addf-cf15374b2d8d', 'users', 'admin', 'admin@orcap.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, person, "table", type, mail, password) values ('3d7615ae-d514-48a0-b269-6e563984c6ba', '3d7615ae-d514-48a0-b269-6e563984c6ba', 'logists', 'logist', 'contato@logista.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, person, "table", type, mail, password) values ('584ead51-a3d8-49d7-b69e-32380bb31825', '584ead51-a3d8-49d7-b69e-32380bb31825', 'sellers', 'seller', 'vendedor@logista.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, person, "table", type, mail, password) values ('2a1a5117-b923-436f-9b46-8a0869013796', '2a1a5117-b923-436f-9b46-8a0869013796', 'clients', 'client', 'contato@cliente.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');

insert into permissions_groups (id, name) values ('2a1a5117-b923-436f-9b46-8a0869013796','admin');
insert into permissions_groups (id, name) values ('d8caaa4f-2366-4a8d-adcb-e32b2e6ed289','manager');
insert into permissions_groups (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','employee');
insert into permissions_groups (id, name) values ('98121754-4a25-4b02-addf-cf15374b2d8d','logist');
insert into permissions_groups (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','seller');

insert into permissions (name, type, "table") values ('admin', 'select', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'insert', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'update', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'delete', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'restore', 'sessions');

insert into permissions (name, type, "table") values ('admin', 'select', 'users');
insert into permissions (name, type, "table") values ('admin', 'insert', 'users');
insert into permissions (name, type, "table") values ('admin', 'update', 'users');
insert into permissions (name, type, "table") values ('admin', 'delete', 'users');
insert into permissions (name, type, "table") values ('admin', 'restore', 'users');

insert into permissions (name, type, "table") values ('manager', 'select', 'users');
insert into permissions (name, type, "table") values ('manager', 'insert', 'users');
insert into permissions (name, type, "table") values ('manager', 'update', 'users');

insert into permissions (name, type, "table") values ('employee', 'select', 'users');
insert into permissions (name, type, "table") values ('employee', 'insert', 'users');

insert into permissions (name, type, "table") values ('admin', 'select', 'logists');
insert into permissions (name, type, "table") values ('admin', 'insert', 'logists');
insert into permissions (name, type, "table") values ('admin', 'update', 'logists');
insert into permissions (name, type, "table") values ('admin', 'delete', 'logists');
insert into permissions (name, type, "table") values ('admin', 'restore', 'logists');

insert into permissions (name, type, "table") values ('logist', 'select', 'logists');
insert into permissions (name, type, "table") values ('logist', 'insert', 'logists');
insert into permissions (name, type, "table") values ('logist', 'update', 'logists');

insert into permissions (name, type, "table") values ('admin', 'select', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'insert', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'update', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'delete', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'restore', 'sellers');

insert into permissions (name, type, "table") values ('admin', 'select', 'clients');
insert into permissions (name, type, "table") values ('admin', 'insert', 'clients');
insert into permissions (name, type, "table") values ('admin', 'update', 'clients');
insert into permissions (name, type, "table") values ('admin', 'delete', 'clients');
insert into permissions (name, type, "table") values ('admin', 'restore', 'clients');

insert into brands (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Marca A');
insert into brands (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Marca B');

insert into permissions (name, type, "table") values ('admin', 'select', 'brands');
insert into permissions (name, type, "table") values ('admin', 'insert', 'brands');
insert into permissions (name, type, "table") values ('admin', 'update', 'brands');
insert into permissions (name, type, "table") values ('admin', 'delete', 'brands');
insert into permissions (name, type, "table") values ('admin', 'restore', 'brands');

insert into formats (id, image) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Formato A');
insert into formats (id, image) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Formato B');

insert into permissions (name, type, "table") values ('admin', 'select', 'formats');
insert into permissions (name, type, "table") values ('admin', 'insert', 'formats');
insert into permissions (name, type, "table") values ('admin', 'update', 'formats');
insert into permissions (name, type, "table") values ('admin', 'delete', 'formats');
insert into permissions (name, type, "table") values ('admin', 'restore', 'formats');