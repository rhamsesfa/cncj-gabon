const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  nomContact: { type: String, required: true },
  adresseContact: { type: String, required: true },
  typeContact: { type: String, required: true },
  messageContact: { type: String, required: true },
  datePostContact: { type: String, required: true },
  readContact: { type: Boolean, required: false },
});

module.exports = mongoose.model('Contact', contactSchema);