
ALTER TABLE providers 
DROP COLUMN logist_id;

-- Fazer manualmente para cada sessions_mail_key que existir, exemplo: sessions_mail_key5, fazer do 1 ao 5
select * from information_schema.table_constraints where constraint_name like 'sessions_mail%';
ALTER TABLE sessions DROP CONSTRAINT sessions_mail_key;

insert into formats (id, name, image, length, width, initial_depth, final_depth, beach_length, beach_width, beach_medium_depth, sidewalk_width, active) values 
('4dfc2216-ff4f-11eb-9a03-0242ac130003', '8x4-1x1', '8x4-1x1.jpg', 8, 4, 2, 1, 1, 1, 0.5, 1, true);

insert into formats (id, name, image, length, width, initial_depth, final_depth, beach_length, beach_width, beach_medium_depth, sidewalk_width, active) values 
('cb320020-ff4f-11eb-9a03-0242ac130003', '6x3-0_5x1', '6x3-0_5x1.jpg', 6, 3, 2, 1, 0.5, 1, 0.5, 1, true);