import { createCanvas } from "@napi-rs/canvas";
import Client from "../client/Client";
import CanvasUtil from "./CanvasUtils";
import type { Guild } from "discord.js";

export class BannerModule extends CanvasUtil {
    constructor (client: Client) {
        super(client)
    }

    async drawBanner (guild: Guild) {
        const background = await this.canvas.cache.image.loadImage('banner.png')
        const canvas = createCanvas(background.width, background.height)
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = `#FFFFFF`
        ctx.lineWidth = 3
        ctx.textAlign = 'center'
        ctx.font = `50px Gilroy-Bold`

        const voices = guild.members.cache.filter(m => m.voice.channel).size
        const userData = await this.client.db.getActiveMember()

        const avatar = await this.getAvatar(userData.avatar)
        ctx.drawImage(background, 0, 0, background.width, background.height)
        ctx.drawImage(avatar, 139, 402, 208, 208);

        ctx.fillText(String(voices), 1097, 615)

        ctx.textAlign = 'left'
        ctx.font = `90px Gilroy-Bold`
        ctx.fillText(this.sliceText(userData.name, 15), 403, 535)

        return canvas.toBuffer('image/png')
    }
}