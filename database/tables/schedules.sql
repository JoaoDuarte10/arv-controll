CREATE TABLE IF NOT EXISTS schedules (
    idschedules serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    client VARCHAR(256) NOT NULL,
    description VARCHAR(256) NOT NULL,
    time time NOT NULL,
    date date NOT NULL,
    phone VARCHAR(20),
    pacote boolean DEFAULT false NOT NULL,
    qtdAtendence int NULL,
    qtdTotalAtendence int NULL,
    FOREIGN KEY(idusers) REFERENCES users(idusers)
);
