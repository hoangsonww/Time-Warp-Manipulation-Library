import { getWarpedTime } from "./timeWarp.js";
import type { TimeWarpOptions } from "../index.js";
export declare function enableTimeWarp(options?: TimeWarpOptions): void;
export declare function disableTimeWarp(): void;
/**
 * Return the "virtual time" object for advanced usage.
 */
export declare function getVirtualTime(): {
    now: typeof getWarpedTime;
    Date: typeof import("./timeWarp.js").TimeWarpDate;
};
/**
 * Update TimeWarp options after enabling.
 */
export declare function setTimeWarpOptionsPublic(options: TimeWarpOptions): void;
export { setTimeWarpOptionsPublic as setTimeWarpOptions };
//# sourceMappingURL=index.d.ts.map