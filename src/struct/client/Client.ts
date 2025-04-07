import { Client, GatewayIntentBits } from "discord.js";
import { Listeners } from "../handlers/Listeners";
import { Logger } from "./Logger";
import * as config from '../../config'
import { Utils } from "./Utils";
import { OnlineManager } from "../managers/OnlineManager";
import { BannerManager } from "../managers/BannerManager";
import { Sqlite } from "../../db/Sqlite";

export default class extends Client<true> {
    public readonly config: typeof config = config
    constructor () {
        super({
            intents: Object.values(GatewayIntentBits) as GatewayIntentBits[]
        })
    }

    public db = new Sqlite(this)
    public utils = new Utils(this)
    public logger = new Logger()

    public managers = {
        online: new OnlineManager(this),
        banner: new BannerManager(this)
    }
    
    private ls = new Listeners(this)

    init () {
        this.db.connect()
        this.ls.init()
        this.login(this.config.system.token)
    }
}