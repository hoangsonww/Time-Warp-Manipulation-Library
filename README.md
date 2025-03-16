# ⏳ Time-Warp-Manipulation

[![NPM version](https://img.shields.io/npm/v/time-warp-manipulation.svg?style=flat&logo=npm)](https://www.npmjs.com/package/time-warp-manipulation)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat&logo=opensource)](LICENSE)  
[![Node.js](https://img.shields.io/badge/Node-%3E%3D14-brightgreen.svg?style=flat&logo=node.js)](https://nodejs.org/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)

**Time-Warp-Manipulation** is a powerful NPM package that allows you to manipulate time in your JavaScript or TypeScript applications. With this library you can freeze time, accelerate or decelerate time flow, and even monkey-patch the global `Date` object for testing or simulation purposes. Whether you’re writing tests that rely on time or building advanced time-based features, Time-Warp-Manipulation gives you full control over time.

Currently available on NPM: [https://www.npmjs.com/package/time-warp-manipulation](https://www.npmjs.com/package/time-warp-manipulation)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Advanced Time Manipulation](#advanced-time-manipulation)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Building & Publishing](#building--publishing)
- [Contributing](#contributing)
- [License](#license)
- [Final Remarks](#final-remarks)

---

## Features

- **Freeze Time:** Lock the current time to a specific timestamp.
- **Time Acceleration:** Speed up or slow down the passage of time with a configurable multiplier.
- **Monkey-Patch Global Date:** Optionally replace the global `Date` object so that all code sees the manipulated time.
- **Virtual Time Object:** Retrieve a virtual time interface for advanced use cases without affecting the global environment.
- **TypeScript Support:** Fully written in TypeScript with complete type definitions.
- **ESM Compatible:** Compiled with NodeNext module resolution for seamless integration in modern projects.

---

## Installation

### Prerequisites

- Node.js v14 or higher
- npm v6 or higher

### Install via NPM

```bash
npm install time-warp-manipulation
```

### Install via Yarn

```bash
yarn add time-warp-manipulation
```

---

## Usage

Time-Warp-Manipulation provides a simple API to manipulate time for testing, simulations, or any time-based functionality. You can either work with a virtual time object or monkey-patch the global `Date` object.

### Basic Usage

Below is a simple example that freezes time, logs the frozen timestamp, then accelerates time and finally restores the original behavior.

```ts
import {
  enableTimeWarp,
  disableTimeWarp,
  setTimeWarpOptions,
  getVirtualTime,
} from "time-warp-manipulation";

// Freeze time at Jan 1, 2030, 00:00:00 UTC
// The timestamp for Jan 1, 2030, 00:00:00 UTC is 1893456000000 ms since the Unix epoch.
enableTimeWarp({
  freezeAt: new Date("2030-01-01T00:00:00Z").getTime(),
  monkeyPatch: true,
});

console.log("Frozen time (global Date):", Date.now());
// Expected output: 1893456000000 every time

// Update time settings: unfreeze and accelerate time by a factor of 5.
// With acceleration, 1 real second will simulate 5 seconds of "warped" time.
setTimeWarpOptions({
  freezeAt: null,
  speed: 5,
  monkeyPatch: false, // Optional: if already monkey-patched, this may be omitted
});

// Retrieve a virtual time object (does not affect global Date)
const vTime = getVirtualTime();
console.log("Accelerated virtual time:", vTime.now());

// When done, restore the original Date behavior.
disableTimeWarp();
console.log("Restored real time (global Date):", Date.now());
```

### Advanced Time Manipulation

For more advanced use cases, you can update TimeWarp options dynamically or use the virtual time object without monkey-patching the global `Date` object:

```ts
import {
  enableTimeWarp,
  setTimeWarpOptions,
  getVirtualTime,
  disableTimeWarp,
} from "time-warp-manipulation";

// Enable TimeWarp without monkey-patching, using a virtual time object only.
enableTimeWarp({ monkeyPatch: false });

// Get the virtual time interface
const virtualTime = getVirtualTime();

// Log the current virtual time
console.log("Initial virtual time:", virtualTime.now());

// Update options to accelerate time by 3x
setTimeWarpOptions({ speed: 3 });
console.log("Virtual time after acceleration:", virtualTime.now());

// Optionally, you can disable TimeWarp entirely.
disableTimeWarp();
console.log("TimeWarp disabled, real time:", Date.now());
```

---

## API Reference

### `enableTimeWarp(options?: TimeWarpOptions): void`

- **Description:** Initializes the time manipulation according to the provided options. If `monkeyPatch` is `true`, the global `Date` object is replaced with a manipulated version.
- **Parameters:**
  - `freezeAt`: A timestamp (in milliseconds) to freeze time at. If provided, time will remain constant.
  - `speed`: A multiplier to accelerate or decelerate time. (e.g., `2` for double speed)
  - `monkeyPatch`: If set to `true`, replaces the global `Date` with the manipulated version.

### `disableTimeWarp(): void`

- **Description:** Restores the original global `Date` object and disables time manipulation.

### `setTimeWarpOptions(options: TimeWarpOptions): void`

- **Description:** Updates the current time manipulation settings (e.g., unfreezing or changing the speed).

### `getVirtualTime(): VirtualTime`

- **Description:** Returns a virtual time object containing:
  - `now()`: The current manipulated time in milliseconds.
  - `Date`: The custom Date constructor that uses the manipulated time.

---

## Testing

The package includes a comprehensive Jest test suite to verify its functionality.

### Running Tests

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run tests:**

   ```bash
   npm test
   ```

Test files are located in the `__tests__` directory and cover scenarios such as freezing time, accelerating time, monkey-patching the global `Date`, and updating time options.

---

## Building & Publishing

### Building

Compile the TypeScript source code:

```bash
npm run build
```

### Publishing

1. **Login to npm:**

   ```bash
   npm login
   ```

2. **Publish the package:**

   ```bash
   npm publish --access public
   ```

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**
2. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/my-new-feature
   ```

3. **Commit Your Changes**
4. **Submit a Pull Request**

For major changes, please open an issue first to discuss your ideas.

---

## License

This project is licensed under the MIT License.

---

## Final Remarks

**Time-Warp-Manipulation** gives you full control over time in your applications. Whether you're writing tests that need to simulate time passing, freezing time for debugging, or accelerating time for simulations, this package makes it easy to manipulate the flow of time without altering your production code.

Happy time warping! ⏳🚀

```

```
