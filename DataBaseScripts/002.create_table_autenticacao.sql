create table autenticacao(
	username varchar(100) primary key unique,
	email varchar(100) not null,
	nome varchar(100) not null,
	sobrenome varchar(100) not null,
	senha varchar(100) not null
)