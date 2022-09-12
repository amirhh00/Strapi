"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    connection: {
        client: "postgres",
        connection: {
            host: env("PGHOST"),
            port: env.int("PGPORT"),
            database: env("PGDATABASE"),
            user: env("PGUSER"),
            password: env("PGPASSWORD"),
            ssl: env.bool("DATABASE_SSL"),
        },
    },
});
