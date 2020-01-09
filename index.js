/**
 * Create reactive observable object
 *
 * @param {any} options.initial initial value
 * @param {function} options.onChange a function called after setting a new value
 * @returns {object}
 *
 * @example
 *
 * @name createObservable
 * @function
 */
module.exports = function(options) {
  var initial = options && options.hasOwnProperty('initial') ? options.initial : undefined;
  var onChange = options && options.hasOwnProperty('onChange') ? options.onChange : undefined;

  return {
    internal: initial,
    callbacks: typeof onChange === 'function' ? [onChange] : [],

    get onChange() {
      return this.callbacks;
    },

    set onChange(callback) {
      if (typeof callback === 'function') {
        this.callbacks.push(callback);
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
        for (var i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i](this.internal, prev);
        }
      }
    },
  };
};
