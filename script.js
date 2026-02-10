// Quote database based on day sentiment
const quotes = {
  positive: [
    "Your positive energy is contagious! Keep shining! ✨",
    "You did amazing today! Be proud of yourself! 🌟",
    "What a fantastic day! You're crushing it! 💪",
    "Your smile today made someone's day better! 😊",
    "Keep up this amazing momentum! You're unstoppable! 🚀",
    "Today you were a beacon of positivity! 🌈",
    "Celebrate yourself - you earned it! 🎉",
    "Your effort today was truly inspiring! 👏"
  ],
  neutral: [
    "Every day is a new opportunity to grow! 🌱",
    "You made it through another day - that's an achievement! 💯",
    "Tomorrow brings new possibilities! 🌅",
    "Reflection is the first step to improvement! 🪞",
    "You're doing better than you think! 🎯",
    "Each day teaches us something valuable! 📚",
    "Progress is progress, no matter how small! 📈",
    "Rest well, you've earned it! 😴"
  ],
  negative: [
    "Tough days make us stronger! You've got this! 💪",
    "This too shall pass - brighter days are coming! 🌤️",
    "Be kind to yourself, you're doing your best! 💖",
    "Even on hard days, you're making a difference! ✨",
    "Tomorrow is a fresh start! ☀️",
    "Your resilience is your superpower! 🦸",
    "Struggle makes success sweeter! 🏆",
    "You're stronger than your challenges! 🔥"
  ]
};

// Keywords to detect sentiment
const positiveKeywords = [
  'great', 'amazing', 'wonderful', 'fantastic', 'excellent', 'good', 'happy', 'love', 'awesome',
  'perfect', 'beautiful', 'accomplished', 'proud', 'blessed', 'grateful', 'exciting', 'fun',
  'success', 'win', 'achieve', 'overcome', 'best', 'brilliant', 'delighted', 'joy'
];

const negativeKeywords = [
  'bad', 'terrible', 'awful', 'horrible', 'sad', 'angry', 'frustrated', 'tired', 'exhausted',
  'stressed', 'anxious', 'disappointed', 'failed', 'struggle', 'difficult', 'hard', 'sick',
  'worried', 'scared', 'lonely', 'upset', 'miserable', 'depressed', 'pain', 'hurt'
];

// Function to analyze sentiment
function analyzeSentiment(text) {
  const lowerText = text.toLowerCase();
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      positiveCount++;
    }
  });
  
  negativeKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      negativeCount++;
    }
  });
  
  if (positiveCount > negativeCount) {
    return 'positive';
  } else if (negativeCount > positiveCount) {
    return 'negative';
  } else {
    return 'neutral';
  }
}

// Function to get a random quote
function getRandomQuote(sentiment) {
  const quoteList = quotes[sentiment];
  return quoteList[Math.floor(Math.random() * quoteList.length)];
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const reflection = document.getElementById('reflection').value;
    
    if (reflection.trim() === '') {
      alert('Please share something about your day!');
      return;
    }
    
    const sentiment = analyzeSentiment(reflection);
    const quote = getRandomQuote(sentiment);
    
    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <div class="result-box">
        <h2>Your Daily Inspiration:</h2>
        <p class="quote">${quote}</p>
        <p class="sentiment">Your day was: <strong>${sentiment.toUpperCase()}</strong></p>
      </div>
    `;
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  });
});
