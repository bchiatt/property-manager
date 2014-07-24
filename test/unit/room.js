/* jshint expr:true */
/* global describe, it */

'use strict';

var Room = require('../../app/models/room.js');
var expect = require('chai').expect;

describe('Room', function(){
  describe('constructor', function(){
    it('should create a new room', function(){
      var bedroom = new Room('Bed', '8', '11');

      expect(bedroom).to.be.instanceof(Room);
      expect(bedroom.name).to.equal('Bed');
      expect(bedroom.width).to.equal(8);
      expect(bedroom.length).to.equal(11);
    });
  });
  
  describe('#area', function(){
    it('should calculate the area of a room', function(){
      var bedroom = new Room('Bed', '8', '11');

      bedroom.area();

      expect(bedroom.area()).to.equal(88);
    });
  });
});
