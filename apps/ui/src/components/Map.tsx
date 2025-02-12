import { Cartesian3 } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import React from "react";
import { Entity, Viewer } from "resium";

const Map: React.FC = () => {
  return (
    <Viewer full infoBox={false} skyBox={false} timeline={false}>
      <Entity
        description="test"
        name="tokyo"
        point={{ pixelSize: 10 }}
        position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
      />
      <Entity
        description="test"
        name="tokyo"
        point={{ pixelSize: 10 }}
        position={Cartesian3.fromDegrees(28.767052, -35.681167, 100)}
      />
    </Viewer>
  );
};

export default Map;
