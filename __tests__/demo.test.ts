import {
  enableTimeWarp,
  disableTimeWarp,
  getVirtualTime,
  setTimeWarpOptions,
} from "../dist/index.js";

describe("TimeWarp - Basic Tests", () => {
  afterEach(() => {
    disableTimeWarp();
  });

  it("freezes time", () => {
    const freezeAt = new Date("2025-01-01T00:00:00Z").getTime();
    enableTimeWarp({ freezeAt, monkeyPatch: false });

    const vtime = getVirtualTime();
    const firstNow = vtime.now();
    // Advance real time
    for (let i = 0; i < 1000000; i++) {
      /* spin loop to simulate time */
    }
    const secondNow = vtime.now();

    expect(firstNow).toBe(freezeAt);
    expect(secondNow).toBe(freezeAt);
  });

  it("accelerates time by speed factor", () => {
    enableTimeWarp({ speed: 10, monkeyPatch: false });
    const vtime = getVirtualTime();

    const t1 = vtime.now();
    // Wait ~10ms real-time
    const start = Date.now();
    while (Date.now() - start < 10) {
      /* busy wait 10ms */
    }
    const t2 = vtime.now();

    // Because speed=10, we expect ~100ms difference in warped time
    const diff = t2 - t1;
    expect(diff).toBeGreaterThanOrEqual(90); // ~100ms
    expect(diff).toBeLessThan(120);
  });

  it("monkey-patches global Date", () => {
    enableTimeWarp({ freezeAt: 1234567890000, monkeyPatch: true });

    const realNow = Date.now(); // This is the monkey-patched Date
    expect(realNow).toBe(1234567890000);

    // If we disable, we get back real date
    disableTimeWarp();
    const realNow2 = Date.now();
    expect(realNow2).not.toBe(1234567890000);
  });

  it("updates options after enabling", () => {
    enableTimeWarp({ freezeAt: null, speed: 1 });
    setTimeWarpOptions({ freezeAt: 999999999000, speed: 2 });

    const vtime = getVirtualTime();
    expect(vtime.now()).toBe(999999999000);
  });
});
