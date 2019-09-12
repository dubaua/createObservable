# createObservable

A little helper function provides reactive value and callbacks on change. Function accepts object with two optional parameters: `onChange` as callback after change and `inital` as inital value.

```js
function onChange(value, prevValue) {
  console.log(value, prevValue);
}

var reactive = createObservable({ onChange: onChange, initial: 0 });
```

Next, when you assign a new value to your reactive value, callback will be fired, if new value isn't equal to an old one:

```js
reactive.value = 35; // onChange fired (35, 0)
reactive.value = 35; // onChange isn't fired
reactive.value = 42; // onChange fired (42, 35)
```

Further you can add new callbacks, they all will be fired on value change.

```js
function anotherCallback(value, prevValue) {
  console.log(value * 2, prevValue * 2);
}
reactive.onChange = anotherCallback;
reactive.value = 20; // onChange fired, (20, 42) anotherCallback fired (40, 84)
```
