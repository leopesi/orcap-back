-- ==========================================================================================
--
--                     SESSIONS
--
-- ==========================================================================================

insert into sessions (id, "table", mail, password) values ('98121754-4a25-4b02-addf-cf15374b2d8d', 'users', 'admin@orcap.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, "table", mail, password) values ('3d7615ae-d514-48a0-b269-6e563984c6ba', 'logists', 'contato@logista.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, "table", mail, password) values ('584ead51-a3d8-49d7-b69e-32380bb31825', 'sellers', 'vendedor@logista.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, "table", mail, password) values ('2a1a5117-b923-436f-9b46-8a0869013796', 'clients', 'contato@cliente.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');
insert into sessions (id, "table", mail, password) values ('bd5eb3d9-e4b8-4b65-a365-adf0ceb12473', 'clients', 'contato@cliente-novo.com.br', '$2a$08$Bu55m3xl4UUyV7j8cFX1n.GCC/HiqkBzDmTbLxFzjN52A2f/KzWfC');

insert into permissions (name, type, "table") values ('admin', 'select', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'insert', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'update', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'delete', 'sessions');
insert into permissions (name, type, "table") values ('admin', 'restore', 'sessions');

-- ==========================================================================================
--
--                     USERS
--
-- ==========================================================================================

insert into users (id, session_id, user_type, name, phone, active) values ('98121754-4a25-4b02-addf-cf15374b2d8d', '98121754-4a25-4b02-addf-cf15374b2d8d', 'admin', 'Administrador', '', false);

insert into permissions_groups (id, name) values ('2a1a5117-b923-436f-9b46-8a0869013796','admin');
insert into permissions_groups (id, name) values ('d8caaa4f-2366-4a8d-adcb-e32b2e6ed289','manager');
insert into permissions_groups (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','employee');

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

-- ==========================================================================================
--
--                     LOGISTS
--
-- ==========================================================================================

insert into logists (id, session_id, user_type, name, phone, active) values ('3d7615ae-d514-48a0-b269-6e563984c6ba', '3d7615ae-d514-48a0-b269-6e563984c6ba', 'logist', 'Lojista', '', false);

insert into permissions_groups (id, name) values ('98121754-4a25-4b02-addf-cf15374b2d8d','logist');

insert into permissions (name, type, "table") values ('admin', 'select', 'logists');
insert into permissions (name, type, "table") values ('admin', 'insert', 'logists');
insert into permissions (name, type, "table") values ('admin', 'update', 'logists');
insert into permissions (name, type, "table") values ('admin', 'delete', 'logists');
insert into permissions (name, type, "table") values ('admin', 'restore', 'logists');

insert into permissions (name, type, "table") values ('logist', 'select', 'logists');
insert into permissions (name, type, "table") values ('logist', 'insert', 'logists');
insert into permissions (name, type, "table") values ('logist', 'update', 'logists');

-- ==========================================================================================
--
--                     SELLERS
--
-- ==========================================================================================

insert into sellers (id, session_id, user_type, name, phone, active) values ('584ead51-a3d8-49d7-b69e-32380bb31825', '584ead51-a3d8-49d7-b69e-32380bb31825', 'seller', 'Vendedor', '', false);

insert into permissions_groups (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','seller');

insert into permissions (name, type, "table") values ('admin', 'select', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'insert', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'update', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'delete', 'sellers');
insert into permissions (name, type, "table") values ('admin', 'restore', 'sellers');

insert into permissions (name, type, "table") values ('logist', 'select', 'sellers');
insert into permissions (name, type, "table") values ('logist', 'insert', 'sellers');
insert into permissions (name, type, "table") values ('logist', 'update', 'sellers');
insert into permissions (name, type, "table") values ('logist', 'delete', 'sellers');
insert into permissions (name, type, "table") values ('logist', 'restore', 'sellers');

-- ==========================================================================================
--
--                     CLIENTS
--
-- ==========================================================================================

insert into clients (id, session_id, user_type, name, phone, active) values ('2a1a5117-b923-436f-9b46-8a0869013796', '2a1a5117-b923-436f-9b46-8a0869013796', 'client', 'Cliente', '', false);
insert into clients (id, session_id, user_type, name, phone, active) values ('bd5eb3d9-e4b8-4b65-a365-adf0ceb12473', 'bd5eb3d9-e4b8-4b65-a365-adf0ceb12473', 'client', 'José dos Santos de Deus', '9898-9898', true);


insert into permissions (name, type, "table") values ('admin', 'select', 'clients');
insert into permissions (name, type, "table") values ('admin', 'insert', 'clients');
insert into permissions (name, type, "table") values ('admin', 'update', 'clients');
insert into permissions (name, type, "table") values ('admin', 'delete', 'clients');
insert into permissions (name, type, "table") values ('admin', 'restore', 'clients');

insert into permissions (name, type, "table") values ('logist', 'select', 'clients');
insert into permissions (name, type, "table") values ('logist', 'insert', 'clients');
insert into permissions (name, type, "table") values ('logist', 'update', 'clients');
insert into permissions (name, type, "table") values ('logist', 'delete', 'clients');
insert into permissions (name, type, "table") values ('logist', 'restore', 'clients');

-- ==========================================================================================
--
--                     FORMATS
--
-- ==========================================================================================

insert into formats (id, image) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Formato A');
insert into formats (id, image) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Formato B');

insert into permissions (name, type, "table") values ('admin', 'select', 'formats');
insert into permissions (name, type, "table") values ('admin', 'insert', 'formats');
insert into permissions (name, type, "table") values ('admin', 'update', 'formats');
insert into permissions (name, type, "table") values ('admin', 'delete', 'formats');
insert into permissions (name, type, "table") values ('admin', 'restore', 'formats');

-- ==========================================================================================
--
--                     PROVIDERS
--
-- ==========================================================================================

insert into providers (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Fornecedor A');
insert into providers (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Fornecedor B');

insert into permissions (name, type, "table") values ('admin', 'select', 'providers');
insert into permissions (name, type, "table") values ('admin', 'insert', 'providers');
insert into permissions (name, type, "table") values ('admin', 'update', 'providers');
insert into permissions (name, type, "table") values ('admin', 'delete', 'providers');
insert into permissions (name, type, "table") values ('admin', 'restore', 'providers');

-- ==========================================================================================
--
--                     BRANDS
--
-- ==========================================================================================

insert into brands (id, provider_id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Marca A');
insert into brands (id, provider_id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','3d7615ae-d514-48a0-b269-6e563984c6ba','Marca B');

insert into permissions (name, type, "table") values ('admin', 'select', 'brands');
insert into permissions (name, type, "table") values ('admin', 'insert', 'brands');
insert into permissions (name, type, "table") values ('admin', 'update', 'brands');
insert into permissions (name, type, "table") values ('admin', 'delete', 'brands');
insert into permissions (name, type, "table") values ('admin', 'restore', 'brands');

-- ==========================================================================================
--
--                     MODELS
--
-- ==========================================================================================

insert into models (id, brand_id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','584ead51-a3d8-49d7-b69e-32380bb31825','Modelo A');
insert into models (id, brand_id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Modelo B');

insert into permissions (name, type, "table") values ('admin', 'select', 'models');
insert into permissions (name, type, "table") values ('admin', 'insert', 'models');
insert into permissions (name, type, "table") values ('admin', 'update', 'models');
insert into permissions (name, type, "table") values ('admin', 'delete', 'models');
insert into permissions (name, type, "table") values ('admin', 'restore', 'models');

-- ==========================================================================================
--
--                     PAYMENTS
--
-- ==========================================================================================

insert into payments (id, logist_id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Dinheiro a vista');
insert into payments (id, logist_id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','3d7615ae-d514-48a0-b269-6e563984c6ba','Crédito a prazo');

insert into permissions (name, type, "table") values ('admin', 'select', 'payments');
insert into permissions (name, type, "table") values ('admin', 'insert', 'payments');
insert into permissions (name, type, "table") values ('admin', 'update', 'payments');
insert into permissions (name, type, "table") values ('admin', 'delete', 'payments');
insert into permissions (name, type, "table") values ('admin', 'restore', 'payments');

-- ==========================================================================================
--
--                     BUDGETS
--
-- ==========================================================================================

insert into permissions (name, type, "table") values ('admin', 'select', 'budgets');
insert into permissions (name, type, "table") values ('admin', 'insert', 'budgets');
insert into permissions (name, type, "table") values ('admin', 'update', 'budgets');
insert into permissions (name, type, "table") values ('admin', 'delete', 'budgets');
insert into permissions (name, type, "table") values ('admin', 'restore', 'budgets');

-- ==========================================================================================
--
--                     STATUS_BUDGETS
--
-- ==========================================================================================

insert into status_budgets (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Aberto');
insert into status_budgets (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Finalizado');

insert into permissions (name, type, "table") values ('admin', 'select', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'insert', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'update', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'delete', 'status_budgets');
insert into permissions (name, type, "table") values ('admin', 'restore', 'status_budgets');

-- ==========================================================================================
--
--                     TYPES_BUDGETS
--
-- ==========================================================================================

insert into types_budgets (id, name) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','Mão de obra da loja');
insert into types_budgets (id, name) values ('584ead51-a3d8-49d7-b69e-32380bb31825','Mão de obra do cliente');

insert into permissions (name, type, "table") values ('admin', 'select', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'insert', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'update', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'delete', 'types_budgets');
insert into permissions (name, type, "table") values ('admin', 'restore', 'types_budgets');

-- ==========================================================================================
--
--                     EQUIPMENTS
--
-- ==========================================================================================

insert into permissions (name, type, "table") values ('admin', 'select', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'insert', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'update', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'delete', 'equipments');
insert into permissions (name, type, "table") values ('admin', 'restore', 'equipments');

-- ==========================================================================================
--
--                     FILTERS
--
-- ==========================================================================================

insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Filtro 00001', 'Autofiltragem automatica de 15 horas', 100, 140);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('4129c52f-3d7e-414e-8624-538c1ff859cd','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Filtro 00004', 'Autofiltragem automatica de 18 horas', 400, 440);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('732f6432-adaf-4fea-9dae-e613c19942ca','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Filtro 00005', 'Filtragem manual de 15 horas', 500, 540);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('57c94d89-4a6d-4537-b083-70eea96ef760','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Filtro 00006', 'Filtragem automatica de 46 horas', 600, 640);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('950cdc92-5b1f-471c-9269-9c56e57f778c','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba','Filtro 00007', 'Autofiltragem manual de 15 horas', 700, 740);

insert into filters (id, equipment_id, max_capacity) values ('3d7615ae-d514-48a0-b269-6e563984c6ba','3d7615ae-d514-48a0-b269-6e563984c6ba', 40.50);
insert into filters (id, equipment_id, max_capacity) values ('4129c52f-3d7e-414e-8624-538c1ff859cd','4129c52f-3d7e-414e-8624-538c1ff859cd', 60.50);
insert into filters (id, equipment_id, max_capacity) values ('732f6432-adaf-4fea-9dae-e613c19942ca','732f6432-adaf-4fea-9dae-e613c19942ca', 80.50);
insert into filters (id, equipment_id, max_capacity) values ('57c94d89-4a6d-4537-b083-70eea96ef760','57c94d89-4a6d-4537-b083-70eea96ef760', 100.50);
insert into filters (id, equipment_id, max_capacity) values ('950cdc92-5b1f-471c-9269-9c56e57f778c','950cdc92-5b1f-471c-9269-9c56e57f778c', 140.50);

insert into permissions (name, type, "table") values ('admin', 'select', 'filters');
insert into permissions (name, type, "table") values ('admin', 'insert', 'filters');
insert into permissions (name, type, "table") values ('admin', 'update', 'filters');
insert into permissions (name, type, "table") values ('admin', 'delete', 'filters');
insert into permissions (name, type, "table") values ('admin', 'restore', 'filters');
insert into permissions (name, type, "table") values ('logist', 'select', 'filters');

-- ==========================================================================================
--
--                     ENGINES
--
-- ==========================================================================================

insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Motor 00001', 'Motor 110v de alumínio', 400, 440);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('f8116283-a8e6-46cc-bfbf-35b149a7d58d','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Motor 00004', 'Motor 110v de bronze', 500, 540);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('094353ac-9373-417d-956e-f477ead9b844','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Motor 00005', 'Motor 110v de ferro', 600, 640);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('ca65ad80-7a0f-40c6-a093-fe6dda2c392e','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Motor 00006', 'Motor 220v de alumínio', 800, 840);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('a92032fc-e83c-4771-af15-f2438ff11dfd','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Motor 00007', 'Motor 220v de ferro', 100, 140);

insert into engines (id, equipment_id, max_capacity) values ('584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825', 10);
insert into engines (id, equipment_id, max_capacity) values ('f8116283-a8e6-46cc-bfbf-35b149a7d58d','f8116283-a8e6-46cc-bfbf-35b149a7d58d', 40);
insert into engines (id, equipment_id, max_capacity) values ('094353ac-9373-417d-956e-f477ead9b844','094353ac-9373-417d-956e-f477ead9b844', 50);
insert into engines (id, equipment_id, max_capacity) values ('ca65ad80-7a0f-40c6-a093-fe6dda2c392e','ca65ad80-7a0f-40c6-a093-fe6dda2c392e', 60);
insert into engines (id, equipment_id, max_capacity) values ('a92032fc-e83c-4771-af15-f2438ff11dfd','a92032fc-e83c-4771-af15-f2438ff11dfd', 70);

insert into permissions (name, type, "table") values ('admin', 'select', 'engines');
insert into permissions (name, type, "table") values ('admin', 'insert', 'engines');
insert into permissions (name, type, "table") values ('admin', 'update', 'engines');
insert into permissions (name, type, "table") values ('admin', 'delete', 'engines');
insert into permissions (name, type, "table") values ('admin', 'restore', 'engines');
insert into permissions (name, type, "table") values ('logist', 'select', 'engines');


-- ==========================================================================================
--
--                     BLANKETS
--
-- ==========================================================================================

insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('81aaba6b-4161-4ab2-9a22-e781fb6cfe68','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Manta Revestimento 00001', 'Manta Revestimento 1 m2', 4, 4.5);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('07987938-b4b5-4a62-a2dc-ee5ffea2e056','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Manta Revestimento 00004', 'Manta Revestimento 1 m2', 5, 5.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('b2826395-f5b9-4cb3-9b25-fc62ec41a4fa','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Manta Revestimento 00005', 'Manta Revestimento 1.5 m2', 6, 6.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('a2a476a4-82cf-4ed0-802b-f25d0f6c36df','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Manta Revestimento 00006', 'Manta Revestimento 1.75 m2', 8, 8.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('ee73e83a-059a-463c-aaeb-790beac43262','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Manta Revestimento 00007', 'Manta Revestimento 2 m2', 10, 14);

insert into blankets (id, equipment_id, m2_size) values ('584ead51-a3d8-49d7-b69e-32380bb31825','81aaba6b-4161-4ab2-9a22-e781fb6cfe68', 1);
insert into blankets (id, equipment_id, m2_size) values ('f8116283-a8e6-46cc-bfbf-35b149a7d58d','07987938-b4b5-4a62-a2dc-ee5ffea2e056', 1);
insert into blankets (id, equipment_id, m2_size) values ('094353ac-9373-417d-956e-f477ead9b844','b2826395-f5b9-4cb3-9b25-fc62ec41a4fa', 1.5);
insert into blankets (id, equipment_id, m2_size) values ('ca65ad80-7a0f-40c6-a093-fe6dda2c392e','a2a476a4-82cf-4ed0-802b-f25d0f6c36df', 1.75);
insert into blankets (id, equipment_id, m2_size) values ('a92032fc-e83c-4771-af15-f2438ff11dfd','ee73e83a-059a-463c-aaeb-790beac43262', 2);

insert into permissions (name, type, "table") values ('admin', 'select', 'blankets');
insert into permissions (name, type, "table") values ('admin', 'insert', 'blankets');
insert into permissions (name, type, "table") values ('admin', 'update', 'blankets');
insert into permissions (name, type, "table") values ('admin', 'delete', 'blankets');
insert into permissions (name, type, "table") values ('admin', 'restore', 'blankets');
insert into permissions (name, type, "table") values ('logist', 'select', 'blankets');

-- ==========================================================================================
--
--                     PROFILES
--
-- ==========================================================================================

insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('de7438f3-46c4-4688-a097-47c81d9e12ea','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Perfil de 1 metros', '1 metro', 4, 4.5);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('83c0fb2c-088f-4246-9655-959d2c5d6eec','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Perfil de 2 metros', '2 metros', 5, 5.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('e402c546-9ef6-4590-9380-e1a71d824dc6','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Perfil de 4 metros', '4 metros', 6, 6.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('e3504084-2349-485f-97a3-04e9a1d0ee4f','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Perfil de 5 metros', '5 metros', 8, 8.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('8861e375-db98-4de8-a061-daf6125f74b2','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Perfil de 6 metros', '6 metros', 10, 14);

insert into profiles (id, equipment_id, size) values ('584ead51-a3d8-49d7-b69e-32380bb31825','de7438f3-46c4-4688-a097-47c81d9e12ea', 1);
insert into profiles (id, equipment_id, size) values ('f8116283-a8e6-46cc-bfbf-35b149a7d58d','83c0fb2c-088f-4246-9655-959d2c5d6eec', 1);
insert into profiles (id, equipment_id, size) values ('094353ac-9373-417d-956e-f477ead9b844','e402c546-9ef6-4590-9380-e1a71d824dc6', 1.5);
insert into profiles (id, equipment_id, size) values ('ca65ad80-7a0f-40c6-a093-fe6dda2c392e','e3504084-2349-485f-97a3-04e9a1d0ee4f', 1.75);
insert into profiles (id, equipment_id, size) values ('a92032fc-e83c-4771-af15-f2438ff11dfd','8861e375-db98-4de8-a061-daf6125f74b2', 2);

insert into permissions (name, type, "table") values ('admin', 'select', 'profiles');
insert into permissions (name, type, "table") values ('admin', 'insert', 'profiles');
insert into permissions (name, type, "table") values ('admin', 'update', 'profiles');
insert into permissions (name, type, "table") values ('admin', 'delete', 'profiles');
insert into permissions (name, type, "table") values ('admin', 'restore', 'profiles');
insert into permissions (name, type, "table") values ('logist', 'select', 'profiles');

-- ==========================================================================================
--
--                     LIDS
--
-- ==========================================================================================

insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('b751bc99-208c-49e6-9ffe-02fa2cc56a13','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Tampa de 1x1 metros', '1x1 metro de aço', 4, 4.5);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('b17b4064-accf-4429-a482-7d9183df0f43','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Tampa de 2x2 metros', '2 metros de ferro', 5, 5.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('3d591fb8-a991-44f7-a729-41b8058e2c91','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Tampa de 4x4 metros', '4x4 metros de aço', 6, 6.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('ace039aa-1179-42d4-8d2f-9057c92006ca','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Tampa de 5x5 metros', '5x5 metros de ferro', 8, 8.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('9086b35e-a87a-4b89-ab99-f1a012c03ada','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Tampa de 6x6 metros', '6x6 metros de aço', 10, 14);

insert into lids (id, equipment_id) values ('584ead51-a3d8-49d7-b69e-32380bb31825','b751bc99-208c-49e6-9ffe-02fa2cc56a13');
insert into lids (id, equipment_id) values ('f8116283-a8e6-46cc-bfbf-35b149a7d58d','b17b4064-accf-4429-a482-7d9183df0f43');
insert into lids (id, equipment_id) values ('094353ac-9373-417d-956e-f477ead9b844','3d591fb8-a991-44f7-a729-41b8058e2c91');
insert into lids (id, equipment_id) values ('ca65ad80-7a0f-40c6-a093-fe6dda2c392e','ace039aa-1179-42d4-8d2f-9057c92006ca');
insert into lids (id, equipment_id) values ('a92032fc-e83c-4771-af15-f2438ff11dfd','9086b35e-a87a-4b89-ab99-f1a012c03ada');

insert into permissions (name, type, "table") values ('admin', 'select', 'lids');
insert into permissions (name, type, "table") values ('admin', 'insert', 'lids');
insert into permissions (name, type, "table") values ('admin', 'update', 'lids');
insert into permissions (name, type, "table") values ('admin', 'delete', 'lids');
insert into permissions (name, type, "table") values ('admin', 'restore', 'lids');
insert into permissions (name, type, "table") values ('logist', 'select', 'lids');

-- ==========================================================================================
--
--                     VINYLS
--
-- ==========================================================================================

insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('bdcd27b8-a759-4cdc-947e-b10dfc7691c3','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Vinil 00001', 'Vinil 1 m2', 24, 25.5);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('c2ee98ea-9198-4cd4-91a2-a72474c0b610','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Vinil 00004', 'Vinil 1 m2', 25, 27.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('97cab750-7d65-4d30-aa1a-a5907c0b54df','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Vinil 00005', 'Vinil 1.5 m2', 46, 48.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('1b12cd19-7bb6-44ed-a67f-2b1191a3a3e9','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Vinil 00006', 'Vinil 1.75 m2', 48, 50.4);
insert into equipments (id, provider_id, brand_id, model_id, name, description, cash_price, forward_price) values ('6002dfb8-cb81-4caa-8ac7-3eca78321fb4','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','584ead51-a3d8-49d7-b69e-32380bb31825','Vinil 00007', 'Vinil 2 m2', 50, 54);

insert into vinyls (id, equipment_id, m2_size) values ('584ead51-a3d8-49d7-b69e-32380bb31825','bdcd27b8-a759-4cdc-947e-b10dfc7691c3', 1);
insert into vinyls (id, equipment_id, m2_size) values ('f8116283-a8e6-46cc-bfbf-35b149a7d58d','c2ee98ea-9198-4cd4-91a2-a72474c0b610', 1);
insert into vinyls (id, equipment_id, m2_size) values ('094353ac-9373-417d-956e-f477ead9b844','97cab750-7d65-4d30-aa1a-a5907c0b54df', 1.5);
insert into vinyls (id, equipment_id, m2_size) values ('ca65ad80-7a0f-40c6-a093-fe6dda2c392e','1b12cd19-7bb6-44ed-a67f-2b1191a3a3e9', 1.75);
insert into vinyls (id, equipment_id, m2_size) values ('a92032fc-e83c-4771-af15-f2438ff11dfd','6002dfb8-cb81-4caa-8ac7-3eca78321fb4', 2);

insert into permissions (name, type, "table") values ('admin', 'select', 'vinyls');
insert into permissions (name, type, "table") values ('admin', 'insert', 'vinyls');
insert into permissions (name, type, "table") values ('admin', 'update', 'vinyls');
insert into permissions (name, type, "table") values ('admin', 'delete', 'vinyls');
insert into permissions (name, type, "table") values ('admin', 'restore', 'vinyls');
insert into permissions (name, type, "table") values ('logist', 'select', 'vinyls');