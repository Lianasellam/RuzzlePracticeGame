// Initialize the grid with 16 letters
let grid = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"
];

// Load the word list from the JSON file
let validWords = [];

fetch('words.json')
    .then(response => response.json())
    .then(data => {
        validWords = data.words;
        console.log('Word list loaded');
    })
    .catch(err => console.error('Failed to load word list', err));

// Display the grid
function displayGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    grid.forEach(letter => {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.textContent = letter;
        gridContainer.appendChild(cell);
    });
}

// Validate if the word is valid and can be formed from the grid
function isValidWord(word) {
    // Convert word to lowercase
    word = word.toLowerCase();

    // Check if the word is in the valid words list
    if (!validWords.includes(word)) {
        return false;
    }

    // Check if every letter in the word exists in the grid (and respect frequency)
    let gridCopy = [...grid];  // Copy the grid so we don't modify the original
    for (let letter of word) {
        const index = gridCopy.indexOf(letter);
        if (index === -1) {
            // If the letter isn't in the grid, return false
            return false;
        }
        // Remove the letter from gridCopy to account for letter frequency
        gridCopy.splice(index, 1);
    }

    return true;
}

// Handle word submission
const submitButton = document.getElementById('submit-word');
const wordInput = document.getElementById('word-input');
const wordList = document.getElementById('word-list');

submitButton.addEventListener('click', () => {
    const word = wordInput.value.trim();
    if (word && isValidWord(word)) {
        const li = document.createElement('li');
        li.textContent = word;
        wordList.appendChild(li);
        wordInput.value = '';  // Clear input field
    } else {
        alert("Invalid word!");
    }
});

// Handle the custom grid setup
const customInput = document.getElementById('custom-input');
const setGridButton = document.getElementById('set-grid');

setGridButton.addEventListener('click', () => {
    const customLetters = customInput.value.trim().toLowerCase();
    if (customLetters.length === 16) {
        grid = customLetters.split('');
        displayGrid();
        customInput.value = '';  // Clear input field after setting the grid
    } else {
        alert("Please enter exactly 16 letters.");
    }
});

// Function to generate a randomized grid
function randomizeGrid() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'; // All lowercase letters
    const randomizedGrid = [];
    
    for (let i = 0; i < 16; i++) {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        randomizedGrid.push(randomLetter);
    }

    grid = randomizedGrid;  // Update the grid with randomized letters
    displayGrid();  // Update the displayed grid
}

// Handle the randomize grid button
const randomizeButton = document.getElementById('randomize-grid');

randomizeButton.addEventListener('click', () => {
    randomizeGrid();  // Call function to randomize and update the grid
});

// Display the initial grid
displayGrid();

