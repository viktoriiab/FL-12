const hundred = 100;
class Fighter {

    constructor(prop) {
        this._prop = prop;
        this._wins = 0;
        this._losses = 0;
        this._totalHP = prop.hp;
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
    attack(defender){
        let result = false;
        let success = Math.floor( Math.random() * hundred ) + 1;
        let probability = hundred - ( defender.getStrength() + defender.getAgility() );
        if ( success <= probability ){
            result = true;
        }
        console.log(success);
        console.log(probability);
        console.log(result);
        if( result ){
            defender.dealDamage(this.getDamage());
            console.log(`
                ${this.getName()} make ${this.getDamage()} damage to ${defender.getName()}
            `);
        }else{
            console.log(`
                ${this.getName()} attack missed
            `);
        }
    }
    dealDamage(points){
        let result = this.getHealth() - points;
        if( result < 0 ){
            this._prop.hp = 0;
        }else{
            this._prop.hp = result;
        }
    }
    logCombatHistory(){
        console.log(`
            Name: ${this.getName()}, Wins: ${this._wins}, Losses: ${this._losses} 
        `);
    }
    heal(points){
        let result = this.getHealth() + points;
        if( result > this._totalHP ){
            this._prop.hp = this._totalHP;
        }else{
            this._prop.hp = result;
        }
    }
    addWin(){
        return this._wins + 1;
      }
    addLoss(){
        return this._losses + 1;
    }
}

const fighter1 = new Fighter({name: 'Maximus', damage: 20, strength: 20, agility: 15, hp: 100});
const fighter2 = new Fighter({name: 'Commodus', damage: 25, strength: 25, agility: 20, hp: 90});


fighter1.attack(fighter2);
fighter2.attack(fighter1);
fighter2.logCombatHistory();
fighter2.heal(10);