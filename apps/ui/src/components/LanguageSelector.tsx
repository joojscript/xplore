import { useStore } from "@nanostores/react";
import React from "react";
import {
  AppLanguages,
  SelectedLanguageStore,
  setAppLanguage,
} from "../stores/language.store";

const LanguageSelector: React.FC = () => {
  const selectedLanguage = useStore(SelectedLanguageStore);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value as AppLanguages;
    setAppLanguage(language);
  };

  return (
    <select
      data-testid="language-selector"
      className="z-10 fixed top-2 left-2 bg-black/80! text-white! rounded-md p-2"
      defaultValue={selectedLanguage}
      onChange={handleChange}
    >
      {Object.keys(AppLanguages).map((language, index) => (
        <option
          key={index}
          className="bg-black/95"
          // @ts-expect-error
          value={AppLanguages[language]}
        >
          {/* @ts-expect-error */}
          {AppLanguages[language]}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
