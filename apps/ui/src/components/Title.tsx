import { useStore } from "@nanostores/react";
import React from "react";
import { LanguageStore } from "../stores/language.store";

const Title: React.FC = () => {
  const language = useStore(LanguageStore);

  return (
    <div className="z-10 flex justify-center items-center">
      <img src="/xplore-logo.png" alt="Xplore" className="w-32" />
      <h3 className="text-4xl text-center font-black" id="overlay-title">
        {language["select_your_destinations_below"]}
      </h3>
    </div>
  );
};

export default Title;
