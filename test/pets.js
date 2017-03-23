var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

var Pet = require('../models/pet');

var user = chai.request.agent(server);
var token = "";

describe("Pet", function() {
    before(function() {
        user
        .post('/login')
        .send({ email: "test@11.com", password: "password" })
        .end(function (err, res){
            token = res.body.token;
        });
    });

    // INDEX
    it('should list ALL pets on / GET', function (done) {
        user
        .get('/')
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });

    // SHOW
    it('should list one pet on /pets/:id GET', function (done) {
        user
        .get('/pets/58d432863e0180319bf26915')
        .end(function(err, res) {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    });

    it('should fail on /pets/:id GET with invalid id', function (done) {
        user
        .get('/pets/123')
        .end(function(err, res) {
            expect(err).to.not.be.null;
            res.should.have.status(404);
            done();
        });
    });

    // NEW
    it('should show new pet page on /pets/new GET', function (done) {
        user
        .get('/pets/new')
        .end(function(err, res) {
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    });

    // CREATE POST
    it('should create pet on /pets POST', function (done) {
        user
        .post('/pets')
        .set('Cookie', 'token=' + token)
        .send({name: 'Rex' , species: 'Dog', description: 'It\'s a dog. idk what you want me to say'})
        .end(function(err, res) {
            console.log(err);
            expect(err).to.be.null;
            res.should.have.status(200);
            done();
        });
    });
});
