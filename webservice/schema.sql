DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS pets;

CREATE TABLE usuarios (
  id        INTEGER     NOT NULL PRIMARY KEY AUTOINCREMENT,
  nome      VARCHAR(20) NOT NULL CHECK(LENGTH(nome) >= 2),
  sobrenome VARCHAR(20)     NULL
);

CREATE TABLE pets (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(10),
  responsavel INTEGER NOT NULL REFERENCES usuarios(id)
);

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Ricardo', 'Pereira');

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Eduardo', 'Silveira');

INSERT INTO usuarios (nome, sobrenome)
VALUES ('Renata', 'Lopes');

INSERT INTO pets (nome, responsavel)
VALUES ('Miau', 1);

INSERT INTO pets (nome, responsavel)
VALUES ('Snoop', 2);

INSERT INTO pets (nome, responsavel)
VALUES ('Mia', 3);

INSERT INTO pets (nome, responsavel)
VALUES ('Haley', 3);
