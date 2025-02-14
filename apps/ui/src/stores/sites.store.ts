import { atom } from "nanostores";
import type { Site } from "../@types/sites";
import { BackendService } from "../services/backend";

export const SitesStore = atom<Set<Site>>(new Set());
export const SelectedSiteStore = atom<Set<Site>>(new Set());
export const FocusedSiteStore = atom<Site | null>(null);
export const OptimalRouteStore = atom<Set<Site["id_no"]>>(new Set());

export const addSite = (site: Site) => {
  const currentValue = SitesStore.get();
  SitesStore.set(new Set([...currentValue.values(), site]));
};

export const selectSite = (site: Site) => {
  const currentValue = SelectedSiteStore.get();
  SelectedSiteStore.set(new Set([...currentValue.values(), site]));
};

// Store Hooks:
SelectedSiteStore.listen(async (selectedSites) => {
  if (selectedSites.size > 2) {
    const ids = Array.from(selectedSites).map((site) => site.id_no);

    const result = await BackendService.get("/sites/optimized-route", {
      params: {
        sites: JSON.stringify(ids),
      },
    });

    OptimalRouteStore.set(new Set(result.data));
  } else if (selectedSites.size == 2) {
    const ids = Array.from(selectedSites).map((site) => site.id_no);
    OptimalRouteStore.set(new Set(ids));
  }
});
