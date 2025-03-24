import type { GuildMember } from "discord.js"
import type Client from "./Client"

export class Utils {
    private client: Client
    constructor (client: Client) {
        this.client = client
    }

    getGuild() {
        return this.client.guilds.cache.get(
            this.client.config.system.guildId
        )
    }

    getInfo (member: GuildMember | undefined) {
        return {
            name: member ? member.displayName : 'Пусто',
            avatar: member ? member.displayAvatarURL() : undefined
        }
    }
}