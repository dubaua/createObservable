# createObservable

This is a little helper provides kinda reactive value in javascript. You call createObservable with two optional parameters. First as callback after change, second as inital value.

```js
function onChange(value, prevValue) {
  console.log(value, prevValue);
}

var reactive = createObservable(onChange, 0);
```

Next, when you assign new value to your reactive value, callback will be fired, if new value isn't equal to old one:

```js
reactive.value = 35; // onChange fired (35, 0)
reactive.value = 35; // onChange isn't fired
reactive.value = 42; // onChange fired (42, 35)
```

Also you can add new callbacks:

```js
function anotherCallback(value, prevValue) {
  console.log(value * 2, prevValue * 2);
}
reactive.onChange = anotherCallback;
reactive.value = 20; // onChange fired, (20, 42) anotherCallback fired (40, 84)
```
