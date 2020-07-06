/**
 * Creates reactive object allowing set new value and subscribe to the value change.
 * If new value isn't equal to previous, each callback passed via subscribe method will be fired.
 * @class Observable
 */
class Observable {
  /** Internal value storage
   * @type {*}
   */
  internal;

  /** Array of callbacks
   * @type {Array<function>}
   */
  callbacks = [];

  /** Allows to set initial value
   * @param {*} initial
   */
  constructor(initial) {
    this.internal = initial;
  }

  /**
   * Higher order function acceping subscriber and returning unsubscriber
   * @param {function} callback a function accepting next and prev values
   * @returns {function} unsubscriber function stops firing callback
   */
  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[createObservable]: expected callback to be a function.');
    }
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      this.callbacks = this.callbacks.slice(0, index).concat(this.callbacks.slice(index + 1));
    };
  }

  get value() {
    return this.internal;
  }

  set value(next) {
    if (next !== this.internal) {
      const prev = this.internal;
      this.internal = next;
      for (let i = 0; i < this.callbacks.length; i++) {
        this.callbacks[i](this.internal, prev);
      }
    }
  }
}

export default Observable;
