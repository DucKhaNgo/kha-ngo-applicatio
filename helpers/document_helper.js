/**
 * Rename object's properties
 * @param {Object} keysMap map an object's property name to a new property name
 * @param {Object} obj original object
 * @returns {Object} transformed object
 */
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => {
      const newKey = keysMap[key] || key;
      acc[newKey] = obj[key];
      return acc;
    },
    {}
  );

/**
 * Sanitize a document and rename its properties, use this method before saving a document to DB
 * @param {Object} keysMap map a DB key name to an object's property name
 * @param {Object} obj original object
 * @returns {Object} sanitized document
 */
const sanitizeWithKeys = (keysMap, obj) =>
  Object.keys(keysMap).reduce(
    (acc, key) => {
      const oldKey = keysMap[key];
      if (oldKey && oldKey in obj) {
        acc[key] = obj[oldKey];
      }
      return acc;
    },
    {}
  );

module.exports = { renameKeys, sanitizeWithKeys };
