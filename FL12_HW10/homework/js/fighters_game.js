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
        if( result ){
            defender.dealDamage(this.getDamage());
            console.log(`
                ${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}
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
        return this._wins++;
      }
    addLoss(){
        return this._losses++;
    }
}

function battle(fighter1,fighter2){
    const messageLosse = 'is dead and can\'t fight.';
    const messageWin = 'has won!'
    function endMessage(fighter,message){
        return console.log(`
            ${fighter.getName()} ${message}
        `);
    }

    let result = !fighter1.getHealth() || !fighter2.getHealth();
    if( result ){
        if ( !fighter1.getHealth() ){
            fighter1.addLoss();
            fighter2.addWin();
            endMessage(fighter1, messageLosse);
        }else{
            fighter2.addLoss();
            fighter1.addWin();
            endMessage(fighter2, messageLosse);
        }
    }
    while(!result){

        if( fighter1.getHealth() > 0 ){
            fighter1.attack(fighter2);
        }else{
            result = true;
            fighter1.addLoss();
            fighter2.addWin();
            return endMessage(fighter2,messageWin);
        }

        if( fighter2.getHealth() > 0 ){
            fighter2.attack(fighter1);
        }else{
            result = true;
            fighter2.addLoss();
            fighter1.addWin();
            return endMessage(fighter1,messageWin);
        }

    }
        
}