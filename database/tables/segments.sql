CREATE TABLE IF NOT EXISTS segments (
    idsegments serial PRIMARY KEY NOT NULL,
    idusers int NOT NULL,
    name VARCHAR(256) NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
    updatedAt TIMESTAMP NULL,
    FOREIGN KEY(idusers) REFERENCES users(idusers)
);