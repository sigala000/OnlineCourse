/**
 * Search module.
 * Handles debounced live search against course titles.
 */

let searchQuery = '';

/**
 * Returns the current search query.
 * @returns {string}
 */
export function getSearchQuery() {
  return searchQuery;
}

/**
 * Sets the search query.
 * @param {string} query
 */
export function setSearchQuery(query) {
  searchQuery = query.trim().toLowerCase();
}

/**
 * Filters courses by the current search query (case-insensitive title match).
 * @param {Array<Object>} courses
 * @returns {Array<Object>}
 */
export function filterBySearch(courses) {
  if (!searchQuery) return courses;
  return courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery)
  );
}
