// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = "mongodb+srv://root:root@cluster0.8ft6z9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define MongoDB Schema
const GameSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    maxPlayers: Number,
    players: [{ name: String, hand: [String] }], // Array of objects with name and hand properties
    started: Boolean,
    deck: [String],
    discardPile: [String],
    currentPlayer: String
});


const Game = mongoose.model('Game', GameSchema);

// Generate a unique 8-digit code for the game room
function generateUniqueCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Route to create a new game room with a unique code
app.post('/api/games/create', async (req, res) => {
    const { maxPlayers, hostName } = req.body;
    const code = generateUniqueCode();

    const game = new Game({
        code: code,
        maxPlayers: maxPlayers,
        players: [{ name: hostName, hand: [] }],
        started: false,
        deck: [], // Initialize empty deck
        discardPile: [], // Initialize empty discard pile
        currentPlayer: '' // Initialize currentPlayer
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Route to join a game room using the unique code and player's name
app.post('/api/games/join', async (req, res) => {
    const { code, playerName } = req.body;

    try {
        // Check if the playerName field is provided in the request body
        if (!playerName) {
            return res.status(400).json({ message: 'Player name is required' });
        }

        // Find the game room with the provided code
        const game = await Game.findOne({ code: code });
        if (!game) {
            return res.status(404).json({ message: 'Game room not found' });
        }

        // Check if the game has already started
        if (game.started) {
            return res.status(400).json({ message: 'Game has already started' });
        }

        // Check if the provided player name is unique in the game
        if (game.players.some(player => player.name === playerName)) {
            return res.status(400).json({ message: 'Player name is already taken' });
        }

        // Add the player to the game
        game.players.push({ name: playerName, hand: [] });

        // Save the updated game state
        const updatedGame = await game.save();
        
        // Send the updated game state back to the client
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Route to start the game
app.post('/api/games/:id/start', async (req, res) => {
    const gameId = req.params.id;

    try {
        let game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        if (game.players.length < 2) {
            return res.status(400).json({ message: 'Minimum 2 players required to start the game' });
        }

        if (game.started) {
            return res.status(400).json({ message: 'Game already started' });
        }

        // Shuffle deck
        let deck = shuffleDeck(getPredefinedDeck());

        // Deal cards to each player
        const numberOfCardsPerPlayer = 7;
        const players = game.players;
        for (let i = 0; i < players.length; i++) {
            game.players[i].hand = dealCards(deck, numberOfCardsPerPlayer);
        }

        // Set up discard pile
        const topCardOfDiscardPile = drawCard(deck);
        game.discardPile.push(topCardOfDiscardPile);

        // Set currentPlayer to a random player
        const randomIndex = Math.floor(Math.random() * game.players.length);
        game.currentPlayer = game.players[randomIndex].name;

        // Update game state
        game.deck = deck;
        game.started = true;

        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Function to deal cards from the deck
function dealCards(deck, numberOfCards) {
    const hand = [];
    for (let i = 0; i < numberOfCards; i++) {
        hand.push(drawCard(deck));
    }
    return hand;
}

// Function to draw a card from the deck
function drawCard(deck) {
    return deck.pop();
}

// Function to get a predefined UNO deck
function getPredefinedDeck() {
    const colors = ['Red', 'Blue', 'Green', 'Yellow'];
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const specialCards = ['Reverse', 'Skip', 'Draw Two'];

    let deck = [];

    // Add number cards for each color
    for (let color of colors) {
        for (let number of numbers) {
            deck.push(`${color} ${number}`);
            if (number !== '0') {
                deck.push(`${color} ${number}`);
            }
        }
    }

    // Add special cards (Reverse, Skip, Draw Two) for each color
    for (let color of colors) {
        for (let card of specialCards) {
            deck.push(`${color} ${card}`);
            deck.push(`${color} ${card}`);
        }
    }

    // Add Wild and Wild Draw Four cards
    for (let i = 0; i < 4; i++) {
        deck.push('Wild');
        deck.push('Wild Draw Four');
    }

    return deck;
}

// Route to play a card
app.post('/api/games/:id/play', async (req, res) => {
    const gameId = req.params.id;
    const { playerName, playedCard } = req.body;

    try {
        let game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        if (!game.started) {
            return res.status(400).json({ message: 'Game has not started yet' });
        }

        if (game.currentPlayer !== playerName) {
            return res.status(400).json({ message: 'It is not your turn' });
        }

        // Check if the played card is valid
        if (!isValidCard(playedCard, game.discardPile)) {
            return res.status(400).json({ message: 'Invalid card' });
        }

        // Remove the played card from the player's hand
        const playerIndex = game.players.findIndex(player => player.name === playerName);
        const cardIndex = game.players[playerIndex].hand.findIndex(card => card === playedCard);
        if (cardIndex === -1) {
            return res.status(400).json({ message: 'Card not found in player\'s hand' });
        }
        game.players[playerIndex].hand.splice(cardIndex, 1);

        // Update discard pile
        game.discardPile.push(playedCard);

        // Update current player (rotate players)
        game.currentPlayer = game.players[(playerIndex + 1) % game.players.length].name;

        // Check if player has won
        if (game.players[playerIndex].hand.length === 0) {
            game.winner = playerName;
            game.started = false;
        }

        if (game.players[playerIndex].hand.length === 0) {
            game.winner = playerName;
            game.started = false;
    
            // Calculate scores
            const scores = calculateScores(game);
            game.scores = scores;
    
            // Check for overall winner
            if (checkOverallWinner(scores)) {
                game.overallWinner = getOverallWinner(scores);
            }
        }


        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to draw a card
app.post('/api/games/:id/draw', async (req, res) => {
    const gameId = req.params.id;
    const { playerName } = req.body;

    try {
        let game = await Game.findById(gameId);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        if (!game.started) {
            return res.status(400).json({ message: 'Game has not started yet' });
        }

        if (game.currentPlayer !== playerName) {
            return res.status(400).json({ message: 'It is not your turn' });
        }

        // Draw a card from the deck
        if (game.deck.length === 0) {
            return res.status(400).json({ message: 'Draw pile is empty' });
        }
        const drawnCard = drawCard(game.deck);

        // Check if the drawn card is playable
        if (isValidCard(drawnCard, game.discardPile)) {
            // Add drawn card to player's hand
            const playerIndex = game.players.findIndex(player => player.name === playerName);
            game.players[playerIndex].hand.push(drawnCard);

            // Update current player (do not rotate players)
            const updatedGame = await game.save();
            res.json(updatedGame);
        } else {
            // Add drawn card to discard pile
            game.discardPile.push(drawnCard);

            // Update current player (rotate players)
            const playerIndex = game.players.findIndex(player => player.name === playerName);
            game.currentPlayer = game.players[(playerIndex + 1) % game.players.length].name;

            const updatedGame = await game.save();
            res.json(updatedGame);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Function to check if a card is valid to play
function isValidCard(card, discardPile) {
    const topCard = discardPile[discardPile.length - 1];
    const [topColor, topValue] = topCard.split(' ');

    const [color, value] = card.split(' ');

    return color === topColor || value === topValue || card.startsWith('Wild');
}

function calculateScores(game) {
    const scores = {};
    for (let player of game.players) {
        let score = 0;
        for (let card of player.hand) {
            const value = card.split(' ')[1];
            if (!isNaN(value)) {
                score += parseInt(value);
            } else {
                switch (value) {
                    case 'Draw': // Draw 2, Reverse, Skip
                    case 'Reverse':
                    case 'Skip':
                        score += 20;
                        break;
                    case 'Wild': // Wild, Wild Draw Four
                    case 'Wild Draw':
                        score += 50;
                        break;
                }
            }
        }
        scores[player.name] = score;
    }
    return scores;
}

// Function to check for overall winner
function checkOverallWinner(scores) {
    for (let player in scores) {
        if (scores[player] >= 500) {
            return true;
        }
    }
    return false;
}

// Function to get overall winner
function getOverallWinner(scores) {
    let winner = null;
    let minScore = Infinity;
    for (let player in scores) {
        if (scores[player] < minScore) {
            minScore = scores[player];
            winner = player;
        }
    }
    return winner;
}
// Other routes for gameplay (play card, draw card, etc.)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
