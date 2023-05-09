const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  nomContact: { type: String, required: true },
  adresseContact: { type: String, required: true },
  typeContact: { type: String, required: true },
  messageContact: { type: String, required: true },
  DatePostContact: { type: String, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);