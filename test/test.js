'use strict';

const chai = require('chai');
chai.use(require('chai-json'));
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../index.js'); // Our app

describe('API endpoint for CIS subsystem', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // Post - List all colors
  it('Should be an Email', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "getEmail",
        clientId: "10"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
 
      });
  });

//POST check email
  it('Correct Email returned', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "getEmail",
        clientId: "10"
      })
      
        const obj = { a: res.body.email, b: res.body.name, c: res.body.surname};
    expect(obj).to.not.be.undefined;
    expect(obj.a).to.deep.equal("peter.griff@familymail.com");
    expect(obj.b).to.deep.equal("Peter");
    expect(obj.c).to.deep.equal("Griffin");
        //expect([{:1} ]).to.have.deep.members([ {a:1} ]);
        //expect(res.body).to.be.an.jsonObj(res.body).and.contain.jsonWithProps({"email":"hwinwarda@tiny.cc","name":"Herman","surname":"Winward" });
         //expect(res.body).to.be.an.jsonObj(res.body).and.contain.jsonWithProps({ email: 'hwinwarda@tiny.cc', name: 'Herman', surname: 'Winward' });
        //expect(res.body.name).to.be("Herman");
        //expect(res.body.surname).to.be("Winward");
      });
  


//POST check if active contect
  it('Check if client is active (client is supposed to be active)', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "getActive",
        clientId: "6"
      })
      
        const obj = { a: res.body.data};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("true");
        
       
      });

//POST check if client is inactive
  it('Check if client is inactive (client is supposed to be inactive)', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "getActive",
        clientId: "41"
      })
      
        const obj = { a: res.body.data};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("true");
        
       
      });

 // POST get Client info
  it('Get a user by their ClientID', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "getUserById",
        clientId: "5"
      })
      
        const obj = { a: res.body.clienid, b: res.body.name, c: res.body.surname,
                d: res.body.email, e: res.body.phonenumber, f: res.body.address,
                g: res.body.active };

        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("5");
        expect(obj.b).to.deep.equal("Peter");
        expect(obj.c).to.deep.equal("Griffin");
        expect(obj.d).to.deep.equal("peter.griff@familymail.co");
        expect(obj.e).to.deep.equal("5550112 ");
        expect(obj.f).to.deep.equal("31 Spooner Street");
        expect(obj.g).to.deep.equal("true");
      
       
      })
//DEACTIVATE CLIENT
    it('Update Active status / deactivate', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "deactivate",
        clientId: "1"
      })
      
        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("true");
        
       
      });

//REACTIVATE CLIENT
    it('Update Active status / reactivate ', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "reactivate",
        clientId: "1"
      })
      
        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("true");
        
       
      });

//UPDATE ADDRESS
    it('Update Address ', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "updateAddress",
        clientId: "1",
        address: "315 End Street"
      })
      
        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("success");
        
       
      });

    //UPDATE Phone
    it('Update Phone Number ', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "updatePhone",
        clientId: "11",
        phone: "0987654212"
      })
      
        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("success");
        
       
      });

    //Update Email
    it('Update Email Address ', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "updateEmail",
        clientId: "9",
        phone: "janee@gmail.com"
      })
      
        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("success");
        
       
      });


      





 

 // POST - Add new color
 
});