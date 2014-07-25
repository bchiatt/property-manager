'use strict';

function Renter (name, age, gender, profession){
  this.name = name;
  this.age = parseInt(age);
  this.gender = gender;
  this.profession = profession;
  this._cash = Math.floor(Math.random()*4901)+100;
  this._isEvicted = false;
}

Renter.prototype.work = function(){
  switch(this.profession){
    case 'movie star':
      this._cash += Math.floor(Math.random()*7001)+3000;
      break;
    case 'coder':
      this._cash += Math.floor(Math.random()*6001)+1000;
      break;
    case 'waiter':
      this._cash += Math.floor(Math.random()*201)+50;
      break;
    case 'social worker':
      this._cash += Math.floor(Math.random()*601)+150;
      break;
  }
};

Renter.prototype.payRent = function(payment){
  if(this._isEvicted){return;}

  parseInt(payment);

  this._isEvicted = this._cash < payment;

  if(!this._isEvicted){
  this._cash -= payment;
  }
};

Renter.prototype.party = function(){
  if(this.isEvicted){return;}

  var intensity = Math.floor(Math.random()*10)+1;
  if (intensity > 8){
    console.log('you are a terrible person');
    this._isEvicted = true;
  }
};

module.exports = Renter;
