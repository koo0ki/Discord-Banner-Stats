import { createCanvas, Image, loadImage } from "@napi-rs/canvas";
import Client from "../client/Client"
import { CanvasCache } from "./Cache/CanvasCache";
import { CanvasFonts } from "./Cache/CanvasFonts";

export default class CanvasUtil {
    public client: Client
    constructor (client: Client) {
        this.client = client
    }

    public canvas = {
        cache: {
            image: new CanvasCache(),
            fonts: new CanvasFonts()
        }
    }

    async getAvatar(url: string | undefined): Promise<Image> {
        const avatar = await loadImage(url || await this.canvas.cache.image.loadImage('default.png'));
        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        ctx.save();
        ctx.beginPath();
        const radius = canvas.width / 2;
        ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, 0, 0, 512, 512);

        return await loadImage(canvas.toBuffer(`image/png`))
    }

    sliceText (txt: string, max: number) {
        return txt.length > max ? `${txt.slice(0, max)}...` : txt
    }

    async init () {
        await Promise.all([
            this.canvas.cache.image.init(),
            this.canvas.cache.fonts.init()
        ])
    }
}