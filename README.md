# createObservable

This is a little helper provides kinda reactive value in javascript. You call createObservable with two optional parameters. First as callback after change, second as inital value.

```js
function onChange(value) {
  console.log(value);
}

var reactive = createObservable(onChange);
```

Next, when you assign new value to your reactive value, callback will be fired, if new value isn't equal to old one:

```js
reactive.value = 35; // onChange fired
reactive.value = 35; // onChange isn't fired
reactive.value = 42; // onChange fired
```

Also you can add new callbacks:

```js
function anotherCallback(value) {
  console.log(value * 2);
}
reactive.onChange = anotherCallback;
reactive.value = 20; // onChange fired, anotherCallback fired
```

# TODO

[x] Accept either array of callbacks or callback function;
[ ] callback accept both next and prev value
[ ] store previous values
[ ] emit message with next value rather than fire callback