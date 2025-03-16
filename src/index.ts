import {
  disableTimeWarpCompletely,
  getVirtualTimeObject,
  setTimeWarpOptions,
  getWarpedTime,
} from "./timeWarp.js";
import type { TimeWarpOptions } from "../index.js";

export function enableTimeWarp(options?: TimeWarpOptions): void {
  setTimeWarpOptions({
    freezeAt: options?.freezeAt ?? null,
    speed: options?.speed ?? 1,
    monkeyPatch: options?.monkeyPatch ?? false,
  });
}

export function disableTimeWarp(): void {
  disableTimeWarpCompletely();
}

/**
 * Return the "virtual time" object for advanced usage.
 */
export function getVirtualTime() {
  return getVirtualTimeObject();
}

/**
 * Update TimeWarp options after enabling.
 */
export function setTimeWarpOptionsPublic(options: TimeWarpOptions): void {
  setTimeWarpOptions({
    freezeAt: options.freezeAt,
    speed: options.speed,
    monkeyPatch: options.monkeyPatch,
  });
}

// Re-export for users
export { setTimeWarpOptionsPublic as setTimeWarpOptions };
