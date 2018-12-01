create table alocacao(
	id serial primary key unique,
	usuario varchar(100) not null ,
	livro integer not null ,
	data_locacao varchar(50) not null,
	data_devolucao varchar(50) not null,
    foreign key (usuario) REFERENCES autenticacao(username),
    foreign key (livro) REFERENCES livros(id) 
);
