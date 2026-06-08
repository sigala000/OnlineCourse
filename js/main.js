/**
 * Main entry point.
 * Orcheates rendering, filtering, search, and load-more functionality.
 */

import { courses } from './data.js';
import { renderCourses, renderFilters, toggleEmptyState } from './render.js';
import {
  getActiveCategory,
  setActiveCategory,
  filterByCategory,
} from './filters.js';
import { getSearchQuery, setSearchQuery, filterBySearch } from './search.js';
import {
  getVisibleCount,
  loadMore,
  resetVisibleCount,
  allItemsVisible,
} from './loadMore.js';

const SEARCH_INPUT_SELECTOR = '[data-search-input]';
const LOAD_MORE_BUTTON_SELECTOR = '[data-load-more]';

/**
 * Combines category and search filtering, then slices by visible count.
 * @returns {Array<Object>}
 */
function getFilteredAndSlicedCourses() {
  let result = filterByCategory(courses);
  result = filterBySearch(result);
  return result.slice(0, getVisibleCount());
}

/**
 * Updates the visibility of the Load More button.
 * @param {number} totalFilteredCount
 */
function updateLoadMoreButton(totalFilteredCount) {
  const button = document.querySelector(LOAD_MORE_BUTTON_SELECTOR);
  if (!button) return;

  if (allItemsVisible(totalFilteredCount)) {
    button.hidden = true;
  } else {
    button.hidden = false;
  }
}

/**
 * Main render cycle: updates filters, courses, empty state, and load-more button.
 */
function refreshUI() {
  const filtered = filterByCategory(courses);
  const totalFilteredCount = filterBySearch(filtered).length;
  const sliced = getFilteredAndSlicedCourses();

  renderFilters(courses, getActiveCategory(), handleFilterClick);
  renderCourses(sliced);
  toggleEmptyState(totalFilteredCount === 0);
  updateLoadMoreButton(totalFilteredCount);
}

/**
 * Handles category filter clicks.
 * @param {string} category
 */
function handleFilterClick(category) {
  if (category === getActiveCategory()) return;

  setActiveCategory(category);
  resetVisibleCount();
  refreshUI();
}

/**
 * Handles search input with debounce.
 */
function initSearch() {
  const input = document.querySelector(SEARCH_INPUT_SELECTOR);
  if (!input) return;

  let debounceTimer;

  input.addEventListener('input', (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setSearchQuery(event.target.value);
      resetVisibleCount();
      refreshUI();
    }, 200);
  });
}

/**
 * Handles Load More button clicks.
 */
function initLoadMore() {
  const button = document.querySelector(LOAD_MORE_BUTTON_SELECTOR);
  if (!button) return;

  button.addEventListener('click', () => {
    loadMore();
    refreshUI();
  });
}

/**
 * Initializes the application.
 */
function init() {
  refreshUI();
  initSearch();
  initLoadMore();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
