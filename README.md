# react-delta

> Toolbelt for more flexible effects in react

[![NPM](https://img.shields.io/npm/v/react-delta.svg)](https://www.npmjs.com/package/react-delta) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-delta
```

## Overview
If you've used `useEffect` in your day-to-day, you've surely found yourself in tricky situations. For example, maybe you've wanted access to a value from a previous render to know *how* a variable has changed since the last render and not just that it *has* changed. Or maybe the linter has yelled at you to include all dependencies in the `useEffect` dependency array, but doing so would cause your effect to run too frequently. Or maybe you've wanted to use deep equality to trigger an effect instead of shallow equality. Or maybe you've had to store values in refs in order to access the latest value inside of `useEffect`. The problem with `useEffect` is that it limits your ability to compare old values to new values. `react-delta` gives you delta utilities to determine exactly when and how variables have changed across renders as well as the ability to run effects based on these deltas.

## Scenario One
You want to log when the window width has increased and when it has decreased. Below we see how we might approach this problem traditionally, and how we can better approach it using `react-delta`.

### Gross Solution
```jsx
function LogWindowGrowth() {
  const { width } = useWindowSize();
  const prevWidth = useRef();

  useEffect(() => {
    if (prevWidth.current && width != prevWidth.current) {
      if (width < prevWidth.current) {
        console.log("Window got narrower");
      } else {
        console.log("Window got wider");
      }
    }
  }, [prevWidth.current, width]);

  useEffect(() => {
    prevWidth.current = width;
  }, [width]);

  return null;
}
```

### Cool Solution
```jsx
function LogWindowGrowth() {
  const { width } = useWindowSize();
  const delta = useDelta(width)

  useEffect(() => {
    if (delta && delta.prev) {
      if (delta.prev < delta.curr) {
        console.log("Window got narrower");
      } else {
        console.log("Window got wider");
      }
    }
  });

  return null;
}
```

### Alternate Cool Solution

```jsx
function LogWindowGrowth() {
  const { width } = useWindowSize();
  const prevWidth = usePrevious(width);

  useEffect(() => {
    if (prevWidth) {
      if (width < prevWidth) {
        console.log("Window got narrower");
      } else {
        console.log("Window got wider");
      }
    }
  });

  return null;
}
```


### Anotha Alternate Cool Solution
```jsx
function LogWindowGrowth() {
  const { width } = useWindowSize();
  const delta = useDelta(width);

  useConditionalEffect(() => {
    console.log("Window got narrower");
  }, delta && delta.prev && delta.curr < delta.prev);

  useConditionalEffect(() => {
    console.log("Window got wider");
  }, delta && delta.prev && delta.curr > delta.prev);

  return null;
}
```

## Scenario Two
You want to log only when *both* width and height of the window have changed, but not if only one has changed.

### Dope Solution
```jsx
function LogWindowGrowth() {
  const { width, height } = useWindowSize();
  const deltas = useDeltaArray([width, height]);

  useConditionalEffect(() => {
    console.log("Window width and height changed simultaneously");
  }, every(deltas));

  return null;
}
```

## Demos

### usePrevious
![usePrevious-demo](https://user-images.githubusercontent.com/5760059/70490266-9214c100-1ac3-11ea-874b-eedf2dd48561.gif)

### useDelta
![useDelta-demo](https://user-images.githubusercontent.com/5760059/70490276-99d46580-1ac3-11ea-8fa6-ceccf813286a.gif)

### useDeltaObject
![useDeltaObject-demo](https://user-images.githubusercontent.com/5760059/70490318-b7093400-1ac3-11ea-9b3f-0656bf5056a6.gif)

### useDeltaArray
![useDeltaArray-demo](https://user-images.githubusercontent.com/5760059/70490371-c5575000-1ac3-11ea-9674-70393b5a243a.gif)


## API

### `useConditionalEffect(callback, condition)`

Runs an effect when the condition is true. If the effect returns a cleanup function, the cleanup function will run before the next effect.

#### Signature
```tsx
useConditionalEffect(callback: ConditionalEffectCallback, condition?: boolean): void;
```

#### Parameters

* **`callback`**: **required** - a function that will execute if the condition is true. This callback can return a cleanup function.
* **`condition`**: **optional [default true]** - a boolean indicating whether the effect should run. The effect callback executes when the condition is true.

#### Returns
This method has no return value.

#### Usage

```jsx
import { useConditionalEffect } from 'react-delta'

const useEvenCountLogger = (count) => {

  useConditionalEffect(() => {
    console.log(count)
  }, count % 2 === 0) 

}
```

### `usePrevious(value, options)`

Gets the value of the observed variable from the previous render.

#### Signature
```tsx
usePrevious<T>(value: T): Optional<T>;
```

#### Parameters

* **`value`**: **required** - a value to watch across renders.

#### Returns
The value passed to this hook during the previous render or undefined (if the first render).

#### Usage

```jsx
import { usePrevious } from 'react-delta';

function useLogWindowGrowth() {
  const { width } = useWindowSize();
  const prevWidth = usePrevious(width);

  useEffect(() => {
    if (prevWidth && prevWidth !== width) {
      if (width < prevWidth) {
        console.log("Window got narrower");
      } else {
        console.log("Window got wider");
      }
    }
  });
}
```


### `useDelta(value, options)`

Determines the delta of `value` between the current and the previous render.

#### Signature
```tsx
useDelta<T>(value: T, options: Options): Nullable<Delta<T>>;
```

#### Parameters

* **`value`**: **required** - a value to watch across renders.
* **`options`**: **optional [default { deep: false }]**
  - **`deep`**: a boolean indicating whether to use deep equality when comparing current value to previous value.

#### Returns
If the watched value has changed between the current and the previous render, a delta object is returned. If nothing has changed, then `null` is returned.


#### Usage

```jsx
import { useDelta, useConditionalEffect } from 'react-delta'

const useFetch = (url) => {
    const delta = useDelta(url)

    useConditionalEffect(() => {
        fetch(url)
    }, !!delta)
}
```

### `useDeltaObject(obj, options)`

Determines the deltas of the values of the passed object. This is useful for watching many values at once. For example, you could use this hook to find the deltas of all props.

#### Signature
```tsx
useDeltaObject<T extends {}>(obj: T, options: Options): DeltaObject<T>;
```

#### Parameters

* **`obj`**: **required** - an object whose values will be watched across renders.
* **`options`**: **optional [default { deep: false }]**
  - **`deep`**: a boolean indicating whether to use deep equality when comparing current values to previous values.

#### Returns
An object with the same keys as the passed object, but whose values represent the deltas of the passed object's values.


#### Usage

```jsx
import { useDeltaObject, some, useConditionalEffect } from 'react-delta'

const LogPropsOnChange = (props) => {
    const deltas = useDeltaObject(props)

    useConditionalEffect(() => {
        console.log('At least one prop changed')
    }, some(Object.values(deltas)))
    
    return null
}
```


### `useDeltaArray(array, options)`

Determines the deltas of the values of the passed object. This is useful for watching many values at once.

#### Signature
```tsx
useDeltaArray<T extends any[]>(array: T, options: Options): DeltaArray<T>;
```

#### Parameters

* **`obj`**: **required** - an object whose values will be watched across renders.
* **`options`**: **optional [default { deep: false }]**
  - **`deep`**: a boolean indicating whether to use deep equality when comparing current values to previous values.

#### Returns
An array with the same length as the passed array, but whose values represent the deltas of the passed arrays's values.


#### Usage

```jsx
import { useDeltaArray, some, useConditionalEffect } from 'react-delta'

const FooFetcher = ({page, search}) => {
    const [pageDelta, searchDelta] = useDeltaArray([page, search])

    useConditionalEffect(() => {
        fetch(`http://foo.com?search=${search}&page=${page}`)
    }, some([pageDelta, searchDelta]))
    
    return null
}
```

### Types

### `Delta`
```ts
interface Delta<T> {
    prev?: T;
    curr: T;
}
```

### `DeltaArray`
```ts
type DeltaArray<T extends any[]> = {
    [k in keyof T]: Nullable<Delta<T[k]>>
}
```

### `DeltaObject`
```ts
type DeltaObject<T extends {}> = {
    [k in keyof T]: Nullable<Delta<T[k]>>
}
```

### `ConditionalEffectCallback`
```ts
type ConditionalEffectCallback = () => CleanupCallback | void
```

### `CleanupCallback`
```ts
type CleanupCallback = () => void
```

### `Nullable`
```ts
type Nullable<T> = T | null;
```

### `Optional`
```ts
type Optional<T> = T | undefined;
```

## License

MIT © [malerba118](https://github.com/malerba118)
