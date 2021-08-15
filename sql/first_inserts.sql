
ALTER TABLE providers 
DROP COLUMN logist_id;

select * from information_schema.table_constraints where constraint_name like 'sessions_mail%';
ALTER TABLE sessions DROP CONSTRAINT sessions_mail_key;