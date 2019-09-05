var assert = require('assert');
var createObservable = require('../index.js');

describe('createObservable', function() {
  describe('returns an object with internal, callbacks, onChange and value properties', function() {
    var observable = createObservable();

    it('returns type of object', function() {
      assert.strictEqual(typeof observable === 'object', true);
    });

    it('has internal property', function() {
      assert.strictEqual(observable.hasOwnProperty('internal'), true);
    });

    it('has callbacks property', function() {
      assert.strictEqual(observable.hasOwnProperty('callbacks'), true);
    });

    it('has onChange property', function() {
      assert.strictEqual(observable.hasOwnProperty('onChange'), true);
    });

    it('has value property', function() {
      assert.strictEqual(observable.hasOwnProperty('value'), true);
    });
  });

  describe('correctly process arguments', function() {
    var initial = 42;

    var callback = function(value) {
      return value;
    };

    var observable = createObservable(callback, 42);
    it('first argument passed pushed into callback array if it is a function', function() {
      assert.strictEqual(observable.callbacks.indexOf(callback) !== -1, true);
    });

    it('second argument passed as initial value', function() {
      assert.strictEqual(observable.value === initial, true);
    });

    var emptyObservable = createObservable();
    it('if no callback passed, callbacks is an empty array', function() {
      var isEmptyArray = Array.isArray(emptyObservable.callbacks) && emptyObservable.callbacks.length === 0;
      assert.strictEqual(isEmptyArray, true);
    });
  });

  describe('correctly process changing value and adding new callbacks', function() {
    var track = 0;
    var counter = 0;
    var setTrackToSquaredObservableAndIncrementCounter = function(number) {
      track = number * number;
      counter++;
    };

    var observable = createObservable(setTrackToSquaredObservableAndIncrementCounter);

    it('fires callback after changing value', function() {
      observable.value = 2;
      assert.strictEqual(track === 4 && counter === 1, true);
    });

    it('does not fires callback if next value equal to previous', function() {
      observable.value = 2;
      assert.strictEqual(track === 4 && counter === 1, true);
    });

    it('fire callback if next value is not equal to previous', function() {
      observable.value = 3;
      assert.strictEqual(track === 9 && counter === 2, true);
    });

    var log = [];
    var addToLog = function(next) {
      log.push(next);
    };
    it('correctly adding new callback', function() {
      observable.onChange = addToLog;
      assert.strictEqual(observable.callbacks.indexOf(addToLog) !== -1, true);
    });

    it('correctly process new callback and old callback', function() {
      var nextValue = 4;
      observable.value = nextValue;
      var bothCallBackFired = log.indexOf(nextValue) !== -1 && track === 16 && counter === 3;
      assert.strictEqual(bothCallBackFired, true);
    });

    it('throws an error on trying add non function as callback', function() {
      assert.throws(function() {
        observable.onChange = null;
      });
    });

    var currentAndPrev = null;
    var getPrevAndCurrent = function(current, prev) {
      currentAndPrev = {
        current: current,
        prev: prev,
      };
    };

    it('correctly pass prev value as second callback argument', function() {
      var nextValue = 9;
      var prevValue = observable.value;
      observable.onChange = getPrevAndCurrent;
      observable.value = nextValue;
      var bothCurrentAndPrevUpdated = currentAndPrev.prev === prevValue && currentAndPrev.current === nextValue;
      assert.strictEqual(bothCurrentAndPrevUpdated, true);
    })
  });

  describe('correctly getting values', function() {
    var callback = function(value) {
      return value;
    };
    var observable = createObservable(callback);

    var nextValue = 16;
    observable.value = nextValue;
    it('return proper value on get value', function() {
      assert.strictEqual(observable.value === nextValue, true);
    });

    it('return proper value on get onChange', function() {
      var onChange = observable.onChange;
      var isEqualCallbackArray = Array.isArray(onChange) && onChange.length === 1 && onChange[0] === callback;
      assert.strictEqual(isEqualCallbackArray, true);
    });
  });
});
