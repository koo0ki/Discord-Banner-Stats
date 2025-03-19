import { GlobalFonts } from '@napi-rs/canvas'
import fs from 'fs'

export class CanvasFonts {
    constructor () {}

    async init () {
        const dir = fs.readdirSync('./assets/Fonts').filter(font => font.endsWith('.ttf') || font.endsWith('.otf'))

        for (const fonts of dir) {
            GlobalFonts.registerFromPath('./assets/Fonts/' + fonts, this.getName(fonts))
        }
    }

    getName(file: string) {
        return file.replace(/\.ttf$|\.otf$/i, '');
    }
}