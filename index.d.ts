/**
 * TimeWarpOptions define how to manipulate Date.
 */
export interface TimeWarpOptions {
  // Freeze the clock at a specific timestamp (milliseconds).
  freezeAt?: number | null;

  // Speed multiplier for time. E.g., 2 => time moves twice as fast.
  speed?: number;

  // If true, monkey-patch the global Date object.
  monkeyPatch?: boolean;
}

/**
 * Represents a custom time object for advanced usage.
 */
export interface VirtualTime {
  now(): number;
  Date: typeof Date;
}

/**
 * Main TimeWarp API:
 */
export declare function enableTimeWarp(options?: TimeWarpOptions): void;
export declare function disableTimeWarp(): void;
export declare function getVirtualTime(): VirtualTime;
export declare function setTimeWarpOptions(options: TimeWarpOptions): void;
