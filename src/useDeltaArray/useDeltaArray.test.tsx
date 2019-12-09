import React from 'react'
import { mount } from 'enzyme'
import useDeltaArray from './useDeltaArray'

interface Props {
    count: number
    obj: object
    deep?: boolean
    observer: Function
}

const App = ({observer, count, obj, deep = false}: Props) => {

    let deltas = useDeltaArray([count, obj], { deep })

    observer(deltas)

    return null
}

const FIRST_RENDER_DELTAS = [{"curr": 0}, {"curr": {"id": 123}}]

describe('useDeltaArray', () => {
  it('first render should have deltas with no prev key', () => {
    let observer = jest.fn()
    mount(
        <App observer={observer} count={0} obj={{"id": 123}} />
    )

    const firstRenderCounts = observer.mock.calls[0][0]

    expect(firstRenderCounts).toEqual(FIRST_RENDER_DELTAS)
  })

  it('second render should have deltas with curr and prev keys', () => {
    let observer = jest.fn()
    const wrapper = mount(
      <App observer={observer} count={0} obj={{"id": 123}} />
    )

    const firstRenderDeltas = observer.mock.calls[0][0]

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS)

    wrapper.setProps({count: 1})

    const secondRenderDeltas = observer.mock.calls[1][0]

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS)
    expect(secondRenderDeltas).toEqual([{"curr": 1, "prev": 0}, null])
  })

  it('second render deltas should be null if values didnt change since first render', () => {
    let observer = jest.fn()
    const wrapper = mount(
      <App observer={observer} count={0} obj={{"id": 123}} />
    )

    const firstRenderDeltas = observer.mock.calls[0][0]

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS)

    wrapper.setProps({bar: 1})

    const secondRenderDeltas = observer.mock.calls[1][0]

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS)
    expect(secondRenderDeltas).toEqual([null, null])
  })

  it('when not deep, delta should exist even if object is deeply equal', () => {
    let observer = jest.fn()
    const wrapper = mount(
      <App observer={observer} count={0} obj={{"id": 123}} />
    )

    const firstRenderDeltas = observer.mock.calls[0][0]

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS)

    wrapper.setProps({obj: {"id": 123}})

    const secondRenderDeltas = observer.mock.calls[1][0]

    expect(secondRenderDeltas).toEqual([null, {"curr": {"id": 123}, "prev": {"id": 123}}])
  })

  it('when deep, delta should not exist if object is deeply equal', () => {
    let observer = jest.fn()
    const wrapper = mount(
      <App observer={observer} count={0} obj={{"id": 123}} deep={true} />
    )

    const firstRenderDeltas = observer.mock.calls[0][0]

    expect(firstRenderDeltas).toEqual(FIRST_RENDER_DELTAS)

    wrapper.setProps({obj: {"id": 123}})

    const secondRenderDeltas = observer.mock.calls[1][0]

    expect(secondRenderDeltas).toEqual([null, null])
  })
})
