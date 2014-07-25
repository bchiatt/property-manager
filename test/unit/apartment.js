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
var a1, a2, a3;

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
      a1.rooms.push(new Room('living', '8', '11'), new Room('kitchen', '11', '11'), new Room('bed', '15', '15'), new Room('bed', '15', '15'));
      a2.rooms.push(new Room('living', '8', '11'), new Room('kitchen', '12', '12'), new Room('bed', '12', '9'), new Room('bed', '10', '10'), new Room('bed', '15', '20'));
      a3.rooms.push(new Room('bed', '15', '20'), new Room('living', '20', '20'));
      a1.renters.push(new Renter('Sue', '22', 'female', 'coder'), new Renter('Sue', '25', 'male', 'social worker'));
      a2.renters.push(new Renter('Diva', '56', 'female', 'movie star'));

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
    it('should tell wether rooms are available to rent', function(){
      expect(a2.isAvailable()).to.equal(true);
      expect(a1.isAvailable()).to.equal(false);
    });
  });

  describe('#purgeEvicted', function(){
    it('should evict people from apartment if no money', function(){
      a1.renters[1]._isEvicted = true;
      a2.renters[0]._isEvicted = false;
      a1.purgeEvicted();
      a2.purgeEvicted();
      expect(a1.renters).to.be.length(1);
      expect(a2.renters).to.be.length(1);
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
