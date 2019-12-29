const numb2 = 2;
let game = {
    newGame : false,
    minOfRange : 0,
    maxOfRange : 8,
    numbRange : 0,
    attemptNumb : 3
}
let gamePrise = {
    firstPrise : 100,
    secondPrise : 50,
    thirdPrise : 25,
    totalPrise : 0
}
let prises = [gamePrise.firstPrise,gamePrise.secondPrise,gamePrise.thirdPrise];
let currentNumber = null;
let userNumber = null;

if ( window.confirm('Do you want to play a game?') ){
   game.newGame = true;
}else{
    alert('You did not become a billionaire, but can.');
}

while (game.newGame){
    currentNumber = Math.floor(Math.random() * (game.maxOfRange + game.numbRange + 1));
    getUserNumber:
    for (let i = 0; i < game.attemptNumb; i++){
        userNumber = prompt(`
            Choose a roulette pocket number from 0 to ${game.maxOfRange + game.numbRange}
            Attempts left: ${game.attemptNumb - i} 
            Total prize: ${gamePrise.totalPrise}$
            Possible prize on current attempts: ${prises[i]}$
        `);

        if ( isNaN(userNumber) || userNumber === '' 
        || userNumber === 0 || !isFinite(userNumber) 
        || userNumber === null ){
            alert('Use ONLY number next time!');
            break getUserNumber;
        }else{
            if( userNumber > game.maxOfRange + game.numbRange || userNumber < game.minOfRange ){
                 alert(`Enter only number from 0 to ${game.maxOfRange + game.numbRange} ! Try again.`);
                 break getUserNumber;
            }

            if( Number(userNumber) === currentNumber){
                gamePrise.totalPrise += prises[i];
                if ( window.confirm(`
                    Congratulations, you won!
                    Your prize is: ${prises[i]}$. Do you want to continue?
                `) ){
                    game.numbRange += 4;
                    for (let j = 0; j < prises.length; j++) {
                        prises[j] += prises[j];
                    }
                    break getUserNumber;
                 }else{
                     alert(`Thank you for your participation.
                        Your prize is: ${gamePrise.totalPrise}$`);
                    if ( window.confirm('Do you want to play a game again?') ){
                        break getUserNumber;
                     }else{
                        game.newGame = false;
                        break getUserNumber;
                     }
                }
            }else{
                 if( i === game.attemptNumb - 1 ){
                     alert(`Thank you for your participation. 
                     Your prize is: ${gamePrise.totalPrise}$`);
                     if ( window.confirm('Do you want to play a game again?') ){
                        gamePrise.totalPrise = 0;
                        game.numbRange = 0;
                        prises[0] = 100;
                        for (let j = 1; j < prises.length; j++) {
                            prises[j] = prises[j - 1]/ numb2;
                        }
                        break getUserNumber;
                     }else{
                        game.newGame = false;
                        break getUserNumber;
                     }
                 }
            }
            
        }
    }
}
