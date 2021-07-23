import ICommandArguments from "../interfaces/ICommandArguments";
declare const _default: {
    maxArgs: number;
    expectedArgs: string;
    ownerOnly: boolean;
    description: string;
    category: string;
    hidden: boolean;
    callback: (options: ICommandArguments) => Promise<void>;
};
export = _default;
