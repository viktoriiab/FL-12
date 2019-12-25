let game = {
    newGame : false,
    minOfRange : 0,
    maxOfRange : 8,
    numbRange : 0,
    attemptNumb : 3,
    attempts : {
        'prise1' : 100,
        'prise2' : 50,
        'prise3' : 25 
    },
    totalPrise : 0,
    currentNumber : null
}
let userNumber = null;

if ( window.confirm('Do you want to play a game?') ){
   game.newGame = true;
}else{
    alert('You did not become a billionaire, but can.');
}

while (game.newGame){
    game.currentNumber = Math.floor(Math.random() * (game.maxOfRange - game.minOfRange + game.numbRange + 1));
    console.log(game.currentNumber);
    getUserNumber:
    for (let i = 0; i < game.attemptNumb; i++){
        userNumber = prompt(`
            Choose a roulette pocket number from 0 to ${game.maxOfRange} \n
            Attempts left: ${game.attemptNumb - i} \n
            Total prize: ${game.totalPrise}$\n
            Possible prize on current attempts: ${game.attempts['prise'+ (i + 1)]}$
        `);

        if ( isNaN(userNumber) || userNumber === '' 
        || userNumber === 0 || !isFinite(userNumber) 
        || userNumber === null || userNumber > game.maxOfRange 
        || userNumber < game.minOfRange){
            alert(`Enter only number from 0 to ${game.maxOfRange} ! Try again.`);
            game.newGame = true;
            break getUserNumber;
        }else{
            game.newGame = false;
        }
    }
}
