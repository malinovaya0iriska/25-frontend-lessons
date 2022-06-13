const BASE_URL = 'https://www.algoexpert.io/api/fe/glossary-suggestions';

let timerId;

const suggestionsList = document.getElementById('suggestions-list');
const input = document.getElementById('typeahead');
input.addEventListener('input', onType);

function onType() {
  if (input.value.length === 0) {
    clearSuggestions();
    return;
  }

  clearTimeout(timerId);
  timerId = setTimeout(fetchAndAppendSuggestions, 500);
}

async function fetchAndAppendSuggestions() {
  const url = new URL(BASE_URL);
  url.searchParams.set('text', input.value);
  const response = await fetch(url);
  const suggestions = await response.json();

  const fragment = document.createDocumentFragment();
  suggestions.forEach((suggestion) => {
    fragment.appendChild(createSuggestionsElement(suggestion));
  });
  suggestionsList.replaceChildren(fragment);
}

function createSuggestionsElement(suggestion) {
  const suggestionElement = document.createElement('li');
  suggestionElement.textContent = suggestion;
  suggestionElement.addEventListener('click', () => {
    input.value = suggestion;
    clearSuggestions();
  });
  return suggestionElement;
}

function clearSuggestions() {
  clearTimeout(timerId);
  suggestionsList.innerHTML = '';
}
