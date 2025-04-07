import { CronJob } from "cron";
import type Client from "../client/Client";
import { BannerModule } from "../canvas/BannerModule";
import type { Guild } from "discord.js";

export class BannerManager {
    private client: Client
    public canvas: BannerModule

    constructor (client: Client) {
        this.client = client
        this.canvas = new BannerModule(this.client)
    }

    async init () {
        this.sweeper()
        this.canvas.init()

        const guild = this.client.utils.getGuild()
        this.updateBanner(guild!)
        setInterval(() => {
            this.updateBanner(guild!)
        }, 120000)
    }

    async updateBanner(guild: Guild) {
        await guild?.setBanner(
            await this.canvas.drawBanner(
                guild
            )
        ).catch(() => {})
    }

    sweeper () {
        CronJob.from({
            cronTime: '* * 2 * * *',
            onTick: async () => {
                this.client.db.users.clear()
            },
            start: true,
            timeZone: 'Europe/Moscow'
        });
    }
}