import { useStore } from "@nanostores/react";
import { Cartesian3, Color } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import React, { useEffect, useRef } from "react";
import { Entity, Viewer, type CesiumComponentRef } from "resium";
import {
  FocusedSiteStore,
  OptimalRouteStore,
  SelectedSiteStore,
  SitesStore,
} from "../stores/sites.store";

const Map: React.FC = () => {
  const sites = useStore(SitesStore);
  const focusedSite = useStore(FocusedSiteStore);
  const selectedSites = useStore(SelectedSiteStore);
  const optimalRoute = useStore(OptimalRouteStore);

  const mapRef = useRef<CesiumComponentRef<typeof Viewer>>(null);

  useEffect(() => {
    // @ts-expect-error
    mapRef.current?.cesiumElement?.camera?.flyTo({
      destination: Cartesian3.fromDegrees(
        Number(focusedSite?.longitude) || 0,
        Number(focusedSite?.latitude) || 0,
        5000000
      ),
    });
  }, [focusedSite]);

  const buildPolyline = () => {
    if (selectedSites.size < 2) return <></>;
    const positions = Array.from(optimalRoute)
      .map((site_id) => {
        const site = Array.from(selectedSites).find(
          (site) => site.id_no === site_id
        );
        if (!site) return;

        return Cartesian3.fromDegrees(
          Number(site!.longitude),
          Number(site!.latitude)
        );
      })
      .filter(Boolean);

    if (positions.length != optimalRoute.size) return <></>;

    return (
      <Entity
        polyline={{
          // @ts-expect-error
          positions,
          width: 2,
          material: Color.WHITE,
        }}
      />
    );
  };

  return (
    <>
      <Viewer
        full
        infoBox={false}
        skyBox={false}
        timeline={false}
        animation={false}
        // @ts-expect-error
        ref={mapRef}
        style={{ minWidth: "515px" }}
      >
        {Array.from(sites).map((site, index) => {
          const isFocused = focusedSite?.id === site.id;
          const isSelected = !!Array.from(selectedSites).find(
            (s) => s.id_no === site.id_no
          );

          let color: Color;
          if (isFocused) {
            color = new Color(0.33, 0.51, 0.63);
          } else if (isSelected) {
            color = new Color(0.89, 0.75, 0.55);
          } else {
            color = Color.WHITE;
          }

          return (
            <Entity
              key={`${site.id}-${index}`}
              description={site.justification_en}
              name={site.name_en}
              point={{
                pixelSize: 20,
                color,
                outlineColor: Color.WHITE,
                outlineWidth: 1,
              }}
              position={Cartesian3.fromDegrees(
                Number(site.longitude),
                Number(site.latitude)
              )}
            />
          );
        })}

        {buildPolyline()}
      </Viewer>
    </>
  );
};

export default Map;
