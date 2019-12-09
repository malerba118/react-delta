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

* **`callback`**: **required** a function that will execute if the condition is true. This callback can return a cleanup function.
* **`condition`**: **optional [default true]** a boolean indicating whether the effect should run. The effect callback executes when the condition is true.

### Usage

```jsx
import { useConditionalEffect } from 'react-delta'

const useEvenCountLogger = (count) => {

  useConditionalEffect(() => {
    console.log(count)
  }, count % 2 === 0) 

}
```

## License

MIT © [malerba118](https://github.com/malerba118)
