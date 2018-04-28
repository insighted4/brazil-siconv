require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
module.exports = {
    [environment]: {
        client: 'postgresql',
        connection: {
            host: process.env.POSTGRES_HOST || 'localhost',
            port: process.env.POSTGRES_PORT || '5432',
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB || 'siconv',
            schema: process.env.POSTGRES_SCHEMA || 'public',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'migrations',
        },
    },
};

// Update with your config settings.
//
// module.exports = {
//
//     development: {
//         client: "sqlite3",
//         connection: {
//             filename: "./dev.sqlite3"
//         }
//     },
//
//     staging: {
//         client: "postgresql",
//         connection: {
//             database: "my_db",
//             user: "username",
//             password: "password"
//         },
//         pool: {
//             min: 2,
//             max: 10
//         },
//         migrations: {
//             tableName: "knex_migrations"
//         }
//     },
//
//     production: {
//         client: "postgresql",
//         connection: {
//             database: "my_db",
//             user: "username",
//             password: "password"
//         },
//         pool: {
//             min: 2,
//             max: 10
//         },
//         migrations: {
//             tableName: "knex_migrations"
//         }
//     }
//
// };