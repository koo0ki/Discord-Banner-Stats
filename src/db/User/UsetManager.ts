import { Collection } from "discord.js"
import { User } from "./UserModel";
import { Sqlite } from "../Sqlite";
import { Repository } from "typeorm";

export default class UserManager extends Collection<string, User> {
    private readonly repository: Repository<User>;

    public constructor(private readonly db: Sqlite) {
        super()
        this.repository = db.dataSource.getRepository(User);
    }

    public async init() {
        const array = await this.array(false);
        
        for (const user of array) {
            this.set(user.userId, user);
        }
    }

    public async array(cached: boolean) {
        return cached ? this.map((u) => u) : await this.repository.find();
    }

    public async findOne(userId: string) {
        const res = this.get(userId) ?? await this.repository.findOneBy({
            userId
        });

        if (res) {
            return res;
        } else {
            return await this.create(userId);
        }
    }

    public async getActiveMember() {
        const guild = this.db.client.utils.getGuild();
        const array = (await this.array(true)).sort((a, b) => b.online - a.online);
        if (array.length) {
            const activeMember = array[0]
            return this.db.client.utils.getInfo(
                guild?.members.cache.get(activeMember?.userId!)
            );
        } else {
            return this.db.client.utils.getInfo(undefined);
        }
    }

    public async save(user: User) {
        await this.repository.save(user);
        this.set(user.userId, user);
    }

    public clear() {
        this.repository.clear();
        super.clear();
    }

    private async create(userId: string) {
        const user = new User();
        user.userId = userId

        this.set(userId, user);
        await this.repository.save(user);

        return user;
    }
}
