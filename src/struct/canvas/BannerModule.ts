import { createCanvas } from "@napi-rs/canvas";
import Client from "../client/Client";
import CanvasUtil from "./CanvasUtils";
import type { Guild } from "discord.js";

export class BannerModule extends CanvasUtil {
    private readonly data = this.client.config.coordinats
    constructor (client: Client) {
        super(client)
    }

    async drawBanner (guild: Guild) {
        const background = await this.canvas.cache.image.loadImage('banner.png')
        const canvas = createCanvas(background.width, background.height)
        const ctx = canvas.getContext('2d');

        const voices = guild.members.cache.filter(m => m.voice.channel).size
        const userData = await this.client.db.users.getActiveMember()
        const members = guild.memberCount
        const avatar = await this.getAvatar(userData.avatar)

        ctx.drawImage(background, 0, 0, background.width, background.height)

        for (const info of this.data) {
            switch (info.type) {
                case 'activeMember':
                    if (info.use) {
                        ctx.fillStyle = info?.color || '#FFFFFF'
                        ctx.font = `${info.size} ${info.font?.name}`
                        ctx.textAlign = info.font?.textAlign 
                        if (info.font?.max) {
                            ctx.fillText(this.sliceText(userData.name, info.font.max), info.x, info.y)
                        } else {
                            ctx.fillText(userData.name, info.x, info.y)
                        }
                    }
                break
                case 'avatarActiveMember':
                    if (info.use) {
                        ctx.drawImage(avatar, info.x, info.y, info.size, info.size);
                    }
                break
                case 'voiceCount':
                    if (info.use) {
                        ctx.fillStyle = info?.color || '#FFFFFF'
                        ctx.font = `${info.size} ${info.font?.name}`
                        ctx.textAlign = info.font?.textAlign 
                        if (info.font?.max) {
                            ctx.fillText(this.sliceText(String(voices), info.font.max), info.x, info.y)
                        } else {
                            ctx.fillText(String(voices), info.x, info.y)
                        }
                    }
                break
                case 'memberCount':
                    if (info.use) {
                        ctx.fillStyle = info?.color || '#FFFFFF'
                        ctx.font = `${info.size} ${info.font?.name}`
                        ctx.textAlign = info.font?.textAlign 
                        if (info.font?.max) {
                            ctx.fillText(this.sliceText(String(members), info.font.max), info.x, info.y)
                        } else {
                            ctx.fillText(String(members), info.x, info.y)
                        }
                    }
                break
            }
        }

        return canvas.toBuffer('image/png')
    }
}