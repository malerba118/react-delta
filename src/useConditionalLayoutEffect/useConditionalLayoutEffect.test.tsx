import React from "react";
import useConditionalLayoutEffect from "./useConditionalLayoutEffect";
import { mount } from "enzyme";

interface Props {
  condition?: boolean;
  effect: Function;
  cleanup: Function;
}

const App = ({ effect, cleanup, condition }: Props) => {
  useConditionalLayoutEffect(() => {
    effect();
    return () => cleanup();
  }, condition);

  return null;
};

describe("useConditionalEffect", () => {
  it("should run on mount if true", () => {
    const effectObserver = jest.fn();
    const cleanupObserver = jest.fn();

    mount(
      <App effect={effectObserver} cleanup={cleanupObserver} condition={true} />
    );

    expect(effectObserver).toHaveBeenCalledTimes(1);
    expect(cleanupObserver).toHaveBeenCalledTimes(0);
  });

  it("should not run on mount if false", () => {
    const effectObserver = jest.fn();
    const cleanupObserver = jest.fn();

    mount(
      <App
        effect={effectObserver}
        cleanup={cleanupObserver}
        condition={false}
      />
    );

    expect(effectObserver).toHaveBeenCalledTimes(0);
    expect(cleanupObserver).toHaveBeenCalledTimes(0);
  });

  it("should clean up before running next effect", () => {
    const effectObserver = jest.fn();
    const cleanupObserver = jest.fn();

    const wrapper = mount(
      <App effect={effectObserver} cleanup={cleanupObserver} condition={true} />
    );

    wrapper.setProps({ condition: true });

    expect(effectObserver).toHaveBeenCalledTimes(2);
    expect(cleanupObserver).toHaveBeenCalledTimes(1);
  });

  it("should clean up before unmounting", () => {
    const effectObserver = jest.fn();
    const cleanupObserver = jest.fn();

    const wrapper = mount(
      <App effect={effectObserver} cleanup={cleanupObserver} condition={true} />
    );

    wrapper.unmount();

    expect(effectObserver).toHaveBeenCalledTimes(1);
    expect(cleanupObserver).toHaveBeenCalledTimes(1);
  });

  it("should not run if false on non-first renders", () => {
    const effectObserver = jest.fn();
    const cleanupObserver = jest.fn();

    const wrapper = mount(
      <App effect={effectObserver} cleanup={cleanupObserver} condition={true} />
    );

    wrapper.setProps({ condition: false });

    expect(effectObserver).toHaveBeenCalledTimes(1);
    expect(cleanupObserver).toHaveBeenCalledTimes(0);
  });

  it("should run if true on non-first renders", () => {
    const effectObserver = jest.fn();
    const cleanupObserver = jest.fn();

    const wrapper = mount(
      <App
        effect={effectObserver}
        cleanup={cleanupObserver}
        condition={false}
      />
    );

    wrapper.setProps({ condition: true });

    expect(effectObserver).toHaveBeenCalledTimes(1);
    expect(cleanupObserver).toHaveBeenCalledTimes(0);
  });

  it("should not run if undefined", () => {
    const effectObserver = jest.fn();
    const cleanupObserver = jest.fn();

    const wrapper = mount(
      <App
        effect={effectObserver}
        cleanup={cleanupObserver}
        condition={undefined}
      />
    );

    wrapper.unmount();

    expect(effectObserver).toHaveBeenCalledTimes(0);
    expect(cleanupObserver).toHaveBeenCalledTimes(0);
  });
});
