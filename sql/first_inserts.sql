
insert into sessions (id, "table", mail, password) values ('98121754-4a25-4b02-addf-cf15374b2d8d', 'users', 'admin@orcap.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, "table", mail, password) values ('3d7615ae-d514-48a0-b269-6e563984c6ba', 'logists', 'contato@logista.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, "table", mail, password) values ('584ead51-a3d8-49d7-b69e-32380bb31825', 'sellers', 'vendedor@logista.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, "table", mail, password) values ('2a1a5117-b923-436f-9b46-8a0869013796', 'clients', 'contato@cliente.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');

insert into users (id, session_id, type_id, name, phone, active) values ('98121754-4a25-4b02-addf-cf15374b2d8d', '98121754-4a25-4b02-addf-cf15374b2d8d', 'admin', 'Administrador', '', false);
insert into logists (id, session_id, type_id, name, phone, active) values ('3d7615ae-d514-48a0-b269-6e563984c6ba', '3d7615ae-d514-48a0-b269-6e563984c6ba', 'logist', 'Lojista', '', false);
insert into sellers (id, session_id, type_id, name, phone, active) values ('584ead51-a3d8-49d7-b69e-32380bb31825', '584ead51-a3d8-49d7-b69e-32380bb31825', 'seller', 'Vendedor', '', false);
insert into clients (id, session_id, type_id, name, phone, active) values ('2a1a5117-b923-436f-9b46-8a0869013796', '2a1a5117-b923-436f-9b46-8a0869013796', 'client', 'Cliente', '', false);

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

insert into formats (id, image) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Formato A');
insert into formats (id, image) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Formato B');

insert into permissions (name, type, "table") values ('admin', 'select', 'formats');
insert into permissions (name, type, "table") values ('admin', 'insert', 'formats');
insert into permissions (name, type, "table") values ('admin', 'update', 'formats');
insert into permissions (name, type, "table") values ('admin', 'delete', 'formats');
insert into permissions (name, type, "table") values ('admin', 'restore', 'formats');



insert into providers (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Fornecedor A');
insert into providers (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Fornecedor B');

insert into permissions (name, type, "table") values ('admin', 'select', 'providers');
insert into permissions (name, type, "table") values ('admin', 'insert', 'providers');
insert into permissions (name, type, "table") values ('admin', 'update', 'providers');
insert into permissions (name, type, "table") values ('admin', 'delete', 'providers');
insert into permissions (name, type, "table") values ('admin', 'restore', 'providers');

insert into brands (id, provider_id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Marca A');
insert into brands (id, provider_id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','3d7615ae-d514-48a0-b269-6e563984c6ba','Marca B');

insert into permissions (name, type, "table") values ('admin', 'select', 'brands');
insert into permissions (name, type, "table") values ('admin', 'insert', 'brands');
insert into permissions (name, type, "table") values ('admin', 'update', 'brands');
insert into permissions (name, type, "table") values ('admin', 'delete', 'brands');
insert into permissions (name, type, "table") values ('admin', 'restore', 'brands');

insert into models (id, brand_id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','584ead51-a3d8-49d7-b69e-32380bb31825','Modelo A');
insert into models (id, brand_id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Modelo B');

insert into permissions (name, type, "table") values ('admin', 'select', 'models');
insert into permissions (name, type, "table") values ('admin', 'insert', 'models');
insert into permissions (name, type, "table") values ('admin', 'update', 'models');
insert into permissions (name, type, "table") values ('admin', 'delete', 'models');
insert into permissions (name, type, "table") values ('admin', 'restore', 'models');

insert into payments (id, logist_id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Dinheiro a vista');
insert into payments (id, logist_id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','3d7615ae-d514-48a0-b269-6e563984c6ba','Crédito a prazo');

insert into permissions (name, type, "table") values ('admin', 'select', 'payments');
insert into permissions (name, type, "table") values ('admin', 'insert', 'payments');
insert into permissions (name, type, "table") values ('admin', 'update', 'payments');
insert into permissions (name, type, "table") values ('admin', 'delete', 'payments');
insert into permissions (name, type, "table") values ('admin', 'restore', 'payments');

insert into status_budgets (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Aberto');
insert into status_budgets (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Finalizado');

insert into permissions (name, type, "table") values ('admin', 'select', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'insert', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'update', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'delete', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'restore', 'status_budgets');

insert into types_budgets (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Mão de obra da loja');
insert into types_budgets (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Mão de obra do cliente');

insert into permissions (name, type, "table") values ('admin', 'select', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'insert', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'update', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'delete', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'restore', 'types_budgets');

-- EQUIPMENTS

insert into equipments (id, provider_id, brand_id, model_id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Filtro 00001');
insert into equipments (id, provider_id, brand_id, model_id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Motor 00001');

insert into permissions (name, type, "table") values ('admin', 'select', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'insert', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'update', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'delete', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'restore', 'equipments');

insert into filters (id, equipment_id) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba');

insert into permissions (name, type, "table") values ('admin', 'select', 'filters');
insert into permissions (name, type, "table") values ('admin', 'insert', 'filters');
insert into permissions (name, type, "table") values ('admin', 'update', 'filters');
insert into permissions (name, type, "table") values ('admin', 'delete', 'filters');
insert into permissions (name, type, "table") values ('admin', 'restore', 'filters');

insert into engines (id, equipment_id) values ('584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825');

insert into permissions (name, type, "table") values ('admin', 'select', 'engines');
insert into permissions (name, type, "table") values ('admin', 'insert', 'engines');
insert into permissions (name, type, "table") values ('admin', 'update', 'engines');
insert into permissions (name, type, "table") values ('admin', 'delete', 'engines');
insert into permissions (name, type, "table") values ('admin', 'restore', 'engines');