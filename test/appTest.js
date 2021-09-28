const chai = require('chai');
const chaiHttp = require('chai-http');
const { isValidObjectId } = require('mongoose');
const app = require('../index');
Contact = require('../model/contactModel');
const ObjectId = require('mongodb').ObjectId; 

chai.should();
chai.use(chaiHttp);

describe('Task API', () => {
    it('Status Code 200 for Homepage', () => {
        chai.request(app)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200);
        })
    })

    it('GET API Testing', () => {
        chai.request(app)
        .get("/goto/contacts")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eq(1);
        });
    })

    it('POST API', () => {
        const contact =  {
            name: "andreatanky",
            email: "andreatanky@gmail.com"
        }
        chai.request(app)
        .post("/goto/contacts")
        .send(contact)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('name').eq("andreatanky");
            res.body.data.should.have.property('email').eq("andreatanky@gmail.com");

        })
    })

    it('PUT API', () => {
        const contact =  {
            name: "counting123",
            email: "testing@gmail.com"
        }
        chai.request(app)
        .put("/goto/contacts/andreatanky")
        .send(contact)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('name').eq("counting123");
            res.body.data.should.have.property('email').eq("testing@gmail.com");
        })
    })

    it('DELETE API', () => {
        const contactToDelete =  {
            name: "andreanottanky",
            email: "andreanottanky@gmail.com"
        }

        chai.request(app)
        .post("/goto/contacts")
        .send(contactToDelete).then( () => {
            chai.request(app)
            .delete("/goto/contacts/andreanottanky")
            .end((err, res) => {
            res.should.have.status(200);
            });
        });
        
    })
})