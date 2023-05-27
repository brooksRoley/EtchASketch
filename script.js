// JavaScript code
const container = document.querySelector('.container');
const resetButton = document.querySelector('#resetButton');

let gridSize = 16;

function createGrid(size) {
  gridSize = size;
  container.style.setProperty('--grid-size', size);
  container.innerHTML = '';

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = 'rgb(255, 255, 255)';
    square.addEventListener('mouseover', changeColor);
    container.appendChild(square);
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function changeColor(event) {
  const square = event.target;
  const currentColor = square.style.backgroundColor;

  if (currentColor === 'rgb(0, 0, 0)') {
    return; // Square is already black, do nothing
  }
  if (currentColor === 'rgb(255, 255, 255)') {
    square.style.backgroundColor = getRandomColor();
    return;
  }
  let rgbValues = currentColor.match(/\d+/g).map(Number);
  const blackValue = Math.floor(rgbValues[0] * 0.1);

  rgbValues[0] = Math.max(rgbValues[0] - blackValue, 0);
  rgbValues[1] = Math.max(rgbValues[1] - blackValue, 0);
  rgbValues[2] = Math.max(rgbValues[2] - blackValue, 0);

  square.style.backgroundColor = `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
}

function resetGrid() {
  const size = prompt('Enter the number of squares per side (maximum 100):');
  const newGridSize = parseInt(size);

  if (newGridSize && newGridSize <= 100) {
    createGrid(newGridSize);
  } else {
    alert('Invalid input! Please enter a number between 1 and 100.');
  }
}

resetButton.addEventListener('click', resetGrid);

createGrid(gridSize);
