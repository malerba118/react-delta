import every from './every'

describe('every', () => {
  it('should accept variable length args', () => {
    expect(
        every(true, true, true, true, true)
    ).toBe(
        true
    )
  })

  it('should flatten args', () => {
    expect(
        every(true, [true])
    ).toBe(
        true
    )

    expect(
        every(true, [false])
    ).toBe(
        false
    )
  })

  it('should accept array only', () => {
    expect(
        every([true, true])
    ).toBe(
        true
    )

    expect(
        every([true, false])
    ).toBe(
        false
    )
  })

  it('should only care about truthy/falsey', () => {
    expect(
        every('a', 1)
    ).toBe(
        true
    )

    expect(
        every('a', 1, null)
    ).toBe(
        false
    )

    expect(
        every('a', 1, [undefined])
    ).toBe(
        false
    )
  })

  it('nested should work', () => {
    expect(
        every(true, every(true, [true]))
    ).toBe(
        true
    )

    expect(
        every(true, every(true, [false]))
    ).toBe(
        false
    )
  })
})
