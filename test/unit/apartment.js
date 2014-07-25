/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Room = require('../../app/models/room.js');
var Renter = require('../../app/models/renter.js');
var Apartment;
var cApt;
var a1, a2, a3;

describe('Apartment', function(){
  before(function(done){
    connect('property-manager-test', function(){
      Apartment = require('../../app/models/apartment.js');
      cApt = global.mongodb.collection('apartments');
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
    it('should calculate payment amount and subtract from renters ', function(){
      a2.renters[0]._cash = 2000;
      a1.renters[0]._cash = 2000;
      a1.renters[1]._cash = 2000;
      a1.collectRent();
      a2.collectRent();
      expect(a2.renters).to.have.length(0);
      expect(a1.renters).to.have.length(2);
      expect(a1.renters[0]._cash).to.equal(352.50);
    });
  });

  describe('#save', function(){
    it('should save apartment to mongodb collection', function(done){
      a1.save(function(){
        expect(a1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.find', function(){
    it('should find all the apartments', function(done){
      a1.save(function(){
        a2.save(function(){
          Apartment.find({}, function(apts){
            expect(apts).to.have.length(2);
            done();
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find specific item by mongo ID', function(done){
      a1.save(function(){
        a2.save(function(){
          Apartment.findById(a1._id, function(apt){
            expect(apt).to.be.instanceof(Apartment);
            expect(apt.unit).to.equal('A1');
            done();
          });
        });
      });
    });
  });

  describe('deleteById', function(){
    it('should delete a specific apt by it\'s id', function(done){
      a1.save(function(){
        a2.save(function(){
          Apartment.deleteById(a1._id, function(){
            Apartment.find({}, function(apts){
              expect(apts).to.have.length(1);
              expect(apts[0].unit).to.equal('A2');
              done();
            });
          });
        });
      });
    });
  });

  describe('area', function(){
    it('should calculate the area of the apt complex ', function(done){
      a1.save(function(){
        a2.save(function(){
          Apartment.area(function(value){
            expect(value).to.equal(1399);

            done();
          });
        });
      });
    });
  });

  describe('cost', function(){
    it('should return the total cost of the apt complex', function(done){

      done();
    });
  });

  describe('tenets', function(){
    it('should return the number of tenets in the apt complex', function(done){

      done();
    });
  });

  describe('revenue', function(){
    it('should return the revenue for any apt that has a renter', function(done){

      done();
    });
  });
});
