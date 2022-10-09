CREATE TABLE IF NOT EXISTS schedules (
    idschedules serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    idclients int NULL,
    client VARCHAR(256) NOT NULL,
    description VARCHAR(256) NOT NULL,
    time time NOT NULL,
    date date NOT NULL,
    phone VARCHAR(20),
    pacote boolean DEFAULT false NOT NULL,
    qtdAtendence int NULL,
    qtdTotalAtendence int NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES users(idusers),
    FOREIGN KEY(idclients) REFERENCES clients(idclients)
);
