import { loadImage as CanvasLoad } from '@napi-rs/canvas'
import fs from 'fs'

export class CanvasCache {
    constructor () {}
    private cache = new Map<string, any>()

    public async init () {
        const files = fs.readdirSync('./assets/Images')

        for (let i = 0; i < files.length; i++) {
            this.loadImage(files[i]!)
        }
    }

    public async loadImage(path: string) {
        if (this.cache.has(path)) {
            return this.cache.get(path)
        }

        const image = await CanvasLoad('./assets/Images/' + path)
        this.cache.set(path, image)
        return image
    }
}