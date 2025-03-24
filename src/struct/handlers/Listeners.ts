import fs from 'fs/promises'
import type Client from '../client/Client'

export class Listeners {
    private client: Client
    constructor(client: Client) {
        this.client = client
    }
    
    async init () {
        const files = await fs.readdir(`${__dirname}/../../app/Listeners`) 
        for (let i = 0; i < files.length; i++) {
            const listener = (await import((`${__dirname}/../../app/Listeners/${files[i]}`))).default
            this.client[
                listener.options.once ? 'once' : 'on'
            ](listener.options.name, (...args) => {
                listener.run(this.client, ...args)
            })
            this.client.logger.info(`Loaded event ${listener.options.name}`)
        }
    }
}