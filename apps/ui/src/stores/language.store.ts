import { atom } from "nanostores";

export enum AppLanguages {
  AR = "ar",
  EN = "en",
  ES = "es",
  FR = "fr",
  RU = "ru",
  ZH = "zh",
}

export const LanguageStore = atom<Record<string, string>>({});
export const SelectedLanguageStore = atom<AppLanguages>(AppLanguages.EN);

export const setAppLanguage = (language: AppLanguages) => {
  SelectedLanguageStore.set(language);
  localStorage.removeItem("language");
  localStorage.removeItem("lang");
  localStorage.setItem("language", language);
};

SelectedLanguageStore.subscribe((language) => {
  fetch(`/lang/${language}.json`)
    .then((response) => response.json())
    .then((data) => {
      LanguageStore.set(data);
    });
});
