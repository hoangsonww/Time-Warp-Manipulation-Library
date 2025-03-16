import {
  enableTimeWarp,
  disableTimeWarp,
  setTimeWarpOptions,
  getVirtualTime,
} from "time-warp-manipulation";

/**
 * Example: Freeze time, then accelerate it, and finally restore real time.
 */

// Freeze time at Jan 1, 2030, 00:00:00 UTC
// The timestamp for Jan 1, 2030, 00:00:00 UTC is 1893456000000 ms since the Unix epoch.
enableTimeWarp({
  freezeAt: new Date("2030-01-01T00:00:00Z").getTime(),
  monkeyPatch: true, // This will replace the global Date with our TimeWarpDate
});

// Now, every call to Date.now() returns the frozen timestamp.
console.log("Frozen time:", Date.now()); // Expected output: 1893456000000

// After some operations, you may want to resume time flow.
// Here, we disable the freeze and set a speed factor to accelerate time.
// Setting freezeAt to null removes the freeze, and speed of 5 makes time pass 5 times faster.
setTimeWarpOptions({
  freezeAt: null,
  speed: 5,
});

// With acceleration enabled, 1 real second will simulate 5 seconds of "warped" time.
// You can use getVirtualTime() to retrieve the current virtual time without altering global Date if needed.
console.log("Accelerated virtual time:", getVirtualTime().now());

// When finished, restore the original Date object to return to normal behavior.
disableTimeWarp();
console.log("Real time restored:", Date.now());

// Should output something like:
// Frozen time: 1893456000000
// Accelerated virtual time: 1893456000000
// Real time restored: 1742155645526
