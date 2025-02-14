import { useStore } from "@nanostores/react";
import React, { useEffect, useState, type ChangeEvent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { Site } from "../@types/sites";
import { BackendService } from "../services/backend";
import {
  addSite,
  FocusedSiteStore,
  SelectedSiteStore,
  selectSite,
  SitesStore,
} from "../stores/sites.store";

async function loadData(page: number = 1) {
  const response = await BackendService.get<Site[]>("/sites", {
    headers: { "x-page": page },
  });
  const result = response.data;
  result.forEach((site: Site) => addSite(site));
}

const SiteSelector: React.FC = () => {
  const sites = useStore(SitesStore);
  const selectedSites = useStore(SelectedSiteStore);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (elementIndex: number) => {
    const site = Array.from(sites)[elementIndex];
    FocusedSiteStore.set(site);
    if (sites.size - elementIndex <= 2) {
      loadData(page);
      setPage(page + 1);
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
        {Array.from(sites).map((site, index) => (
          <div
            key={site.id}
            className="flex flex-col justify-center items-center max-h-96 min-h-96 mt-4"
          >
            <h2 className="font-bold">{site.name_en}</h2>
            <div className="min-h-4" />
            <div className="flex flex-col overflow-y-auto px-12">
              <p
                className="font-light text-sm"
                dangerouslySetInnerHTML={{ __html: site.short_description_en }}
              />
              <div className="min-h-2" />
              <p
                className="font-light text-sm"
                dangerouslySetInnerHTML={{ __html: site.justification_en }}
              />
            </div>
            <div className="min-h-8" />
            <div className="flex justify-evenly items-center w-24">
              <input
                type="checkbox"
                id={`select-site-${site.id}-${index}`}
                onChange={handleSelect}
                className="h-5 w-5"
                checked={
                  !!Array.from(selectedSites).find((s) => s.id_no == site.id_no)
                }
              />
              <label
                htmlFor={`select-site-${site.id}-${index}`}
                className="text-lg"
              >
                Select
              </label>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SiteSelector;
