import { ICommand } from "../types/wokcommandstypes"

const Command: ICommand = {
  permissions: ['ADMINISTRATOR'],
  callback: ({ message, client, args }) => {
    client.emit('guildMemberAdd', message.member!);
  },
}
export default Command;