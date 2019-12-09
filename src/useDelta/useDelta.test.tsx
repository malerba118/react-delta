import React from 'react';
import { mount } from 'enzyme';
import useDelta from './useDelta';

interface Props {
    obj: object;
    deep?: boolean;
    observer: Function;
}

const App = ({observer, obj, deep = false}: Props) => {

    const deltas = useDelta(obj, { deep });

    observer(deltas);

    return null;
};

const FIRST_RENDER_DELTA = {"curr": {"id": 123}};

describe('useDelta', () => {
  it('first render should have delta with no prev key', () => {
    const observer = jest.fn();
    mount(
        <App observer={observer} obj={{"id": 123}} />
    );

    const firstRenderDelta = observer.mock.calls[0][0];

    expect(firstRenderDelta).toEqual(FIRST_RENDER_DELTA);
  });

  it('second render should have deltas with curr and prev keys', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} />
    );

    const firstRenderDelta = observer.mock.calls[0][0];

    expect(firstRenderDelta).toEqual(FIRST_RENDER_DELTA);

    wrapper.setProps({obj: {"id": 234}});

    const secondRenderDelta = observer.mock.calls[1][0];

    expect(firstRenderDelta).toEqual(FIRST_RENDER_DELTA);
    expect(secondRenderDelta).toEqual({"curr": {"id": 234}, "prev": {"id": 123}});
  });

  it('second render delta should be null if value didnt change since first render', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} />
    );

    const firstRenderDelta = observer.mock.calls[0][0];

    expect(firstRenderDelta).toEqual(FIRST_RENDER_DELTA);

    wrapper.setProps({unrelatedProp: 1});

    const secondRenderDelta = observer.mock.calls[1][0];

    expect(firstRenderDelta).toEqual(FIRST_RENDER_DELTA);
    expect(secondRenderDelta).toEqual(null);
  });

  it('when not deep, delta should exist even if object is deeply equal', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} deep={false} />
    );

    const firstRenderDelta = observer.mock.calls[0][0];

    expect(firstRenderDelta).toEqual(FIRST_RENDER_DELTA);

    wrapper.setProps({obj: {"id": 123}});

    const secondRenderDelta = observer.mock.calls[1][0];

    expect(secondRenderDelta).toEqual({"curr": {"id": 123}, "prev": {"id": 123}});
  });

  it('when deep, delta should not exist if object is deeply equal', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} deep={true} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTA);

    wrapper.setProps({obj: {"id": 123}});

    const secondRenderDelta = observer.mock.calls[1][0];

    expect(secondRenderDelta).toEqual(null);
  });

  it('when deep, delta should exist if object is not deeply equal', () => {
    const observer = jest.fn();
    const wrapper = mount(
      <App observer={observer} obj={{"id": 123}} deep={true} />
    );

    const firstRenderDeltas = observer.mock.calls[0][0];

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTA);

    wrapper.setProps({obj: {"id": 234}});

    const secondRenderDeltas = observer.mock.calls[1][0];

    expect(secondRenderDeltas).toEqual({"curr": {"id": 234}, "prev": {"id": 123}});
  });
});
