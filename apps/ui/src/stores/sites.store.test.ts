import { vi } from "vitest";
import { MOCK_GENERATOR } from "../../test/MockGenerator";
import type { Site } from "../@types/sites";
import {
  FocusedSiteStore,
  OptimalRouteStore,
  SelectedSiteStore,
  SitesStore,
  addSite,
  deselectSite,
  selectSite,
} from "./sites.store";

const mockBackendGetFn = vi.fn().mockReturnValue({ data: [] });

vi.mock("../services/backend", () => ({
  get: (...args: any[]) => mockBackendGetFn(...args),
}));

describe("SitesStore", () => {
  it("should initialize with an empty set", () => {
    expect(SitesStore.get().size).toBe(0);
  });

  it("should add a site", () => {
    const site: Site = MOCK_GENERATOR.Site();
    addSite(site);
    expect(SitesStore.get().has(site)).toBe(true);
  });
});

describe("SelectedSiteStore", () => {
  beforeEach(() => {
    SelectedSiteStore.set(new Set());
  });

  it("should initialize with an empty set", () => {
    expect(SelectedSiteStore.get().size).toBe(0);
  });

  it("should select a site", () => {
    const site: Site = MOCK_GENERATOR.Site();
    selectSite(site);
    expect(SelectedSiteStore.get().has(site)).toBe(true);
  });

  it("should deselect a site", () => {
    const site: Site = MOCK_GENERATOR.Site();
    selectSite(site);
    deselectSite(site);
    expect(SelectedSiteStore.get().has(site)).toBe(false);
  });

  it.skip("should update OptimalRouteStore when more than 2 sites are selected", async () => {
    const sites: Site[] = [
      MOCK_GENERATOR.Site(),
      MOCK_GENERATOR.Site(),
      MOCK_GENERATOR.Site(),
    ];

    const mockResponse = { data: [1, 2, 3] };
    mockBackendGetFn.mockResolvedValue(mockResponse);

    sites.forEach(selectSite);

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async listener

    expect(OptimalRouteStore.get()).toEqual(new Set(mockResponse.data));
  });

  it("should update OptimalRouteStore when exactly 2 sites are selected", async () => {
    const sites: Site[] = [MOCK_GENERATOR.Site(), MOCK_GENERATOR.Site()];

    sites.forEach(selectSite);

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async listener

    expect(OptimalRouteStore.get()).toEqual(
      new Set([sites[0].id_no, sites[1].id_no])
    );
  });

  it("should clear OptimalRouteStore when less than 2 sites are selected", async () => {
    const site: Site = MOCK_GENERATOR.Site();
    selectSite(site);
    deselectSite(site);

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for async listener

    expect(OptimalRouteStore.get().size).toBe(0);
  });
});

describe("FocusedSiteStore", () => {
  it("should initialize with null", () => {
    expect(FocusedSiteStore.get()).toBeNull();
  });

  it("should set a focused site", () => {
    const site: Site = MOCK_GENERATOR.Site();
    FocusedSiteStore.set(site);
    expect(FocusedSiteStore.get()).toEqual(site);
  });
});

describe("OptimalRouteStore", () => {
  it("should initialize with an empty set", () => {
    expect(OptimalRouteStore.get().size).toBe(0);
  });

  it("should set optimal route", () => {
    const route = new Set(["1", "2", "3"]);
    OptimalRouteStore.set(route);
    expect(OptimalRouteStore.get()).toEqual(route);
  });
});
