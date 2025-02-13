import { atom } from "nanostores";
import type { Site } from "../@types/sites";

export const SitesStore = atom<Set<Site>>(new Set());
export const SelectedSiteStore = atom<Set<Site>>(new Set());
export const FocusedSiteStore = atom<Site | null>(null);

export const addSite = (site: Site) => {
  const currentValue = SitesStore.get();
  SitesStore.set(new Set([...currentValue.values(), site]));
};

export const selectSite = (site: Site) => {
  const currentValue = SelectedSiteStore.get();
  SelectedSiteStore.set(new Set([...currentValue.values(), site]));
};
