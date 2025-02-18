import "@testing-library/jest-dom";
import { readFileSync } from "fs";

import { join, resolve } from "path";
import { expect } from "vitest";
import "vitest-axe/extend-expect";
import * as matchers from "vitest-axe/matchers";
expect.extend(matchers);

global.fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> => {
  if (typeof input == "string") {
    const publicDir = resolve(__dirname, "public");
    const filePath = join(publicDir, input);

    const response = new Response();
    response.json = () =>
      new Promise<any>((resolve) => {
        const data = readFileSync(filePath, "utf-8");
        resolve(JSON.parse(data));
      });
    return response;
  }
  return new Response();
};

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Reset all mocks after each test
afterEach(() => {
  vi.resetAllMocks();
});
