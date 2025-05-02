// Initialize the grid with 16 letters
let grid = [
    "a", "b", "c", "d",
    "e", "f", "g", "h",
    "i", "j", "k", "l",
    "m", "n", "o", "p"
  ];
  
  // Load the word list from a JSON file
  let validWords = [];
  
  fetch("words.json")
    .then(response => response.json())
    .then(data => {
      validWords = data.words;
      console.log("Word list loaded");
    })
    .catch(err => console.error("Failed to load word list", err));
  
  // Display the grid with uppercase letters
  function displayGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = '';
    grid.forEach(letter => {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.textContent = letter.toUpperCase(); // Display as CAPS
      gridContainer.appendChild(cell);
    });
  }
  
  // Validate if the word is valid and can be formed from the grid
  function isValidWord(word) {
    word = word.toLowerCase();
  
    if (!validWords.includes(word)) {
      return false;
    }
  
    let gridCopy = [...grid];
    for (let letter of word) {
      const index = gridCopy.indexOf(letter);
      if (index === -1) return false;
      gridCopy.splice(index, 1);
    }
  
    return true;
  }
  
  // DOM Elements
  const submitButton = document.getElementById("submit-word");
  const wordInput = document.getElementById("word-input");
  const wordList = document.getElementById("word-list");
  const wordCount = document.getElementById("word-count");
  const customInput = document.getElementById("custom-input");
  const setGridButton = document.getElementById("set-grid");
  const randomizeButton = document.getElementById("randomize-grid");
  
  // Convert input to uppercase visually
  wordInput.addEventListener("input", () => {
    wordInput.value = wordInput.value.toUpperCase();
  });
  
  // Submit word handler
  submitButton.addEventListener("click", () => {
    const word = wordInput.value.trim();
    if (word && isValidWord(word)) {
      const li = document.createElement("li");
      li.textContent = word.toUpperCase(); // Show as CAPS
      wordList.insertBefore(li, wordList.firstChild); // Add at top
      wordInput.value = "";
      wordCount.textContent = wordList.children.length;
    } else {
      alert("Invalid word!");
    }
  });
  
  // Set custom grid
  setGridButton.addEventListener("click", () => {
    const customLetters = customInput.value.trim().toLowerCase();
    if (customLetters.length === 16) {
      grid = customLetters.split('');
      displayGrid();
      customInput.value = '';
    } else {
      alert("Please enter exactly 16 letters.");
    }
  });
  
  // Randomize grid
  function randomizeGrid() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomizedGrid = [];
  
    for (let i = 0; i < 16; i++) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      randomizedGrid.push(randomLetter);
    }
  
    grid = randomizedGrid;
    displayGrid();
  }
  
  randomizeButton.addEventListener("click", randomizeGrid);
  
  // Show initial grid
  displayGrid();
  