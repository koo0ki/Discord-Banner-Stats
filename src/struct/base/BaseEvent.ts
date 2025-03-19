import type Client from "../client/Client";

export class BaseEvent {
    public name: string;
    public run: (client: Client, ...args: any[]) => Promise<any>;
    
    constructor(name: string, run: (client: Client, ...args: any[]) => Promise<any>) {
        this.name = name;
        this.run = run;
    }
}