'use strict';

var cApt = global.mongodb.collection('apartments');
var Renter = require('./renter.js');
var Room = require('./room.js');
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

var convertApartment = function(apts){
  for(var i = 0; i < apts.length; i++){
    apts[i] = _.create(Apartment.prototype, apts[i]);

    apts[i].rooms[0] = _.create(Room.prototype, apts[i].rooms[0]);

    for(var x = 0; x < apts[i].rooms.length; x++){
      apts[i].rooms[x] = _.create(Room.prototype, apts[i].rooms[x]);
    }
  
    for(var z = 0; z < apts[i].renters.length; z++){
      apts[i].renters[z] = _.create(Renter.prototype, apts[i].renters[z]);
    }
  }
};
 
Apartment.area = function(cb){
  var area = 0;
  Apartment.find({}, function(apts){
    convertApartment(apts);

    for(var i = 0; i < apts.length; i++){
      for(var j = 0; j < apts[i].rooms.length; j++){
        area += apts[i].rooms[j].area();
      }
    }
    cb(area);
  });
};

Apartment.cost = function(cb){
  var cost = 0;
  Apartment.find({}, function(apts){
    convertApartment(apts);

    for(var i = 0; i < apts.length; i++){
      for(var j = 0; j < apts[i].rooms.length; j++){
        cost += apts[i].rooms[j].cost();
      }
    }
    cb(cost);
  });
};

Apartment.tenets = function(cb){
  var tenets = 0;
  Apartment.find({}, function(apts){
    convertApartment(apts);

    for(var i = 0; i < apts.length; i++){
      tenets += apts[i].renters.length;
    }

    cb(tenets);
  });
};

Apartment.revenue = function(cb){
  var revenue = 0;
  Apartment.find({}, function(apts){
    convertApartment(apts);

    for(var i = 0; i < apts.length; i++){
      if(apts[i].renters.length > 0){
        for(var j = 0; j < apts[i].rooms.length; j++){
          revenue += apts[i].rooms[j].cost();
        }
      }
    }

    cb(revenue);
  });
};

module.exports = Apartment;
