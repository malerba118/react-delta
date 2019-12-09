import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import useConditionalEffect from './useConditionalEffect';

export default {
    title: 'useConditionalEffect'
};

export const NoEffectIfFalse = () => {
    const [count, setCount] = useState(0);

    useConditionalEffect(() => {
        action('effect triggered')();
    }, false);

    return <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>;
};

export const EffectOnEvens = () => {
    const [count, setCount] = useState(0);

    useConditionalEffect(() => {
        action('effect triggered')(count);
    }, count % 2 === 0);

    return <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>;
};

export const AlwaysEffectIfTrue = () => {
    const [count, setCount] = useState(0);

    useConditionalEffect(() => {
        action('effect triggered')(count);
    }, true);

    return <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>;
};