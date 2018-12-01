create table livros(
	id serial primary key unique,
	titulo varchar(100) not null,
	autor varchar(100) not null,
	editora integer not null,
	descricao varchar(500),
	datapublicacao varchar(20) not null
)
