/**
 * Create reactive observable object
 *
 * @param {function} didSet a function called after setting a new value
 * @param {any} initial initial value
 * @returns {object}
 *
 * @example
 *
 * @name createObservable
 * @function
 */
module.exports = function(didSet, initial) {
  return {
    internal: initial,
    callbacks: typeof didSet === 'function' ? [didSet] : [],

    get onChange() {
      return this.callbacks;
    },

    set onChange(didSet) {
      if (typeof didSet === 'function') {
        this.callbacks.push(didSet);
      } else {
        throw new Error('[createObservable] callback must be a function.');
      }
    },

    get value() {
      return this.internal;
    },

    set value(next) {
      if (next !== this.internal) {
        var prev = this.internal;
        this.internal = next;
        for (let i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i](this.internal, prev);
        }
      }
    },
  };
};
