import { faker } from "@faker-js/faker";
import { useStore } from "@nanostores/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import { axe } from "vitest-axe";
import type { Site } from "../@types/sites";
import { BackendService } from "../services/backend";
import { AppLanguages } from "../stores/language.store";
import * as SiteStore from "../stores/sites.store";
import SiteSelector from "./SiteSelector";

// Mock the useStore hook
vi.mock("@nanostores/react", () => ({
  useStore: vi.fn(),
}));

// Mock the BackendService
vi.mock("../services/backend", () => ({
  BackendService: {
    get: vi.fn().mockReturnValue({ data: [] }),
  },
}));

describe("SiteSelector Component", () => {
  beforeEach(() => {
    (useStore as Mock).mockReturnValue([]);
  });

  it("should render with no violations", async () => {
    // Mock the return value of useStore
    (useStore as Mock).mockReturnValue({
      select_your_destinations_below: "Select your destinations below",
    });

    const { container } = render(<SiteSelector />);
    const results = await axe(container);
    // @ts-expect-error
    expect(results).toHaveNoViolations();
  });

  it("loads data on mount", async () => {
    const selectedLanguage = faker.helpers.enumValue(AppLanguages);

    const mockSites: Pick<Site, "id">[] = [
      {
        id: faker.string.uuid(),
        [`name_${selectedLanguage}` as any]: faker.location.city(),
        [`description_${selectedLanguage}` as any]: faker.lorem.words(),
      },
      {
        id: faker.string.uuid(),
        [`name_${selectedLanguage}`]: faker.location.city(),
        [`description_${selectedLanguage}`]: "Description 2",
      },
    ];

    (BackendService.get as Mock).mockResolvedValue({ data: mockSites });
    const addSiteSpy = vi.spyOn(SiteStore, "addSite");
    render(<SiteSelector />);

    await waitFor(() => {
      expect(addSiteSpy).toHaveBeenCalledWith(mockSites[0]);
      expect(addSiteSpy).toHaveBeenCalledWith(mockSites[1]);
    });
  });

  it.skip("selects a site when clicked", async () => {
    const selectedLanguage = faker.helpers.enumValue(AppLanguages);

    const mockSites: Pick<Site, "id">[] = [
      {
        id: faker.string.uuid(),
        [`name_${selectedLanguage}` as any]: faker.location.city(),
        [`description_${selectedLanguage}` as any]: faker.lorem.words(),
      },
      {
        id: faker.string.uuid(),
        [`name_${selectedLanguage}`]: faker.location.city(),
        [`description_${selectedLanguage}`]: "Description 2",
      },
    ];

    (useStore as Mock)
      .mockReturnValueOnce(mockSites) // sites
      .mockReturnValueOnce([]) // selectedSites
      .mockReturnValue({
        select_your_destinations_below: "Select your destinations below", // language
      })
      .mockReturnValueOnce(selectedLanguage); // selectedLanguage
    const selectSiteSpy = vi.spyOn(SiteStore, "selectSite");
    render(<SiteSelector />);

    vi.spyOn(SiteStore.FocusedSiteStore, "get").mockReturnValue(
      mockSites[0] as Site
    );

    const siteElements = screen.getAllByTestId("site-select-input");
    siteElements.forEach(fireEvent.click);

    await waitFor(() => {
      expect(selectSiteSpy).toHaveBeenCalledWith(mockSites[0]);
    });
  });

  it.skip("deselects a site when clicked again", async () => {
    const selectedLanguage = faker.helpers.enumValue(AppLanguages);

    const mockSites: Pick<Site, "id">[] = [
      {
        id: faker.string.uuid(),
        [`name_${selectedLanguage}` as any]: faker.location.city(),
        [`description_${selectedLanguage}` as any]: faker.lorem.words(),
      },
      {
        id: faker.string.uuid(),
        [`name_${selectedLanguage}`]: faker.location.city(),
        [`description_${selectedLanguage}`]: "Description 2",
      },
    ];

    (useStore as Mock)
      .mockReturnValueOnce(mockSites) // SitesStore
      .mockReturnValueOnce(mockSites) // SelectedSiteStore
      .mockReturnValueOnce({}) // LanguageStore
      .mockReturnValueOnce(selectedLanguage); // SelectedLanguageStore
    render(<SiteSelector />);

    const deselectSiteSpy = vi.spyOn(SiteStore, "deselectSite");

    const siteElement = screen.getAllByTestId("site-select-input")[0];

    fireEvent.click(siteElement);
    await waitFor(() => {
      expect(deselectSiteSpy).toHaveBeenCalledWith(mockSites[0]);
    });
  });
});
