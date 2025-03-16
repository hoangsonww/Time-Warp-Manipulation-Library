import { disableTimeWarpCompletely, getVirtualTimeObject, setTimeWarpOptions, } from "./timeWarp.js";
export function enableTimeWarp(options) {
    setTimeWarpOptions({
        freezeAt: options?.freezeAt ?? null,
        speed: options?.speed ?? 1,
        monkeyPatch: options?.monkeyPatch ?? false,
    });
}
export function disableTimeWarp() {
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
export function setTimeWarpOptionsPublic(options) {
    setTimeWarpOptions({
        freezeAt: options.freezeAt,
        speed: options.speed,
        monkeyPatch: options.monkeyPatch,
    });
}
// Re-export for users
export { setTimeWarpOptionsPublic as setTimeWarpOptions };
