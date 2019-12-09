import some from './some';

describe('some', () => {
  it('should be true if any truthy', () => {
    expect(
        some([true, undefined, null, 0])
    ).toBe(
        true
    );
  });

  it('should be false if all falsey', () => {
    expect(
      some([false, undefined, null, 0])
      ).toBe(
        false
    );
  });

  it('should be false if empty array', () => {
    expect(
        some([])
    ).toBe(
        false
    );
  });

});
