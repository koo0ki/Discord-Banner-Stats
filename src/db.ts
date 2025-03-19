import { JSONDriver, QuickDB } from "quick.db";
import type Client from "./struct/client/Client";

interface TUserData {
    userId: string,
    online: number
}

export default class extends QuickDB {
    public client: Client
    constructor(client: Client) {
        super({
            driver: new JSONDriver('./db.json')
        })

        this.client = client
    }

    async getActiveMember() {
        const guild = this.client.utils.getGuild()
        const members = await this.get('members')
        if (members) {
            const activeMember = Object.entries(await this.get('members')).map((a) => ({
                userId: a[0],
                online: Number(a[1])
            })).sort((a: TUserData, b: TUserData) => b.online - a.online)[0]
            return this.client.utils.getInfo(
                guild?.members.cache.get(activeMember?.userId!)
            )
        } else {
            return this.client.utils.getInfo(members)
        }
    }
}