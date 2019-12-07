import React from 'react';
import { useConditionalEffect } from '../dist'

export default {
  title: 'test',
};

const App = () => {
  useConditionalEffect(() => {
    window.alert('hi')

    return () => {}
  })
  return <div>hi</div>
}

export const emoji = () => (
  <App />
);
