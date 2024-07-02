
class Card {
    constructor(emoji) {
        this.emoji = emoji;
        this.faceDown = false;
        this.done = false;
    }
}

class Player {
    constructor(num) {
        this.num = num;
        this.score = 0;
    }
}

class Game {
    constructor() {
        this.deck = [];
        this.message = document.getElementById('message')
        this.flippedCards = [];
        this.players = [new Player(1),new Player(2)];
        this.currentPlayer = 1;
        this.initGame();
    }

    initGame() {
        let emojis = ['🌊','🐺','🔥','🕷️','🐍','😇']

        for (let emoji of emojis) {
            this.deck.push(new Card(emoji),new Card(emoji))
        }

        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }

        this.message.innerText = 'You have 5 seconds to memorize these cards';

        this.drawCards();

        setTimeout(() => {
            for (let card of this.deck) {
                card.faceDown = true;
            }
            this.drawCards();
            this.message.innerText = `Player ${this.currentPlayer} flip 2 cards`
        }, 1000)

    }

    drawCards() {
        const table = document.getElementById('table');
        table.innerHTML = '';

        for (let cardObj of this.deck) {
            let card = document.createElement('div');
            if (cardObj.faceDown) {
                card.setAttribute('class','card faceDown')
                card.addEventListener('click',() => {
                    this.flipCard(cardObj)
                })
            } else {
                let face = document.createElement('h2');
                face.innerText = cardObj.emoji;
                card.setAttribute('class','card');
                card.append(face);
            }
            if (cardObj.done) {
                card.style.display = 'hidden';
            }
            table.append(card);
        }

        for (let player of this.players) {
            let scoreSpan = document.getElementById(`p${player.num}Score`)

            console.log(scoreSpan);

            scoreSpan.innerText = player.score;
        }

    }

    flipCard(card) {

        if (this.flippedCards.length < 2) {
            card.faceDown = false;
            this.flippedCards.push(card);
            this.drawCards();
        }

        if (this.flippedCards.length === 2) {

            let card1 = this.flippedCards[0];
            let card2 = this.flippedCards[1];

            if (card1.emoji === card2.emoji) {
                this.message.innerText = 'You got a match!'

                this.players[this.currentPlayer - 1].score++;

                for (let card of this.flippedCards) {
                    card.done = true;
                }

                
                // update the message on the game
                // calculate points
            } else {
                for (let card of this.flippedCards) {
                    card.faceDown = true;
                }
                this.message.innerText = 'No match!';
            }
            
            if (this.currentPlayer === 1) {
                this.currentPlayer = 2;
            } else {
                this.currentPlayer = 1
            }
            this.flippedCards = [];

            setTimeout(() => {
                this.drawCards();
                this.message.innerText = `It is now Player ${this.currentPlayer}'s turn!`
            },2000)





        }


    }

}

let game = new Game();

console.log(game)
