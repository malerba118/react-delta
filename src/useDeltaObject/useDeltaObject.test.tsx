import React from 'react';
import { mount } from 'enzyme';
import useDeltaObject from './useDeltaObject';

interface Props {
    obj: object;
    deep?: boolean;
    observer: Function;
}

const App = ({observer, obj, deep = false}: Props) => {

    const deltas = useDeltaObject({ obj }, { deep });

    observer(deltas);

    return null;
};

const FIRST_RENDER_DELTAS = { obj: {"curr": {"id": 123} } };

describe('useDeltaObject', () => {
  it('first render should have deltas with no prev key', () => {
    const observer = jest.fn();
    mount(
        <App observer={observer} obj={{"id": 123}} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);
  });

  it('second render should have deltas with curr and prev keys', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);

    wrapper.setProps({obj: {"id": 123}});

    const secondRenderDeltas = observer.mock.calls[1][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);
    expect(secondRenderDeltas).toEqual({"obj": {"curr": {"id": 123}, "prev": {"id": 123}}});
  });

  it('second render deltas should be null if values didnt change since first render', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);

    wrapper.setProps({unrelatedProp: 1});

    const secondRenderDeltas = observer.mock.calls[1][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);
    expect(secondRenderDeltas).toEqual({ obj: null });
  });

  it('when not deep, delta should exist even if object is deeply equal', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);

    wrapper.setProps({obj: {"id": 123}});

    const secondRenderDeltas = observer.mock.calls[1][0];

    expect(secondRenderDeltas).toEqual({obj: {"curr": {"id": 123}, "prev": {"id": 123}}});
  });

  it('when deep, delta should not exist if object is deeply equal', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} deep={true} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);

    wrapper.setProps({obj: {"id": 123}});

    const secondRenderDeltas = observer.mock.calls[1][0];

    expect(secondRenderDeltas).toEqual({ obj: null });
  });

  it('when deep, delta should exist if object is not deeply equal', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} deep={true} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS);

    wrapper.setProps({obj: {"id": 234}});

    const secondRenderDeltas = observer.mock.calls[1][0];

    expect(secondRenderDeltas).toEqual({obj:{"curr": {"id": 234}, "prev": {"id": 123}}});
  });
});
