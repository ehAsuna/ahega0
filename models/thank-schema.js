const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
}

const reqNumber = {
  type: Number,
  required: true,
}

const welcomeSchema = new mongoose.Schema({
	userId: reqString,
	total:	reqNumber,
});

module.exports = mongoose.model('thank-message', welcomeSchema)