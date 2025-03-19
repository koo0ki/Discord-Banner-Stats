import type Client from "../client/Client";

interface IEventsOptions {
    name: string,
    once: boolean
}

export class BaseEvent {
    public options: IEventsOptions;
    public run: (client: Client, ...args: any[]) => Promise<any>;
    
    constructor(options: IEventsOptions, run: (client: Client, ...args: any[]) => Promise<any>) {
        this.options = options;
        this.run = run;
    }
}