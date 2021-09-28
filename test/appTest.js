const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('should');
const app = require('../index');
Contact = require('../model/contactModel');

chai.should();
chai.use(chaiHttp);

describe('Task API', () => {
    step('Status Code 200 for Homepage', function(done) {
        chai.request(app)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200);
        done();
        })
    })

    step('GET API Testing', function() {
        chai.request(app)
        .get("/goto/contacts")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.message.should.be.eq('Contacts retrieved successfully')
        });

    })
});

describe('Task POST API', () => {

    step('POST API', function() {
        const contact =  {
            name: "andreatanky",
            email: "andreatanky@gmail.com"
        }
        chai.request(app)
        .post("/goto/contacts")
        .send(contact)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.be.eq('New contact created!')
        });

    })
});

describe('Task DELETE API', () => {

    step('DELETE API', function() {

        chai.request(app)
        .delete("/goto/contacts/andreatanky")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.be.eq('Contact deleted')
        });   
    
    })
})

describe('Task PUT API Testing', () => {
    describe('Add contact and edit', () => {
        before( async function() {  
            const contact =  {
                name: "andreatankyyy",
                email: "andreatankyyy@gmail.com"
            }
            chai.request(app)
            .post("/goto/contacts")
            .send(contact)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.eq('New contact created!')
            });
        });
        
        step('PUT API', () => {
            const contactToEditTo =  {
                name: "counting123",
                email: "testing@gmail.com"
            }

            chai.request(app)
            .put("/goto/contacts/andreatankyyy")
            .send(contactToEditTo)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.be.eq('Contact Info updated')
            });
        })

    });


    // describe('deletion after edit', () => {

    //     step('DELETE API', function() {

    //         chai.request(app)
    //         .delete("/goto/contacts/counting123")
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.message.should.be.eq('Contact deleted')
    //         });   
        
    //     })
    // })

});