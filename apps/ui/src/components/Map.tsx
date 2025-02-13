import { useStore } from "@nanostores/react";
import { Cartesian3, Color } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import React, { useEffect, useRef } from "react";
import { Entity, Viewer, type CesiumComponentRef } from "resium";
import {
  FocusedSiteStore,
  SelectedSiteStore,
  SitesStore,
} from "../stores/sites.store";

const Map: React.FC = () => {
  const sites = useStore(SitesStore);
  const focusedSite = useStore(FocusedSiteStore);
  const selectedSites = useStore(SelectedSiteStore);

  const mapRef = useRef<CesiumComponentRef<typeof Viewer>>(null);

  useEffect(() => {
    // @ts-expect-error
    mapRef.current?.cesiumElement?.camera?.flyTo({
      destination: Cartesian3.fromDegrees(
        focusedSite?.longitude || 0,
        focusedSite?.latitude || 0,
        5000000
      ),
    });
  }, [focusedSite]);

  return (
    <>
      <Viewer
        full
        infoBox={false}
        skyBox={false}
        timeline={false}
        // @ts-expect-error
        ref={mapRef}
        style={{ minWidth: "515px" }}
      >
        {Array.from(sites).map((site) => {
          const isSelected = focusedSite?.id === site.id;
          const color = isSelected ? new Color(1, 0, 0) : new Color(1, 1, 1);

          return (
            <Entity
              key={site.id}
              description={site.justification_en}
              name={site.name_en}
              point={{
                pixelSize: 10,
                color,
                outlineColor: Color.BLACK,
                outlineWidth: 2,
              }}
              position={Cartesian3.fromDegrees(site.longitude, site.latitude)}
            />
          );
        })}

        {selectedSites.size >= 2 && (
          <Entity
            polyline={{
              positions: Array.from(selectedSites).map((site) =>
                Cartesian3.fromDegrees(site.longitude, site.latitude)
              ),
              width: 2,
              material: Color.WHITE,
            }}
          />
        )}
      </Viewer>
    </>
  );
};

export default Map;
