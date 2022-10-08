CREATE TABLE IF NOT EXISTS atendences (
    idatendences serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    idclients int NULL,
    client VARCHAR(256),
    description VARCHAR(256) NOT NULL,
    date date NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
    updatedAt TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES users(idusers),
    FOREIGN KEY(idclients) REFERENCES clients(idclients)
);
