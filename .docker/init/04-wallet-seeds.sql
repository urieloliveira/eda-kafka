INSERT INTO wallet.clients (id, name, email, created_at) VALUES ('87495b95-1c7f-4038-ae55-ab36ed6a9411', 'John', 'john@j.com', '2023-04-27');
INSERT INTO wallet.clients (id, name, email, created_at) VALUES ('2f25b387-ac51-4415-ac80-1cfd47f11ff0', 'Jane', 'jane@j.com', '2023-04-27');

INSERT INTO wallet.accounts (id, client_id, balance, created_at) VALUES ('f8df753c-3b58-43aa-8016-12aaa4f1ea3e', '87495b95-1c7f-4038-ae55-ab36ed6a9411', 1000, '2023-04-27');
INSERT INTO wallet.accounts (id, client_id, balance, created_at) VALUES ('0216ea38-524f-4e85-8743-d484a8f7538e', '2f25b387-ac51-4415-ac80-1cfd47f11ff0', 0, '2023-04-27');