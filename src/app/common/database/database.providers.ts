import { createConnection, getConnectionOptions } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection(
            await getConnectionOptions()
            // {
            //     type: "postgres",
            //     host: "172.17.0.2",
            //     port: 5432,
            //     username: "postgres",
            //     password: "postgres",
            //     database: "cci_digipilote",
            //     synchronize: true,
            //     logging: false,
            //     entities: ["dist/app/**/*.entity.js"]
            // }
        ),
    },
];