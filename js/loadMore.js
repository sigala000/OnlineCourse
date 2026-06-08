/**
 * Load More module.
 * Manages pagination by controlling how many cards are visible.
 */

const INITIAL_COUNT = 6;
const INCREMENT = 3;

let visibleCount = INITIAL_COUNT;

/**
 * Returns the current number of visible items.
 * @returns {number}
 */
export function getVisibleCount() {
  return visibleCount;
}

/**
 * Increments the visible count by the configured increment.
 */
export function loadMore() {
  visibleCount += INCREMENT;
}

/**
 * Resets visible count to the initial value.
 */
export function resetVisibleCount() {
  visibleCount = INITIAL_COUNT;
}

/**
 * Determines whether all items are currently visible.
 * @param {number} totalCount
 * @returns {boolean}
 */
export function allItemsVisible(totalCount) {
  return visibleCount >= totalCount;
}
