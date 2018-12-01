create table editora(
    id serial primary key unique,
    nome varchar(100) not null,
    email varchar(100) ,
    telefone varchar(100)
);