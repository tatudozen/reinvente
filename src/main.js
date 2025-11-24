import './style.css';
import { categories, quotes } from './data.js';
import { store } from './store.js';

// Initialize Store
store.init();

// DOM Elements
const app = document.getElementById('app');
const screens = {
  landing: document.getElementById('screen-landing'),
  selection: document.getElementById('screen-selection'),
  slider: document.getElementById('screen-slider'),
  card: document.getElementById('screen-card'),
  quote: document.getElementById('screen-quote')
};

const btnStart = document.getElementById('btn-start');
const wheelContainer = document.getElementById('wheel-container');
const sliderTrack = document.getElementById('slider-track');
const card = document.getElementById('active-card');
const cardQuestionText = document.getElementById('card-question-text');
const cardCategoryLabel = document.getElementById('card-category-label');
const cardCategoryLabelBack = document.getElementById('card-category-label-back');
const inputArea = document.getElementById('input-area');
const answerInput = document.getElementById('answer-input');
const btnNextCard = document.getElementById('btn-next-card');
const btnBackCard = document.getElementById('btn-back-card');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');

// State
let currentCategoryKey = null;
let currentQuestionIndex = 0;

// Navigation
function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
    setTimeout(() => {
      if (!screen.classList.contains('active')) screen.style.display = 'none';
    }, 500);
  });

  const target = screens[screenName];
  target.style.display = 'flex';
  // Force reflow
  void target.offsetWidth;
  target.classList.add('active');
}

// Wheel Generation
function createWheel() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 300 300");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.transform = "rotate(-162deg)"; // Start Curiosidade at Top Left (Reinvencao's spot)

  const categoryKeys = Object.keys(categories);
  const total = categoryKeys.length;
  const radius = 150;
  const center = 150;
  const textRadius = 110; // Radius for text path

  categoryKeys.forEach((key, index) => {
    const startAngle = (index * 360) / total;
    const endAngle = ((index + 1) * 360) / total;

    // Calculate path
    const x1 = center + radius * Math.cos(Math.PI * startAngle / 180);
    const y1 = center + radius * Math.sin(Math.PI * startAngle / 180);
    const x2 = center + radius * Math.cos(Math.PI * endAngle / 180);
    const y2 = center + radius * Math.sin(Math.PI * endAngle / 180);

    const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;

    // Group for segment
    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("class", "wheel-segment");
    g.addEventListener("click", () => selectCategory(key));

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathData);
    path.setAttribute("fill", categories[key].color);
    path.setAttribute("stroke", "white");
    path.setAttribute("stroke-width", "2");

    // Text Path
    // We need a path for the text to follow. It should be an arc in the middle of the segment.
    // To make text readable, we might need to reverse the path for the bottom half.
    // For simplicity in this MVP, we'll place text using transform/rotate which is easier to center.

    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const textX = center + textRadius * Math.cos(Math.PI * midAngle / 180);
    const textY = center + textRadius * Math.sin(Math.PI * midAngle / 180);

    // Calculate rotation for text to be readable
    let rotation = midAngle;
    if (midAngle > 90 && midAngle < 270) {
      rotation += 180;
    }

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", textX);
    text.setAttribute("y", textY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "14");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("font-family", "Outfit, sans-serif");
    text.setAttribute("transform", `rotate(${rotation}, ${textX}, ${textY}) rotate(90, ${textX}, ${textY})`); // Extra 90 because wheel is rotated -90
    text.textContent = categories[key].label;
    text.style.pointerEvents = "none";

    g.appendChild(path);
    g.appendChild(text);
    svg.appendChild(g);
  });

  wheelContainer.insertBefore(svg, wheelContainer.firstChild);
}

// Slider Logic
function setupSlider(key) {
  sliderTrack.innerHTML = ''; // Clear previous
  const category = categories[key];
  const questions = category.questions;

  // Create cards. To make it infinite, we need enough duplicates.
  // For a smooth infinite effect with CSS, we duplicate the set.
  const cardsToRender = [...questions, ...questions, ...questions, ...questions]; // 4x to be safe for width

  cardsToRender.forEach((q, index) => {
    // Map back to original index
    const originalIndex = index % questions.length;

    const cardEl = document.createElement('div');
    cardEl.className = 'slider-card';
    // Remove border color as we use image now
    // cardEl.style.borderColor = category.color;

    const img = document.createElement('img');
    img.src = category.image;
    img.className = 'slider-card-image';
    img.alt = category.label;

    const number = document.createElement('div');
    number.className = 'slider-card-number';
    number.textContent = originalIndex + 1;

    cardEl.appendChild(img);
    cardEl.appendChild(number);

    cardEl.addEventListener('click', () => {
      selectCard(key, originalIndex);
    });

    sliderTrack.appendChild(cardEl);
  });
}

function selectCategory(key) {
  currentCategoryKey = key;
  store.setCategory(key);

  // Show Quote Transition
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = `"${randomQuote.text}"`;
  quoteAuthor.textContent = randomQuote.author;

  showScreen('quote');

  setTimeout(() => {
    setupSlider(key);
    showScreen('slider');
  }, 3000); // 3 seconds reading time
}

function selectCard(key, index) {
  currentQuestionIndex = index;
  setupCard(key, index);
  showScreen('card');
}

function setupCard(key, index) {
  const category = categories[key];
  const question = category.questions[index];

  // Reset Card State
  card.classList.remove('is-flipped');
  inputArea.classList.remove('visible');
  answerInput.value = store.getAnswer(key, index);

  // Update Content Front - Now uses Image
  const cardFront = document.querySelector('.card-front');
  cardFront.innerHTML = ''; // Clear previous content

  const img = document.createElement('img');
  img.src = category.image;
  img.className = 'card-front-image';
  img.alt = category.label;

  const number = document.createElement('div');
  number.className = 'card-front-number';
  number.textContent = index + 1;

  const instruction = document.createElement('div');
  instruction.className = 'card-front-instruction';
  instruction.textContent = 'Toque para virar';

  cardFront.appendChild(img);
  cardFront.appendChild(number);
  cardFront.appendChild(instruction);

  // Update Content Back - New Design
  const cardBack = document.querySelector('.card-back');
  const cardBackHeader = document.getElementById('card-back-header');
  const cardBackFooter = document.getElementById('card-back-footer');

  cardBack.style.borderColor = category.color;

  cardBackHeader.textContent = category.label;
  cardBackHeader.style.color = category.color;

  cardBackFooter.style.backgroundColor = category.color;

  cardQuestionText.textContent = question;
}

// Event Listeners
btnStart.addEventListener('click', () => {
  showScreen('selection');
});

card.addEventListener('click', () => {
  card.classList.toggle('is-flipped');
  if (card.classList.contains('is-flipped')) {
    setTimeout(() => {
      inputArea.classList.add('visible');
    }, 500);
  }
});

btnNextCard.addEventListener('click', () => {
  // Save answer
  store.saveAnswer(currentCategoryKey, currentQuestionIndex, answerInput.value);

  // Go back to selection for MVP flow
  showScreen('selection');
});

btnBackCard.addEventListener('click', () => {
  showScreen('slider');
});

// Init
createWheel();
