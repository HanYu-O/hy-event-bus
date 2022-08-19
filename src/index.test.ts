import HyEventBus from "./index";

const bus = new HyEventBus();

test("addEventListener", () => {
    const callback = jest.fn();
    const scope = {};
    const args = [1, 2, 3];
    bus.addEventListener("event", callback, scope, ...args);
    expect(bus.hasEventListener("event", callback, scope)).toBe(true);
})

test("removeEventListener", () => {
    const callback = jest.fn();
    const scope = {};
    const args = [1, 2, 3];
    bus.addEventListener("event", callback, scope, ...args);
    bus.removeEventListener("event", callback, scope);
    expect(bus.hasEventListener("event", callback, scope)).toBe(false);
})

test("dispatch", () => {
    const callback = jest.fn();
    const scope = {};
    const args = [1, 2, 3];
    bus.addEventListener("event", callback, scope);
    bus.dispatch("event", ...args);
    expect(callback).toHaveBeenCalledWith(...args);
})

test("hasEventListener", () => {
    const callback = jest.fn();
    const scope = {};
    const args = [1, 2, 3];
    bus.addEventListener("event", callback, scope, ...args);
    expect(bus.hasEventListener("event", callback, scope)).toBe(true);
})