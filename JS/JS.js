let playerScore = 0;
let computerScore = 0;
let round = 1;

function calculateScore(roll) {
    const [die1, die2] = roll;
    if (die1 === 1 || die2 === 1) {
        return 0;
    }
    if (die1 === die2) {
        return (die1 + die2) * 2;
    }
    return die1 + die2;
}

function rollDiceAnimation(diceElement, finalImage) {
    let count = 0;
    const interval = setInterval(() => {
        const randomDice = Math.ceil(Math.random() * 6);
        diceElement.src = `images/dice-${randomDice}.png`;
        count++;
        if (count > 10) {
            clearInterval(interval);
            diceElement.src = finalImage;
        }
    }, 50);
}

function rollDice() {
    const playerRoll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    const computerRoll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

    rollDiceAnimation(document.getElementById('player-dice-1'), `images/dice-${playerRoll[0]}.png`);
    rollDiceAnimation(document.getElementById('player-dice-2'), `images/dice-${playerRoll[1]}.png`);
    rollDiceAnimation(document.getElementById('computer-dice-1'), `images/dice-${computerRoll[0]}.png`);
    rollDiceAnimation(document.getElementById('computer-dice-2'), `images/dice-${computerRoll[1]}.png`);

    setTimeout(() => {
        const playerScoreRound = calculateScore(playerRoll);
        const computerScoreRound = calculateScore(computerRoll);

        document.getElementById('player-round-score').textContent = playerScoreRound;
        document.getElementById('computer-round-score').textContent = computerScoreRound;

        playerScore += playerScoreRound;
        computerScore += computerScoreRound;
        document.getElementById('player-total-score').textContent = playerScore;
        document.getElementById('computer-total-score').textContent = computerScore;

        document.getElementById('round-number').textContent = round;

        if (round >= 3) {
            document.getElementById('roll-btn').disabled = true;
            document.getElementById('winner').style.opacity = "1";

            const result = playerScore > computerScore ? 'Player Wins!' : 'Computer Wins!';
            document.getElementById('game-result').textContent = result;
            setTimeout(() => {
                alert(`Game Over! ${result}\n\nFinal Scores:\nPlayer: ${playerScore}\nComputer: ${computerScore}`);
            }, 500);
            
            document.getElementById('reset-btn').style.display = 'inline-block';
        } else {
            round++;
        }
    }, 600);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;

    document.getElementById('player-round-score').textContent = 0;
    document.getElementById('computer-round-score').textContent = 0;
    document.getElementById('player-total-score').textContent = 0;
    document.getElementById('computer-total-score').textContent = 0;
    document.getElementById('round-number').textContent = round;

    document.getElementById('winner').style.opacity = "0";
    document.getElementById('roll-btn').disabled = false;
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('player-dice-1').src = 'images/dice-1.png';
    document.getElementById('player-dice-2').src = 'images/dice-1.png';
    document.getElementById('computer-dice-1').src = 'images/dice-1.png';
    document.getElementById('computer-dice-2').src = 'images/dice-1.png';
}

document.getElementById('roll-btn').addEventListener('click', rollDice);
document.getElementById('reset-btn').addEventListener('click', resetGame);
