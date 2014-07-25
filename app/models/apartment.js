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
  var payment = this.cost()/this.renters.length;
  
  for(var i = 0; i < this.renters.length; i++){
    this.renters[i].payRent(payment);
  }

  this.purgeEvicted();
};

Apartment.prototype.save = function(cb){
  cApt.save(this, function(err, obj){
    cb();
  });
};

Apartment.find = function(query, cb){
  cApt.find(query).toArray(function(err, apts){
    cb(apts);
  });
};

Apartment.findById = function(query, cb){
  query = {_id:query};
  cApt.findOne(query, function(err, apt){
    apt = _.create(Apartment.prototype, apt);
    cb(apt);
  });
};

Apartment.deleteById = function(query, cb){
  query = {_id:query};
  cApt.remove(query, function(){
    cb();
  });
};

module.exports = Apartment;
