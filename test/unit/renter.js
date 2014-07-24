/* jshint expr:true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Renter = require('../../app/models/renter.js');

describe('Renter', function(){
  describe('constructor', function(){
    it('should create a new renter', function(){
      var sue = new Renter('Sue', 22, 'female', 'waiter');
      expect(sue).to.be.instanceof(Renter);
      expect(sue.name).to.equal('Sue');
      expect(sue.age).to.equal(22);
      expect(sue.gender).to.equal('female');
      expect(sue._cash).to.be.within(100, 5000);
      expect(sue._isEvicted).to.equal(false);
      expect(sue.profession).to.equal('waiter');
    });
  });

  describe('#work', function(){
    it('should add a random amount of cash via job', function(){
      var sue = new Renter('Sue', '22', 'female', 'waiter');
      sue._cash = 500;

      sue.work();

      expect(sue._cash).to.be.within(550,750);
    });
  });

  describe('#payRent', function(){
    it('should subtract amount from cash and not evict', function(){
      var sue = new Renter('Sue', '22', 'female', 'waiter');
      sue._cash = 500;

      sue.payRent('450');

      expect(sue._cash).to.equal(50);
      expect(sue._isEvicted).to.equal(false);
    });
  });

  describe('#payRent', function(){
    it('should subtract amount from cash and evict', function(){
      var sue = new Renter('Sue', '22', 'female', 'waiter');
      sue._cash = 500;

      sue.payRent('550');

      expect(sue._cash).to.equal(0);
      expect(sue._isEvicted).to.equal(true);
    });
  });

  describe('#party', function(){
    it('should evicted if random number is greater than 8', function(){
      var sue = new Renter('Sue', 22, 'female', 'waiter');
      for(var i = 0; i <=20; i++){
        sue.party();
      }
      expect(sue._isEvicted).to.equal(true);
    });
  });
});
