# Observable

A little class providing reactive value and subscribe method. The method is a higher order function accepting callback as the only parameter and returning unsubscribe function. A callback accepts next value as first parameter and previous value as second. Callback will be fired if instance value is changed.

```js
const observable = new Observable();

const log = [];
function logger(next) {
  log.push(next);
}

const stopLogging = observable.subscribe(logger);
```

When instance value changed callback will be fired:

```js
reactive.value = 35; // log [35]
reactive.value = 35; // log [35] didn't logged, because value the same
reactive.value = 42; // log [35, 42]
```

You can unsubscribe with function returned by `subscribe` method.

```js
stopLogging();
reactive.value = 69; // log [35, 42]
```
