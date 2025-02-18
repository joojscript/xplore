import { faker } from "@faker-js/faker";
import {
  AppLanguages,
  LanguageStore,
  SelectedLanguageStore,
  setAppLanguage,
} from "./language.store";

describe("LanguageStore", () => {
  it("should be defined", () => {
    expect(LanguageStore).toBeDefined();
  });

  it("should update the localStorage when the language is set", () => {
    const language = faker.helpers.enumValue(AppLanguages);
    const selectedLanguageStoreSetSpy = vi.spyOn(SelectedLanguageStore, "set");
    const localStorageSetItemSpy = vi.spyOn(localStorage, "setItem");

    setAppLanguage(language);

    expect(selectedLanguageStoreSetSpy).toHaveBeenCalledWith(language);
    expect(localStorageSetItemSpy).toHaveBeenCalledWith("language", language);
  });
});

describe("SelectedLanguageStore", () => {
  it("should be defined", () => {
    expect(SelectedLanguageStore).toBeDefined();
  });

  it.skip("should update the LanguageStore when the selected language is changed", () => {
    const language = faker.helpers.enumValue(AppLanguages);
    const fetchSpy = vi.spyOn(window, "fetch");

    SelectedLanguageStore.set(language);

    expect(fetchSpy).toHaveBeenCalledWith(`/lang/${language}.json`);
  });
});
