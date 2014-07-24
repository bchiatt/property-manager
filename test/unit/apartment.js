/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Room = require('../../app/models/room.js');
var Renter = require('../../app/models/renter.js');
var Apartment;
//a = apartment, rm = room, t = tenet/renter
var a1, a2, a3, rm1, rm2, rm3, rm4, rm5, rm6, rm7, rm8, rm9, rm10, rm11, t1, t2, t3;

describe('Apartment', function(){
  before(function(done){
    connect('property-manager-test', function(){
      Apartment = require('../../app/models/apartment.js');
      done();
    });
  });

  beforeEach(function(done){
    global.mongodb.collection('apartments').remove(function(){
      a1 = new Apartment('A1');
      a2 = new Apartment('A2');
      a3 = new Apartment('A3');
      rm1 = new Room('living', '8', '11');
      rm2 = new Room('kitchen', '11', '11');
      rm3 = new Room('bed', '15', '15');
      rm4 = new Room('bed', '15', '15');
      rm5 = new Room('living', '8', '11');
      rm6 = new Room('kitchen', '12', '12');
      rm7 = new Room('bed', '12', '9');
      rm8 = new Room('bed', '10', '10');
      rm9 = new Room('bed', '15', '20');
      rm10 = new Room('bed', '15', '20');
      rm11 = new Room('living', '20', '20');
      t1 = new Renter('Sue', '22', 'female', 'coder');
      t2 = new Renter('Sue', '25', 'male', 'social worker');
      t3 = new Renter('Diva', '56', 'female', 'movie star');

      a1.rooms.push(rm1, rm2, rm3, rm4);
      a1.renters.push(t1, t2);
      a2.rooms.push(rm5, rm6, rm7, rm8, rm9);
      a2.renters.push(t3);
      a3.rooms.push(rm10, rm11);

      console.log(a1, a2, a3);

      done();
    });
  });

  describe('constructor', function(){
    it('should create a new apartment', function(){
      expect(a1).to.be.instanceof(Apartment);
      expect(a1.rooms).to.have.length(4);
      expect(a1.renters).to.have.length(2);
    });
  });

  describe('#area', function(){
    it('should calculate the area of all rooms in an apartment', function(){
      expect(a3.area()).to.equal(700);
    });
  });

  describe('#cost', function(){
    it('should calculate the cost of the apartment', function(){
      expect(a3.cost()).to.equal(3500);
    });
  });

  describe('#bedrooms', function(){
    it('should return the number of bedrooms in an apartment', function(){
      expect(a2.bedrooms()).to.equal(3);
    });
  });

  describe('#isAvailable', function(){
    it('should ', function(){
    });
  });

  describe('#purgeEvicted', function(){
    it('should ', function(){
    });
  });

  describe('#purgeEvicted', function(){
    it('should ', function(){
    });
  });

  describe('#collectRent', function(){
    it('should ', function(){
    });
  });

  describe('#save', function(){
    it('should ', function(){
    });
  });

  describe('.find', function(){
    it('should ', function(done){

      done();
    });
  });

  describe('.findById', function(){
    it('should ', function(done){

      done();
    });
  });

  describe('deleteById', function(){
    it('should ', function(done){

      done();
    });
  });

  describe('area', function(){
    it('should ', function(done){

      done();
    });
  });

  describe('cost', function(){
    it('should ', function(done){

      done();
    });
  });

  describe('tenets', function(){
    it('should ', function(done){

      done();
    });
  });

  describe('revenue', function(){
    it('should ', function(done){

      done();
    });
  });
});
