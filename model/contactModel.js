mongoose = require('mongoose');

// Setup schema
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);

module.exports = Contact;