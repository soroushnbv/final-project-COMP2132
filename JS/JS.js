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
function rollDice() {
    const playerRoll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    const computerRoll = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

    // Update dice images
    const playerDice1Path = `images/dice-${playerRoll[0]}.png`;
    const playerDice2Path = `images/dice-${playerRoll[1]}.png`;
    const computerDice1Path = `images/dice-${computerRoll[0]}.png`;
    const computerDice2Path = `images/dice-${computerRoll[1]}.png`;

    document.getElementById('player-dice-1').src = playerDice1Path;
    document.getElementById('player-dice-2').src = playerDice2Path;
    document.getElementById('computer-dice-1').src = computerDice1Path;
    document.getElementById('computer-dice-2').src = computerDice2Path;

    // Log rolls and paths for debugging
    console.log('Player Roll:', playerRoll, 'Image Paths:', playerDice1Path, playerDice2Path);
    console.log('Computer Roll:', computerRoll, 'Image Paths:', computerDice1Path, computerDice2Path);

    const playerScoreRound = calculateScore(playerRoll);
    const computerScoreRound = calculateScore(computerRoll);

    // Update round score display
    document.getElementById('player-round-score').textContent = playerScoreRound;
    document.getElementById('computer-round-score').textContent = computerScoreRound;

    // Update total scores
    playerScore += playerScoreRound;
    computerScore += computerScoreRound;
    document.getElementById('player-total-score').textContent = playerScore;
    document.getElementById('computer-total-score').textContent = computerScore;

    // Update round number
    document.getElementById('round-number').textContent = round;

    // Check for winner after 3 rounds
    if (round >= 3) {
        setTimeout(() => {
            document.getElementById('roll-btn').disabled = true;
            document.getElementById('winner').style.display = 'block';
            
            const result = playerScore > computerScore ? 'Player Wins!' : 'Computer Wins!';
            document.getElementById('game-result').textContent = result;

            // Fade-in animation for the winner message
            document.getElementById('winner').classList.add('fade-in');
            
            // Pop-up JavaScript message after 3rd round
            setTimeout(() => {
                alert(result + "\nPlayer Score: " + playerScore + "\nComputer Score: " + computerScore);
            }, 500);

            document.getElementById('reset-btn').style.display = 'inline-block';
        }, 500);
    } else {
        round++;
    }
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

    document.getElementById('winner').style.display = 'none';
    document.getElementById('roll-btn').disabled = false;
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('player-dice-1').src = 'images/dice-1.png';
    document.getElementById('player-dice-2').src = 'images/dice-1.png';
    document.getElementById('computer-dice-1').src = 'images/dice-1.png';
    document.getElementById('computer-dice-2').src = 'images/dice-1.png';
}

document.getElementById('roll-btn').addEventListener('click', rollDice);
document.getElementById('reset-btn').addEventListener('click', resetGame);
