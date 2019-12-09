import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import useDelta from '../useDelta';

export default {
    title: 'useDelta'
};

export const PrimitiveState = () => {
    const [count, setCount] = useState(0);
    const [unrelatedState, setUnrelatedState] = useState(false);

    const countDelta = useDelta(count);

    useEffect(() => {
        action('Count delta')(countDelta);
    })

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>
            <button onClick={() => setUnrelatedState(p => !p)}>Toggle Unrelated State: {unrelatedState}</button>
        </div>
    )
};

export const ObjectStateShallow = () => {
    const [state, setState] = useState({ count: 0 });
    const [unrelatedState, setUnrelatedState] = useState(false);

    const countDelta = useDelta(state);

    useEffect(() => {
        action('Count delta')(countDelta);
    })

    return (
        <div>
            <button onClick={() => setState(s => ({count: s.count + 1}))}>Increment: {JSON.stringify(state)}</button>            
            <button onClick={() => setUnrelatedState(p => !p)}>Toggle Unrelated State: {unrelatedState}</button>
        </div>
    )
};


export const ObjectStateDeep = () => {
    const [state, setState] = useState({ count: 0 });
    const [unrelatedState, setUnrelatedState] = useState(false);

    const countDelta = useDelta(state, { deep: true });

    useEffect(() => {
        action('Count delta')(countDelta);
    })

    return (
        <div>
            <button onClick={() => setState(s => ({count: s.count + 1}))}>Increment: {JSON.stringify(state)}</button>            
            <button onClick={() => setUnrelatedState(p => !p)}>Toggle Unrelated State: {unrelatedState}</button>
        </div>
    )
};
