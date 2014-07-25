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

Apartment.prototype.isAvailable = function(){
  var count = this.bedrooms() - this.renters.length;
  if (count > 0){
    return true;
  }else{
    return false;
  }
};

Apartment.prototype.purgeEvicted = function(){
  for(var i = 0; i < this.renters.length; i++){
    if(this.renters[i]._isEvicted === true){
      this.renters.splice(i, 1);
    }
  }
};

Apartment.prototype.collectRent = function(){
  
};

module.exports = Apartment;
