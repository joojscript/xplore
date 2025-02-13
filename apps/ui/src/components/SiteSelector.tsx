import { useStore } from "@nanostores/react";
import React, { useEffect, type ChangeEvent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { Site } from "../@types/sites";
import {
  addSite,
  FocusedSiteStore,
  selectSite,
  SitesStore,
} from "../stores/sites.store";

async function loadData(page: number = 1) {
  const response = await fetch(
    `http://localhost:3000/sites?_page=${page}&_per_page=10`
  );
  const result = (await response.json()).data;
  result.forEach((site: Site) => addSite(site));
}

const SiteSelector: React.FC = () => {
  const sites = useStore(SitesStore);

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (elementIndex: number) => {
    const site = Array.from(sites)[elementIndex];
    FocusedSiteStore.set(site);
    if (sites.size - elementIndex <= 2) {
      loadData(Math.ceil(sites.size / 10) + 1);
    }
  };

  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const focusedSite = FocusedSiteStore.get();
      if (!focusedSite) return;
      const site = Array.from(sites).find(
        (site) => site.name_en === focusedSite.name_en
      );
      if (site) selectSite(site);
    }
  };

  if (sites.size === 0) return <div>Loading...</div>;

  return (
    <div>
      <Carousel
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        onChange={handleChange}
        dynamicHeight={false}
      >
        {Array.from(sites).map((site) => (
          <div
            key={site.id}
            className="flex flex-col justify-center items-center bg-red-500 max-h-96 min-h-96"
          >
            <h2>{site.name_en}</h2>
            <div className="min-h-8" />
            <div className="flex flex-col justify-center items-center overflow-y-auto px-12">
              <p dangerouslySetInnerHTML={{ __html: site.justification_en }} />
              <div className="min-h-8" />
              <p
                dangerouslySetInnerHTML={{ __html: site.short_description_en }}
              />
            </div>
            <div className="min-h-8" />
            <label htmlFor="select-site" className="text-lg">
              Select
            </label>
            <input type="checkbox" name="select-site" onChange={handleSelect} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SiteSelector;
