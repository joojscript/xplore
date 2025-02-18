import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { axe } from "vitest-axe";
import Overlay from "./Overlay.astro";

/**
 * Currently, Astro Testing API is not stable enough to make this integration.
 * Errors with ESBuild happens, when they are worked around (as they were here,
 * check the `test` folder for the setup), other Vite plugin errors occurs.
 *
 * This test case is correctly written, but lacks the integration with Astro Testing API.
 * Until then, only renaming the file removes the error, not only the skip directive
 * was capable of making Astro Testing Container igore it.
 */
describe("Overlay Component", () => {
  it.skip("should render with no violations", async () => {
    const container = await AstroContainer.create();
    const component = await container.renderToString(Overlay);
    const results = await axe(component);
    // @ts-expect-error
    expect(results).toHaveNoViolations();
  });
});
