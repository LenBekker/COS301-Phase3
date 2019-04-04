'use strict';

const chai = require('chai');
chai.use(require('chai-json'));
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../index.js'); // Our app

    function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}



   
describe('API endpoint for CIS subsystem', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  sleep(1000,function(){

      console.log("Setting enivorment")
   });

   sleep(1000,function(){

      console.log("Warming things up")
   });

   sleep(2000,function(){

      console.log("Lets get Testing")
   });
   sleep(1000,function(){

     
   });
    
  // Post - List all colors
  it('Should be an Email', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "getemail",
        clientId: "10"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
 
      });
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
        clientId: "6"
      })
      
        const obj = { a: res.body.data};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("true"); 
      });

 // POST get Client information
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

})

describe('CRUD TESTING (specific information testing)', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });


  //POST check email
  it('Correct Email returned', function()
   {
    return chai.request(app)
      .post('/')
      .send({
        option: "getEmail",
        clientId: "11"
      })
      
   const obj = { a: res.body.email, b: res.body.name, c: res.body.surname};
   expect(obj).to.not.be.undefined;  
  });
  


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

});
 
describe('Integration tests ', function() {

    this.timeout(5000); // How long to wait for a response (ms)

    before(function() {

    });

    after(function() {

    });

    it('Check if client is active (client is supposed to be inactive)', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "getActive",
                clientId: "6"
            })

        const obj = { a: res.body.data};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("false");



    });

    it('Check if client is inactive (client is supposed to be active)', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "getActive",
                clientId: "6"
            })

        const obj = { a: res.body.data};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("false");


    });

    it('Get a user by their ClientID(invalid ID entered)', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "getUserById",
                clientId: "3156892"
            })

        const obj = { a: res.body.clienid};

        should(obj).be.null;

    })

    //DEACTIVATE CLIENT
    it('Update Active status / deactivate if already deactivated', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "deactivate",
                clientId: "7"
            })

        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("false");


    });

    it('Trying to deactivate an invalid clientID should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "deactivate",
                clientId: "78945613"
            })

        const obj = { a: res.body.status};
        should(obj).be.null;

    });

//REACTIVATE CLIENT
    it('Update Active status / reactivate actived client', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "reactivate",
                clientId: "1"
            })

        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("false");


    });

    it('Trying to Activate an invalid clientID should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "deactivate",
                clientId: "78945613"
            })

        const obj = { a: res.body.status};
        should(obj).be.null;

    });

//UPDATE ADDRESS
    it('Update Address to empty string should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "updateAddress",
                clientId: "1",
                address: ""
            })

        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("fail");


    });

    it('Update Address to with invalid clientID should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "updateAddress",
                clientId: "7946855",
                address: "341 Puffadder Street"
            })

        const obj = { a: res.body.status};
        should(obj).be.null;


    });

    //UPDATE Phone
    it('Update Phone Number to empty string should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "updatePhone",
                clientId: "11",
                phone: ""
            })

        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("fail");


    });

    it('Update Phone Number of invalid clientID should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "updatePhone",
                clientId: "7877777",
                phone: "0589634528"
            })

        const obj = { a: res.body.status};
        should(obj).be.null;



    });

    //Update Email
    it('Update Email Address to empty string should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "updateEmail",
                clientId: "9",
                email: ""
            })

        const obj = { a: res.body.status};
        expect(obj).to.not.be.undefined;
        expect(obj.a).to.deep.equal("fail");


    });

    it('Update Email Address of invalid clientID should fail ', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "updateEmail",
                clientId: "9999999",
                email: "joe@1234.com"
            })

        const obj = { a: res.body.status};
        should(obj).be.null;


    });

    it('using get email with an invalid clientID should fail', function()
    {
        return chai.request(app)
            .post('/')
            .send({
                option: "getEmail",
                clientId: "789456852"
            })

        const obj = { a: res.body.email};
        should(obj).be.null;

    });

});
