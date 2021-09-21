// api-routes.js// Initialize express router
let router = require('express').Router();
const Contact = require("../model/contactModel");

var contactController = require('../controller/contactController');


router.route("/create").post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    var contact = new Contact();

    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email ? req.body.email : contact.email;
    
    // save the contact and check for errors
    contact.save();
})

router.route("/retrieve").get((req, res) => {
    Contact.find().then(foundContacts => res.json(foundContacts))
})

router.route("/delete").delete((req, res) => {
    const contactId = req.query.contactId;
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
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        res.status(404).json({
            status: "failure",
            message: 'Contact cannot be found. Key in the correct id. Go back to /goto/contacts/ to see the list.'
        });
    })
})

router.route("/update").put((req, res) => {
    const contactId = req.body.contact_id;
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
        res.status(404).json({
            status: "failure",
            message: 'Contact cannot be found. Key in the correct id.'
        });
    })
})



// Export API routes
module.exports = router;