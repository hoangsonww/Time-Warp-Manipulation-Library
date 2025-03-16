/**
 * Our custom Date class that manipulates time.
 */
export declare class TimeWarpDate extends Date {
    constructor(...args: any[]);
    static now(): number;
}
/**
 * Return the current "warped" time in ms since epoch.
 */
export declare function getWarpedTime(): number;
/**
 * Overwrite the global Date class with TimeWarpDate.
 */
export declare function monkeyPatchGlobalDate(): void;
/**
 * Restore the real Date class.
 */
export declare function restoreGlobalDate(): void;
/**
 * Initialize or update TimeWarp options.
 */
export declare function setTimeWarpOptions(opts: {
    freezeAt?: number | null;
    speed?: number;
    monkeyPatch?: boolean;
}): void;
/**
 * Disable time warp entirely.
 */
export declare function disableTimeWarpCompletely(): void;
/**
 * Get a "virtual time" object.
 */
export declare function getVirtualTimeObject(): {
    now: typeof getWarpedTime;
    Date: typeof TimeWarpDate;
};
//# sourceMappingURL=timeWarp.d.ts.map