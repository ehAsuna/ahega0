import { Client, Message, PermissionString, TextChannel } from "discord.js";
import WOKCommands from "..";

interface ICommandCallback {
    message: Message & { channel: TextChannel };
    channel: TextChannel;
    args: string[];
    text: string;
    client: Client;
    prefix: string;
    instance: WOKCommands;
}

export default interface ICommand {
    /** @deprecated I don't know why you have this when you can just use alias but hey */
    name?: string,
    aliases?: string[] | string,
    //names: string[] | string;
    category?: string;
    minArgs?: number;
    maxArgs?: number;
    syntaxError?: {
        [key: string]: string;
    };
    expectedArgs?: string;
    description?: string;
    syntax?: string;
    requiredPermissions?: PermissionString[];
    permissions?: PermissionString[];
    callback?: (data: ICommandCallback) => Promise<any> | void;
    cooldown?: string;
    globalCooldown?: string;
    ownerOnly?: boolean;
    hidden?: boolean;
    guildOnly?: boolean;
    testOnly?: boolean;
    slash?: boolean | "both";
}