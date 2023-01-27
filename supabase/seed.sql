insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone_confirmed_at, phone_change_sent_at, banned_until, reauthentication_sent_at, phone, phone_change, phone_change_token, email_change_token_current, email_change_confirm_status, reauthentication_token)
values ('100fd4fa-3b0f-4cd8-9dcd-45a02ca49262','00000000-0000-0000-0000-000000000000','authenticated','authenticated','dev@wal.com','$2a$10$UlaczRt5Td5rgNUvmmsMe.NKhBt.bEqNQe/OWglhNRmZcheOL.v5a','2022-06-29T13:14:18.573Z',null,'',null,'',null,'','',null,'2022-06-29T13:14:18.577Z','{"provider":"email","providers":["email"]}','{}',false,'2022-06-29T13:14:18.564Z','2022-06-29T13:14:18.564Z',null,null,null,null,null,'','','',0, '');

insert into auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
values ('100fd4fa-3b0f-4cd8-9dcd-45a02ca49262','100fd4fa-3b0f-4cd8-9dcd-45a02ca49262','{"sub":"100fd4fa-3b0f-4cd8-9dcd-45a02ca49262"}','email','2022-06-29T13:14:18.571Z','2022-06-29T13:14:18.571Z','2022-06-29T13:14:18.571Z');

insert into public.account (id, name, type, currency, "isPrimary", "quotationId", "userId")
values
  ('9e9a8297-1372-4c96-8bc1-4afdfd449680','Galicia','bank','ars', true, null, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('2b83f7ee-7718-45ac-8aae-32abbd9521f1','Wise','bank','usd', false, 'blue', '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262')
  ;

insert into public."creditCard" (id, name, type, "accountId", "userId")
values
  ('3e6672d2-61c0-4f97-a44c-7fe239a4577f', 'Visa Galicia', 'visa', '9e9a8297-1372-4c96-8bc1-4afdfd449680', '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('c439ab6b-9877-4cea-b71b-a8253b417fd6', 'Master Galicia', 'mastercard', '9e9a8297-1372-4c96-8bc1-4afdfd449680', '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('78a20c3e-d44b-4510-9f0a-c6e1701df612', 'Carrefour', 'carrefour', null, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262')
  ;

insert into public."category" (id, name, icon, color, "parentId", "userId")
values
  ('c6ccdddc-232d-4b8a-805e-8e8e09db820c', 'Salud', 'kit-medical', 'green', null, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('b33e875e-ecba-4742-9e30-bc6e42dcf7c8', 'Obra Social', null, null, 'c6ccdddc-232d-4b8a-805e-8e8e09db820c', '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('c4fbd7e2-bba5-424f-ba68-89654b7b5d71', 'Inversiones', 'chart-line', 'orange', null, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('cccc8301-24f0-4fcc-99be-07784a92568f', 'Salario', 'carrot', 'red', null, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('800fd66b-eac0-452d-8234-276211378f25', 'Servicios', 'house', 'blue', null, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('aeb0cf43-0857-4277-8b0a-8069ae4b2831', 'Agua', null, null, '800fd66b-eac0-452d-8234-276211378f25', '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('c2244a40-b6d5-43f1-8004-bbba5971a22f', 'Luz', null, null, '800fd66b-eac0-452d-8234-276211378f25', '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262')
  ;


insert into public.investment(id, description, type,  "accountId",  amount, days, "dueDate", "annualRate", profit, "userId")
values
  ('b12e9cf2-6209-48cd-a489-1adda7c9b3ea', 'Mi primer plazo fijo', 'fixed', '9e9a8297-1372-4c96-8bc1-4afdfd449680', 20000, 30, '2022-11-15', 0.75, 1643.83, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262')
  ;

insert into public.movement(id, type, description, amount, "accountId", "categoryId", "creditCardId", "investmentId", month, year, date, "isPaid", "userId")
values
  ('96339a56-afa3-41b2-bead-d9b5415304ed', 'incomes', null, 50000, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'cccc8301-24f0-4fcc-99be-07784a92568f', null, null, 9, 2022, '2022-10-01', true, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('39597a2c-23c6-48d1-b08d-c80d2c3f49fc', 'investment', null, -20000, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'c4fbd7e2-bba5-424f-ba68-89654b7b5d71', null, 'b12e9cf2-6209-48cd-a489-1adda7c9b3ea', 9, 2022, '2022-10-16', true, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('22c9e072-5df2-4e5e-9b9d-bdc464c834eb', 'expenses', null, -12000, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'aeb0cf43-0857-4277-8b0a-8069ae4b2831', null, null, 9, 2022, '2022-10-05', true, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('1a503492-2668-4ccf-8dda-d131e1e18f61', 'expenses', null, -5500, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'c2244a40-b6d5-43f1-8004-bbba5971a22f', null, null, 9, 2022, '2022-10-05', true, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),

  ('3c3576f0-c64c-4a8f-8e40-6d9dfe239170', 'investment', null, 20000, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'c4fbd7e2-bba5-424f-ba68-89654b7b5d71', null, 'b12e9cf2-6209-48cd-a489-1adda7c9b3ea', 10, 2022, '2022-11-15', true, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('164922c2-1ed3-47b5-b295-b7c931221e75', 'incomes', null, 100000, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'cccc8301-24f0-4fcc-99be-07784a92568f', null, null, 10, 2022, '2022-11-15', true, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('1065bf1a-ad2d-4faf-a697-7b4e45185ca3', 'expenses', null, -10000, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'aeb0cf43-0857-4277-8b0a-8069ae4b2831', null, null, 10, 2022, '2022-11-05', true, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('34ba9635-d7d0-456c-8bad-4805bacd0194', 'expenses', null, -15000, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'c2244a40-b6d5-43f1-8004-bbba5971a22f', null, null, 10, 2022, '2022-11-05', false, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),
  ('7e1e59d0-1c34-4b92-b93c-68a740af6104', 'expenses', null, -2500, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'b33e875e-ecba-4742-9e30-bc6e42dcf7c8', '3e6672d2-61c0-4f97-a44c-7fe239a4577f', null, 10, 2022, '2022-11-11', false, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262'),

  ('c52a36a0-0376-40a7-b3c2-d2c524f4b57c', 'expenses', null, -2500, '9e9a8297-1372-4c96-8bc1-4afdfd449680', 'b33e875e-ecba-4742-9e30-bc6e42dcf7c8', '3e6672d2-61c0-4f97-a44c-7fe239a4577f', null, 11, 2022, '2022-11-11', false, '100fd4fa-3b0f-4cd8-9dcd-45a02ca49262')
  ;

insert into public."movementFee"(id, "bucketId", "feeNumber", "totalFees")
values
  ('7e1e59d0-1c34-4b92-b93c-68a740af6104', '61e2a4e8-a81e-480b-b09b-db96a5443840', 1, 2),
  ('c52a36a0-0376-40a7-b3c2-d2c524f4b57c', '61e2a4e8-a81e-480b-b09b-db96a5443840', 2, 2)
  ;