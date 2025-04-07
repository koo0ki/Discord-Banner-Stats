import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from "./User/UserModel";
import UserManager from "./User/UsetManager";
import Client from "../struct/client/Client";

export class Sqlite {
    public dataSource: DataSource;
    public users: UserManager;

    constructor(public client: Client) {
        this.client = client;
        this.dataSource = new DataSource({
            type: 'sqlite',
            database: './db.sqlite',
            synchronize: true,
            logging: false,
            entities: [User],
        });

        this.users = new UserManager(this);
    }

    async init() {
        await Promise.all([
            this.users.init()
        ])
    }

    connect() {
        this.dataSource.initialize()
        .then(() => {
            this.client.logger.info('Data Source has been initialized!');
            this.init()
        })
        .catch(() => {
            this.client.logger.error('Error during Data Source initialization');
        });
    }
}