const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const welcomeSchema = new mongoose.Schema({
  // Guild ID
  guildId: reqString,
  channelId: reqString,
	backgroundImage: reqString,
	color: reqString,
})

module.exports = mongoose.model('goodbye-message', welcomeSchema)