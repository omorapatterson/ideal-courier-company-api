require ('custom-env').env(process.env.NODE_ENV)

module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "synchronize": true,
    "logging": false,
    "entities": [
        process.env.DATABASE_ENTITIES
    ],
    "migrations": [
        process.env.DATABASE_MIGRATIONS
    ],
    "cli": {
        "entitiesDir": process.env.DATABASE_ENTITIES_DIR,
        "migrationsDir": process.env.DATABASE_MIGRATIONS_DIR
    }
}