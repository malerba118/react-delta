# react-delta

> Toolbelt for more flexible effects in react

[![NPM](https://img.shields.io/npm/v/react-delta.svg)](https://www.npmjs.com/package/react-delta) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-delta
```

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


### `useDelta(value, options)`

Determines the delta of `value` between the current and the previous render.

#### Signature
```tsx
useDelta<T>(value: T): Nullable<Delta<T>>;
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
