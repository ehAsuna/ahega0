import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

interface Schema {
  guildId: string,
  channelId: string,
  messageId: string,
  roles: { emoji: string, roleId: string }[]
}

const messageSchema = new mongoose.Schema<Schema, mongoose.Model<Schema>>({
  guildId: reqString,
  channelId: reqString,
  messageId: reqString,
  roles: [
    {
      emoji: reqString,
      roleId: reqString,
    },
  ],
})

export default mongoose.model('tutorial-message-schema', messageSchema)