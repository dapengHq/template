
/**
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path: string): Boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};