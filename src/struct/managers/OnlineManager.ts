import type Client from "../client/Client";

export class OnlineManager {
    private client: Client
    constructor (client: Client) {
        this.client = client
    }

    init () {
        const guild = this.client.utils.getGuild()
        if (guild) {
            setInterval(async () => {
                guild.members.cache.forEach(async (member) => {
                    if (member.voice.channel) {
                        const user = await this.client.db.users.findOne(member.id)
                        user.online += 1
                        await this.client.db.users.save(user)
                    }
                });
            }, 1000);
        }
    }
}