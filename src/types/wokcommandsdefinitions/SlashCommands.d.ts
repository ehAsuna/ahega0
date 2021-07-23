/// <reference types="node" />
import { APIMessageContentResolvable, Channel, Guild, GuildMember } from "discord.js";
import WOKCommands from ".";
import ISlashCommand from "./interfaces/ISlashCommand";
declare class SlashCommands {
    private _client;
    private _instance;
    constructor(instance: WOKCommands, listen?: boolean);
    get(guildId?: string): Promise<ISlashCommand[]>;
    create(name: string, description: string, options?: Object[], guildId?: string): Promise<Object>;
    delete(commandId: string, guildId?: string): Promise<Buffer>;
    private getMemberIfExists;
    getObjectFromOptions(guild: {
        members: {
            cache: any;
        };
    }, options?: {
        name: string;
        value: string;
    }[]): Object;
    getArrayFromOptions(guild: {
        members: {
            cache: any;
        };
    } | undefined, options?: {
        name: string;
        value: string;
    }[]): string[];
    createAPIMessage(interaction: APIMessageContentResolvable, content: any): Promise<{
        files: object[] | null;
    }>;
    invokeCommand(interaction: APIMessageContentResolvable, commandName: string, options: object, member: GuildMember, guild: Guild | undefined, channel: Channel | undefined): Promise<boolean>;
}
export = SlashCommands;
