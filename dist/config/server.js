"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    host: env("HOST"),
    port: env.int("PORT"),
    app: {
        keys: env.array("APP_KEYS"),
    },
});
