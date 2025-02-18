// filepath: /hd/dev/xplore/apps/ui/src/components/Title.test.tsx
import { useStore } from "@nanostores/react";
import { render, screen } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { axe } from "vitest-axe";
import Title from "./Title";

// Mock the useStore hook
vi.mock("@nanostores/react", () => ({
  useStore: vi.fn(),
}));

describe("Title Component", () => {
  it("should render with no violations", async () => {
    // Mock the return value of useStore
    (useStore as Mock).mockReturnValue({
      select_your_destinations_below: "Select your destinations below",
    });

    const { container } = render(<Title />);
    const results = await axe(container);
    // @ts-expect-error
    expect(results).toHaveNoViolations();
  });

  it("renders correctly with the language store data", () => {
    // Mock the return value of useStore
    (useStore as Mock).mockReturnValue({
      select_your_destinations_below: "Select your destinations below",
    });

    render(<Title />);

    // Check if the image is rendered
    const imgElement = screen.getByAltText("Xplore");
    expect(imgElement).toBeInTheDocument();

    // Check if the heading is rendered with the correct text
    const headingElement = screen.getByText("Select your destinations below");
    expect(headingElement).toBeInTheDocument();
  });
});
