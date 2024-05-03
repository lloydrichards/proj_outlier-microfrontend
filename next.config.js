/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: "/storybook/",
        destination: "/storybook/index.html",
      },
    ];
  },
};

export default config;
