const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials';
const PAGE_SIZE = 5;

let afterId = null;
let canFetchMore = true;

const container = document.getElementById('container');

container.addEventListener('mousewheel', handleScroll);

fetchAndAppendTestimonials();

function handleScroll() {
  if (!canFetchMore) {
    return;
  }

  const bottomSpaceLeftToScroll =
    this.scrollHeight - this.scrollTop - this.clientHeight;

  if (bottomSpaceLeftToScroll > 0) {
    return;
  }

  fetchAndAppendTestimonials();
}

async function fetchAndAppendTestimonials() {
  canFetchMore = false;
  const url = createTestimonialUrl();
  const response = await fetch(url);

  const { testimonials, hasNext } = await response.json();

  const fragment = document.createDocumentFragment();
  testimonials.forEach(({ message }) => {
    fragment.appendChild(createTestimonialElement(message));
  });

  container.appendChild(fragment);

  if (hasNext) {
    afterId = testimonials[testimonials.length - 1].id;
  } else {
    container.removeEventListener('mousewheel', handleScroll);
  }

  canFetchMore = true;
}

function createTestimonialElement(message) {
  const testimonialElement = document.createElement('p');
  testimonialElement.classList.add('testimonial');
  testimonialElement.textContent = message;

  return testimonialElement;
}

function createTestimonialUrl() {
  const url = new URL(API_BASE_URL);
  url.searchParams.set('limit', PAGE_SIZE);

  if (afterId != null) {
    url.searchParams.set('after', afterId);
  }

  return url;
}
