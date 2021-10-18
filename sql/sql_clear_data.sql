------------------------------------------------
--  Deleta as tabelas e dados que não são padrão
------------------------------------------------



delete from budgets_equipments;
delete from budgets;

delete from filters;
delete from engines;
delete from lids;
delete from blankets;
delete from profiles;
delete from vinyls;
delete from sands;

delete from equipments;



delete from logists;
delete from sellers;
delete from clients;

delete from brands where logist_id <> null;
delete from providers where logist_id <> null;