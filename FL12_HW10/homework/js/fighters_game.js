class Fighter {

    constructor(prop) {
      this._prop = prop;
    }
    getName(){
        return this._prop.name;
    }
    getDamage(){
        return this._prop.damage;
    }
    getStrength(){
        return this._prop.strength;
    }
    getAgility(){
        return this._prop.agility;
    }
    getHealth(){
        return this._prop.hp;
    }
}

const fighter1 = new Fighter({name: 'Maximus', damage: 20, strength: 20, agility: 15, hp: 100});
const fighter2 = new Fighter({name: 'Commodus', damage: 25, strength: 25, agility: 20, hp: 90});
let name1 = fighter1.getName();
console.log(name1); 
let name2 = fighter2.getName();
console.log(name2); 
let hp1 = fighter1.hp;
console.log(hp1); 
