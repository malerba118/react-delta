import every from './every'

describe('every', () => {
  it('should be true if all truthy', () => {
    expect(
        every([true, [], {}, 'true', 1])
    ).toBe(
        true
    )
  })

  it('should be false if any falsey', () => {
    expect(
        every([true, [], {}, 'true', 0])
    ).toBe(
        false
    )
  })

  it('should be true if empty array', () => {
    expect(
        every([])
    ).toBe(
        true
    )
  })

})
