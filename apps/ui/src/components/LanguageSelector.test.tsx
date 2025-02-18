import { faker } from "@faker-js/faker";
import { useStore } from "@nanostores/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { type Mock, vi } from "vitest";
import { axe } from "vitest-axe";
import { AppLanguages, SelectedLanguageStore } from "../stores/language.store";
import LanguageSelector from "./LanguageSelector";
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

describe("LanguageSelector Component", () => {
  beforeEach(() => {
    (useStore as Mock).mockReturnValue(faker.helpers.enumValue(AppLanguages));
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

  it.skip("changes the selected language when a new language is clicked", async () => {
    (useStore as Mock).mockReturnValue(AppLanguages.EN); // SelectedLanguageStore

    render(<LanguageSelector />);

    const languageSelectorDropdown = screen.getByTestId("language-selector");
    fireEvent.change(languageSelectorDropdown, {
      target: { value: AppLanguages.ES },
    });

    const selectedLanguageStoreSetSpy = vi.spyOn(SelectedLanguageStore, "set");

    expect(selectedLanguageStoreSetSpy).toHaveBeenCalledWith(AppLanguages.ES);
  });

  it("highlights the selected language", () => {
    (useStore as Mock).mockReturnValueOnce(AppLanguages.EN); // SelectedLanguageStore

    render(<LanguageSelector />);

    const languageSelectorDropdown = screen.getByTestId("language-selector");
    expect(languageSelectorDropdown).toHaveValue(AppLanguages.EN);
  });
});
