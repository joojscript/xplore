import { useStore } from "@nanostores/react";
import { render } from "@testing-library/react";
import { Cartesian3 } from "cesium";
import { vi, type Mock } from "vitest";
import { axe } from "vitest-axe";
import type { Site } from "../@types/sites";
import Map from "./Map";

// Mock the useStore hook
vi.mock("@nanostores/react", () => ({
  useStore: vi.fn(),
}));

var mockViewerComponent = vi.fn(({ children }) => <div>{children}</div>);
var mockEntityComponent = vi.fn(({ children }) => <div>{children}</div>);

vi.mock("resium", () => ({
  Viewer: (props: any) => mockViewerComponent(props),
  Entity: (props: any) => mockEntityComponent(props),
}));

vi.mock("../services/backend.ts", () => ({
  BackendService: {
    get: vi.fn().mockReturnValue({ data: [] }),
  },
}));

describe("Map Component", () => {
  beforeEach(() => {
    (useStore as Mock).mockReturnValue([]);
  });

  it("should render with no violations", async () => {
    // Mock the return value of useStore
    (useStore as Mock).mockReturnValue({
      select_your_destinations_below: "Select your destinations below",
    });

    const { container } = render(<Map />);
    const results = await axe(container);
    // @ts-expect-error
    expect(results).toHaveNoViolations();
  });

  // TODO: Fix this bug, as related: https://youtu.be/8dukGid1mE0
  it.skip("flies to the focused site on mount", () => {
    const mockFocusedSite = { longitude: 10, latitude: 20 };
    (useStore as Mock)
      .mockReturnValueOnce([]) // SitesStore
      .mockReturnValueOnce(mockFocusedSite) // FocusedSiteStore
      .mockReturnValueOnce([]) // SelectedSiteStore
      .mockReturnValueOnce([]); // OptimalRouteStore

    render(<Map />);
    const fromDegressSpy = vi.spyOn(Cartesian3, "fromDegrees");

    expect(fromDegressSpy).toHaveBeenCalledWith(10, 20, 5000000);
  });

  it("renders entities for selected sites", () => {
    const mockSelectedSites = new Set([
      { id_no: 1, longitude: 10, latitude: 20, name_en: "Site 1" },
      { id_no: 2, longitude: 30, latitude: 40, name_en: "Site 2" },
    ]);
    (useStore as Mock)
      .mockReturnValueOnce(mockSelectedSites) // SitesStore
      .mockReturnValueOnce(null) // FocusedSiteStore
      .mockReturnValueOnce(mockSelectedSites) // SelectedSiteStore
      .mockReturnValueOnce(new Set()); // OptimalRouteStore

    render(<Map />);

    Array.from(mockSelectedSites).forEach((site, index) => {
      expect(mockEntityComponent).toHaveBeenCalledWith(
        expect.objectContaining({ "data-testid": `${site.id_no}-${index}` })
      );
    });
  });

  it("renders the optimal route", async () => {
    const mockSites = new Set([
      { id_no: "1", longitude: 10, latitude: 20, name_en: "Site 1" },
      { id_no: "2", longitude: 30, latitude: 40, name_en: "Site 2" },
    ]);
    const mockOptimalRoute: Set<Site["id_no"]> = new Set(
      Array.from(mockSites).map((site) => site.id_no)
    );
    (useStore as Mock)
      .mockReturnValueOnce(mockSites) // SitesStore
      .mockReturnValueOnce(null) // FocusedSiteStore
      .mockReturnValueOnce(mockSites) // SelectedSiteStore
      .mockReturnValueOnce(mockOptimalRoute); // OptimalRouteStore

    render(<Map />);

    expect(mockEntityComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        polyline: expect.objectContaining({
          positions: expect.any(Array),
        }),
      })
    );
  });
});
