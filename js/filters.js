/**
 * Filters module.
 * Manages active category state and applies category filtering to courses.
 */

let activeCategory = 'All';

/**
 * Returns the current active category.
 * @returns {string}
 */
export function getActiveCategory() {
  return activeCategory;
}

/**
 * Sets the active category.
 * @param {string} category
 */
export function setActiveCategory(category) {
  activeCategory = category;
}

/**
 * Filters courses by the active category.
 * @param {Array<Object>} courses
 * @returns {Array<Object>}
 */
export function filterByCategory(courses) {
  if (activeCategory === 'All') return courses;
  return courses.filter((course) => course.category === activeCategory);
}
