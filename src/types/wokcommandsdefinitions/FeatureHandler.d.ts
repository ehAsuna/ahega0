import { Client } from 'discord.js';
import WOKCommands from '.';
declare class FeatureHandler {
    private _features;
    private _client;
    private _instance;
    constructor(client: Client, instance: WOKCommands, dir: string);
    private registerFeature;
    private isEnabled;
}
export = FeatureHandler;
