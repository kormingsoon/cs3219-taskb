const { post } = require('../route/api-routes');

// Import contact model
Contact = require('../model/contactModel');

// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email ? req.body.email : contact.email;
    
    // save the contact and check for errors
    contact.save(function (err) {
        if (err)
            res.json(err);
            res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    const contactId = req.params.contact_id;
    Contact.findById(contactId)
    .then(contact => {
        if (!contact) {
            err.statusCode = 404;
            throw err
        } else {
            res.json({
            message: 'Contact details loading...',
            data: contact
            })
        }
    }) .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("your-id-input input in /goto/contacts/<your-id-input> may be wrong.");
        console.log(err.statusCode)
        res.status(404).json({
            status: "failure",
            message: 'Contact cannot be found. Key in the correct id. Go back to /api/contacts/ to see the list.'
        });
    })
};

// Handle update contact info
exports.update = function (req, res) {
    const contactId = req.params.contact_id;
    Contact.findById(contactId)
    .then(contact => {
        if (!contact) {
            err.statusCode = 404;
            throw err
        }
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.email = req.body.email ? req.body.email : contact.email;

        // save the contact and check for errors
        contact.save(function (err) {
            if (err) {
                res.json(err);
                throw err
            }
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("your-id-input input in /goto/contacts/<your-id-input> may be wrong.");
        console.log(err.statusCode)
        res.status(404).json({
            status: "failure",
            message: 'Contact cannot be found. Key in the correct id. Go back to /api/contacts/ to see the list.'
        });
    })
};

// Handle delete contact
exports.delete = function (req, res) {
    const contactId = req.params.contact_id;
    Contact.findById(contactId)
    .then(contact => {
        if (!contact) {
            err.statusCode = 404;
            throw err
        } else {
            res.status(200).json({
                status: "success",
                message: 'Contact deleted'
            });
            return Contact.findByIdAndRemove(contactId);
        }
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log("your-id-input input in /goto/contacts/<your-id-input> may be wrong.");
        console.log(err.statusCode)
        res.status(404).json({
            status: "failure",
            message: 'Contact cannot be found. Key in the correct id. Go back to /api/contacts/ to see the list.'
        });
    })
};