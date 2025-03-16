// src/timeWarp.ts
let originalDateClass = Date;
let timeWarpActive = false;
const internalState = {
    freezeAt: null,
    speed: 1,
    startRealTime: 0,
    startWarpTime: 0,
};
// A reference to the user-chosen monkey-patch state
let isMonkeyPatched = false;
/**
 * Our custom Date class that manipulates time.
 */
export class TimeWarpDate extends Date {
    constructor(...args) {
        if (args.length === 0) {
            const warped = getWarpedTime();
            console.log("[TimeWarpDate] Creating new Date with warped time:", warped);
            super(warped);
        }
        else {
            console.log("[TimeWarpDate] Creating new Date with provided args:", args);
            // @ts-ignore
            super(...args);
        }
    }
    // Overriding static now()
    static now() {
        const warped = getWarpedTime();
        console.log("[TimeWarpDate.now] Returning warped time:", warped);
        return warped;
    }
}
/**
 * Return the current "warped" time in ms since epoch.
 */
export function getWarpedTime() {
    const { freezeAt, speed, startRealTime, startWarpTime } = internalState;
    if (freezeAt !== null) {
        console.log("[getWarpedTime] Time is frozen at:", freezeAt);
        return freezeAt; // time is frozen
    }
    const realNow = originalDateClass.now();
    const realElapsed = realNow - startRealTime;
    const warpElapsed = realElapsed * speed;
    const warpedTime = startWarpTime + warpElapsed;
    console.log(`[getWarpedTime] realNow: ${realNow}, startRealTime: ${startRealTime}, realElapsed: ${realElapsed}, speed: ${speed}, startWarpTime: ${startWarpTime}, warpedTime: ${warpedTime}`);
    return warpedTime;
}
/**
 * Overwrite the global Date class with TimeWarpDate.
 */
export function monkeyPatchGlobalDate() {
    if (!isMonkeyPatched) {
        console.log("[monkeyPatchGlobalDate] Monkey-patching global Date with TimeWarpDate.");
        // @ts-ignore
        globalThis.Date = TimeWarpDate;
        isMonkeyPatched = true;
    }
    else {
        console.log("[monkeyPatchGlobalDate] Global Date is already monkey-patched.");
    }
}
/**
 * Restore the real Date class.
 */
export function restoreGlobalDate() {
    if (isMonkeyPatched) {
        console.log("[restoreGlobalDate] Restoring original Date class.");
        // @ts-ignore
        globalThis.Date = originalDateClass;
        isMonkeyPatched = false;
    }
    else {
        console.log("[restoreGlobalDate] Global Date is not monkey-patched; no action taken.");
    }
}
/**
 * Initialize or update TimeWarp options.
 */
export function setTimeWarpOptions(opts) {
    console.log("[setTimeWarpOptions] Previous warped time:", getWarpedTime());
    if (typeof opts.freezeAt !== "undefined") {
        internalState.freezeAt = opts.freezeAt;
        console.log("[setTimeWarpOptions] Set freezeAt to:", opts.freezeAt);
    }
    if (typeof opts.speed !== "undefined") {
        internalState.speed = opts.speed;
        console.log("[setTimeWarpOptions] Set speed to:", opts.speed);
    }
    if (!timeWarpActive) {
        internalState.startRealTime = originalDateClass.now();
        internalState.startWarpTime = getWarpedTime();
        timeWarpActive = true;
        console.log("[setTimeWarpOptions] TimeWarp activated. startRealTime:", internalState.startRealTime, "startWarpTime:", internalState.startWarpTime);
    }
    else {
        const nowReal = originalDateClass.now();
        internalState.startWarpTime = getWarpedTime();
        internalState.startRealTime = nowReal;
        console.log("[setTimeWarpOptions] TimeWarp updated. New startRealTime:", nowReal, "New startWarpTime:", internalState.startWarpTime);
    }
    if (opts.monkeyPatch) {
        monkeyPatchGlobalDate();
    }
}
/**
 * Disable time warp entirely.
 */
export function disableTimeWarpCompletely() {
    console.log("[disableTimeWarpCompletely] Disabling TimeWarp.");
    restoreGlobalDate();
    timeWarpActive = false;
    internalState.freezeAt = null;
    internalState.speed = 1;
    internalState.startRealTime = 0;
    internalState.startWarpTime = 0;
}
/**
 * Get a "virtual time" object.
 */
export function getVirtualTimeObject() {
    console.log("[getVirtualTimeObject] Returning virtual time object.");
    return {
        now: getWarpedTime,
        Date: TimeWarpDate,
    };
}
