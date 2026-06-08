/**
 * Render module.
 * Handles DOM rendering for course cards, filter buttons, and empty states.
 */

import { categories } from './data.js';

const GRID_SELECTOR = '[data-courses-grid]';
const FILTERS_SELECTOR = '[data-filters]';
const EMPTY_STATE_SELECTOR = '[data-empty-state]';

/**
 * Generates the CSS modifier class for a category badge.
 * @param {string} category
 * @returns {string}
 */
function getBadgeClass(category) {
  const map = {
    Marketing: 'course-card__badge--marketing',
    Management: 'course-card__badge--management',
    'HR & Recruiting': 'course-card__badge--hr-recruiting',
    Design: 'course-card__badge--design',
    Development: 'course-card__badge--development',
  };
  return map[category] || '';
}

/**
 * Creates a single course card DOM element.
 * @param {Object} course
 * @returns {HTMLElement}
 */
function createCourseCard(course) {
  const article = document.createElement('article');
  article.className = 'course-card';
  article.innerHTML = `
    <div class="course-card__image-wrapper">
      <img
        class="course-card__image"
        src="${course.image}"
        alt="${course.title} course cover"
        loading="lazy"
        width="400"
        height="250"
      />
    </div>
    <div class="course-card__content">
      <span class="course-card__badge ${getBadgeClass(course.category)}">
        ${course.category}
      </span>
      <h3 class="course-card__title">${course.title}</h3>
      <div class="course-card__meta">
        <span class="course-card__price">$${course.price}</span>
        <span class="course-card__divider" aria-hidden="true"></span>
        <span class="course-card__author">by ${course.author}</span>
      </div>
    </div>
  `;

  return article;
}

/**
 * Renders a list of courses into the grid.
 * @param {Array<Object>} coursesToRender
 */
export function renderCourses(coursesToRender) {
  const grid = document.querySelector(GRID_SELECTOR);
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  coursesToRender.forEach((course) => {
    fragment.appendChild(createCourseCard(course));
  });

  grid.innerHTML = '';
  grid.appendChild(fragment);
}

/**
 * Renders filter buttons with dynamic counts.
 * @param {Array<Object>} allCourses
 * @param {string} activeCategory
 * @param {function} onFilterClick
 */
export function renderFilters(allCourses, activeCategory, onFilterClick) {
  const container = document.querySelector(FILTERS_SELECTOR);
  if (!container) return;

  const fragment = document.createDocumentFragment();

  categories.forEach((category) => {
    const count =
      category === 'All'
        ? allCourses.length
        : allCourses.filter((c) => c.category === category).length;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filters__button ${
      category === activeCategory ? 'filters__button--active' : ''
    }`;
    button.setAttribute('data-category', category);
    button.setAttribute('aria-pressed', category === activeCategory ? 'true' : 'false');

    button.innerHTML = `
      ${category}
      <sup class="filters__count" aria-label="${count} courses">${count}</sup>
    `;

    button.addEventListener('click', () => onFilterClick(category));

    fragment.appendChild(button);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
}

/**
 * Toggles the empty state visibility.
 * @param {boolean} isVisible
 */
export function toggleEmptyState(isVisible) {
  const emptyState = document.querySelector(EMPTY_STATE_SELECTOR);
  if (!emptyState) return;

  if (isVisible) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }
}
