
ALTER TABLE brands DROP COLUMN provider_id;
ALTER TABLE brands DROP COLUMN description;
ALTER TABLE providers DROP COLUMN description;
ALTER TABLE engines DROP COLUMN max_capacity;


-- Fazer manualmente para cada sessions_mail_key que existir, exemplo: sessions_mail_key5, fazer do 1 ao 5
select * from information_schema.table_constraints where constraint_name like 'sessions_mail%';
ALTER TABLE sessions DROP CONSTRAINT sessions_mail_key;

insert into formats (id, name, image, length, width, initial_depth, final_depth, beach_length, beach_width, beach_medium_depth, sidewalk_width, active) values 
('4dfc2216-ff4f-11eb-9a03-0242ac130003', '8x4-1x1', '8x4-1x1.jpg', 8, 4, 2, 1, 1, 1, 0.5, 1, true);

insert into formats (id, name, image, length, width, initial_depth, final_depth, beach_length, beach_width, beach_medium_depth, sidewalk_width, active) values 
('cb320020-ff4f-11eb-9a03-0242ac130003', '6x3-0_5x1', '6x3-0_5x1.jpg', 6, 3, 2, 1, 0.5, 1, 0.5, 1, true);



insert into brands (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('19815fc7-6575-40e4-99de-93c184b99578', null,
'Sodramar', '51.333.797/0003-41', 'Diadema', 'Vila Conceição', '09911-510', 'Caramuru', '925', 'marketing@sodramar.com.br', '', 'www.sodramar.com.br', true);
insert into brands (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('b6c9428a-733d-49cb-916d-1206a05ed8bb', null,
'Viniplas ', '04.543.319/0001-14', 'Atibaia', 'Boa Vista', '12954-103', 'Estr. dos Perines', '485 ', 'viniplas@viniplas.com.br', '(11) 4411-9662', 'www.viniplas.com.br', true);
insert into brands (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('5bb21843-b9a0-4aec-aae3-1faec231a98e', null,
'Nautilus', '53.476.057/0001-28', 'Nazaré Paulista', 'Tanque Preto', '12960-000', 'Estr. Mun. Pref. Geraldo Ramos Gonçalves', '236', '', '(11) 4597-7222', 'www.nautilus.ind.br', true);
insert into brands (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('e7f24184-09ea-4f54-8896-6dd35d164849', null,
'Jacuzzi', '59.105.007/0001-10', 'Itu', 'Melissa', '13308-900', 'Rod. Waldomiro C. Camargo', 'km 53,5 - SP-79', '', '11 3164-7632', 'www.jacuzzi.com.br', true);
insert into brands (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('e04dbd0d-f107-43fa-a4fd-c10db078a367', null,
'Dancor', '33.561.853/0001-51', 'São Paulo', 'Morumbi', '04703-003', 'Av. Morumbi', '7867 ', 'vendas@dancor.com.br', '(11) 5044-2019', 'www.dancor.com.br', true);
insert into brands (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('001a884c-ae16-41a3-b76d-e9eaa2068455', null,
'Mineração e Moagem São João Batista', '55.661.748/0001-27', 'Queluz ', 'FOGUETEIRO', '12800-000', 'Estrada Municipal do Fogueteiro', 's/n', 'contato@mineracaosaojoao.com', '(12) 3147-9090', 'www.mineracaosaojoao.com', true);
insert into brands (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('eafccc10-6b16-4821-894d-1c5037f97851', null,
'Sibrape', '57.716.854/0001-96', 'Ribeirão Preto', 'Pq. Industrial Lagoinha', '', 'Rua Armando Tarozzo', '210', 'sac@sibrape.com', '(16) 2101-7000', 'www.sibrape.com.br', true);

insert into providers (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('19815fc7-6575-40e4-99de-93c184b99578', null,
'Sodramar', '51.333.797/0003-41', 'Diadema', 'Vila Conceição', '09911-510', 'Caramuru', '925', 'marketing@sodramar.com.br', '', 'www.sodramar.com.br', true);
insert into providers (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('b6c9428a-733d-49cb-916d-1206a05ed8bb', null,
'Viniplas ', '04.543.319/0001-14', 'Atibaia', 'Boa Vista', '12954-103', 'Estr. dos Perines', '485 ', 'viniplas@viniplas.com.br', '(11) 4411-9662', 'www.viniplas.com.br', true);
insert into providers (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('5bb21843-b9a0-4aec-aae3-1faec231a98e', null,
'Nautilus', '53.476.057/0001-28', 'Nazaré Paulista', 'Tanque Preto', '12960-000', 'Estr. Mun. Pref. Geraldo Ramos Gonçalves', '236', '', '(11) 4597-7222', 'www.nautilus.ind.br', true);
insert into providers (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('e7f24184-09ea-4f54-8896-6dd35d164849', null,
'Jacuzzi', '59.105.007/0001-10', 'Itu', 'Melissa', '13308-900', 'Rod. Waldomiro C. Camargo', 'km 53,5 - SP-79', '', '11 3164-7632', 'www.jacuzzi.com.br', true);
insert into providers (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('e04dbd0d-f107-43fa-a4fd-c10db078a367', null,
'Dancor', '33.561.853/0001-51', 'São Paulo', 'Morumbi', '04703-003', 'Av. Morumbi', '7867 ', 'vendas@dancor.com.br', '(11) 5044-2019', 'www.dancor.com.br', true);
insert into providers (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('001a884c-ae16-41a3-b76d-e9eaa2068455', null,
'Mineração e Moagem São João Batista', '55.661.748/0001-27', 'Queluz ', 'FOGUETEIRO', '12800-000', 'Estrada Municipal do Fogueteiro', 's/n', 'contato@mineracaosaojoao.com', '(12) 3147-9090', 'www.mineracaosaojoao.com', true);
insert into providers (id, logist_id, name, document, city, neighborhood, zipcode, street, number, mail, phone, website, active) values ('eafccc10-6b16-4821-894d-1c5037f97851', null,
'Sibrape', '57.716.854/0001-96', 'Ribeirão Preto', 'Pq. Industrial Lagoinha', '', 'Rua Armando Tarozzo', '210', 'sac@sibrape.com', '(16) 2101-7000', 'www.sibrape.com.br', true);
