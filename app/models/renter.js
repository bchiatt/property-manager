'use strict';

function Renter (name, age, gender, profession){
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.cash = Math.floor(Math.random()*4901)+100;
  this.isEvicted = false;
  this.profession = profession;
}

Renter.prototype.work = function(){
  var pay = Math.floor(Math.random()*200)+50;
  this.cash += pay;
};

Renter.prototype.payRent = function(payment){
  this.cash -= payment;
  if (this.cash < 0){
    this.isEvicted = true;
    this.cash = 0;
  }
};

Renter.prototype.party = function(){
  var intensity = Math.floor(Math.random()*10)+1;
  if (intensity > 8){
    console.log('you are a terrible person');
    this.isEvicted = true;
  }
};

module.exports = Renter;
