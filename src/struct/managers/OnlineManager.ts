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
                guild.members.cache.forEach((member) => {
                    if (member.voice.channel) {
                        this.client.db.add(`members.${member.id}`, 1)
                    }
                });
            }, 1000);
        }
    }
}