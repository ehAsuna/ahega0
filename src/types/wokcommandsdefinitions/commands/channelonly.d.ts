import ICommandArguments from "../interfaces/ICommandArguments";
declare const _default: {
    minArgs: number;
    expectedArgs: string;
    cooldown: string;
    requiredPermissions: string[];
    guildOnly: boolean;
    description: string;
    category: string;
    callback: (options: ICommandArguments) => Promise<void>;
};
export = _default;
