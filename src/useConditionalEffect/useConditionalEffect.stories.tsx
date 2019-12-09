import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import useConditionalEffect from './useConditionalEffect';
import useDelta from '../useDelta';

export default {
    title: 'useConditionalEffect'
};

export const PrimitiveState = () => {
    const [count, setCount] = useState(0);

    const countDelta = useDelta(count);

    useConditionalEffect(() => {
        action('count changed')(countDelta);
    }, Boolean(countDelta));

    return <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>;
};

export const ObjectState = () => {
    const [state, setState] = useState({ count: 0 });

    const countDelta = useDelta(state);

    useConditionalEffect(() => {
        action('count changed')(countDelta);
    }, Boolean(countDelta));

    return <button onClick={() => setState(s => ({count: s.count + 1}))}>Increment: {state.count}</button>;
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