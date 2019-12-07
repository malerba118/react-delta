import React from 'react'
import { mount } from 'enzyme'
import usePrevious from './usePrevious'

interface Props {
    count: number
    observer: Function
}

const App = ({observer, count}: Props) => {

    let prevCount = usePrevious(count)

    observer(prevCount)

    return null
}

describe('usePrevious', () => {
  it('current render should have access to value from previous', () => {
    let observer = jest.fn()
    const wrapper = mount(
        <App observer={observer} count={0} />
    )

    const firstRenderCount = observer.mock.calls[0][0]

    expect(firstRenderCount).toEqual(undefined)

    wrapper.setProps({count: 1})

    const secondRenderCount = observer.mock.calls[1][0]

    expect(firstRenderCount).toEqual(undefined)
    expect(secondRenderCount).toEqual(0)
  })
})
