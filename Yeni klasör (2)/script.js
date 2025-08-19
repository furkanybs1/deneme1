// Simple stopword list for ignoring common words in suggestions
const stopwords = new Set([
  'the', 'and', 'a', 'an', 'of', 'to', 'in', 'for', 'with', 'on', 'at', 'by', 'it', 'is', 'this', 'that', 'from', 'are', 'be', 'your', 'you'
]);

// Basic synonym dictionary to enrich keyword suggestions
const synonymDict = {
  'nature': ['outdoors', 'landscape', 'scenery'],
  'sunset': ['dusk', 'twilight', 'evening sky'],
  'city': ['urban', 'metropolitan'],
  'relaxing': ['calming', 'soothing', 'peaceful'],
  'music': ['melody', 'soundtrack'],
  'ocean': ['sea', 'waves', 'beach'],
  'forest': ['woods', 'trees'],
  'mountain': ['hill', 'peak', 'alpine'],
  'travel': ['journey', 'trip', 'vacation'],
  'food': ['cuisine', 'cooking', 'culinary'],
  'technology': ['gadgets', 'innovation', 'tech']
};

// Generate keywords from the provided idea
function generateKeywords(text) {
  // Normalize text and split into words
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/);
  const keywords = new Set();
  words.forEach(word => {
    if (word.length > 2 && !stopwords.has(word)) {
      keywords.add(word);
      if (synonymDict[word]) {
        synonymDict[word].forEach(syn => keywords.add(syn));
      }
    }
  });
  // If no keywords detected, provide some generic suggestions
  if (keywords.size === 0) {
    return ['creative commons video', 'stock footage', 'royalty free video'];
  }
  return Array.from(keywords);
}

// Handle keyword generation and display
function handleGenerate() {
  const inputEl = document.getElementById('idea-input');
  const idea = inputEl.value.trim();
  const suggestionsSection = document.getElementById('suggestions-section');
  const keywordsList = document.getElementById('keywords-list');
  // Clear previous suggestions
  keywordsList.innerHTML = '';
  if (!idea) {
    alert('Please enter a description of your idea first.');
    suggestionsSection.classList.add('hidden');
    return;
  }
  const keywords = generateKeywords(idea);
  keywords.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    keywordsList.appendChild(li);
  });
  suggestionsSection.classList.remove('hidden');
}

// Handle file upload display
function handleFileUpload(event) {
  const files = event.target.files;
  const fileListEl = document.getElementById('file-list');
  fileListEl.innerHTML = '';
  if (files.length === 0) {
    fileListEl.textContent = 'No files selected.';
    return;
  }
  const list = document.createElement('ul');
  Array.from(files).forEach(file => {
    const item = document.createElement('li');
    item.className = 'file-item';
    const sizeKb = (file.size / 1024).toFixed(1);
    item.textContent = `${file.name} – ${sizeKb} KB`;
    list.appendChild(item);
  });
  fileListEl.appendChild(list);
}

// Register event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generate-btn').addEventListener('click', handleGenerate);
  document.getElementById('file-input').addEventListener('change', handleFileUpload);
});