'use strict';

var cApt = global.mongodb.collection('apartments');
var _ = require('lodash');

function Apartment(unit){
  this.unit = unit;
  this.rooms = [];
  this.renters =[];
}

Apartment.prototype.area = function(){
   var sum = 0;
   for(var i = 0; i < this.rooms.length; i++){
    sum += this.rooms[i].area();
   }
   return sum;
};

Apartment.prototype.cost = function(){
   var sum = 0;
   for(var i = 0; i < this.rooms.length; i++){
    sum += this.rooms[i].cost();
   }
   return sum;
};
 
Apartment.prototype.bedrooms = function(){
  var count = 0;
  for(var i = 0; i <this.rooms.length; i++){
    if(this.rooms[i].name === 'bed'){
      count++;
    }
  }
  return count;
};

module.exports = Apartment;
