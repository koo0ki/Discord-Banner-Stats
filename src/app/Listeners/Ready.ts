import { Events } from "discord.js";
import { BaseEvent } from "../../struct/base/BaseEvent";
import type Client from "../../struct/client/Client";

export default new BaseEvent({
    name: Events.ClientReady,
    once: true
}, 
    async (client: Client) => {
        client.db.init()
        client.managers.online.init()
        client.managers.banner.init()

        client.logger.info(`Banner is inited`)
    }
)