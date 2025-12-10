import { Box } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import * as turf from "@turf/turf";
import countriesGeoJSON from "@/assets/world.geo.json";
import type { GeoJsonFeatureCollection } from "@/types/geo";

const GlobeContainer = () => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const getCountry = (lat: number, lng: number, countriesGeoJSON: GeoJsonFeatureCollection) => {
    const pt = turf.point([lng, lat]);

    for (const feature of countriesGeoJSON.features) {
      if (turf.booleanPointInPolygon(pt, feature as Parameters<typeof turf.booleanPointInPolygon>[1])) {
        return feature.properties;
      }
    }

    return null;
  };

  const emitArc = useCallback((props: { lat: number; lng: number }) => {
    const country = getCountry(props.lat, props.lng, countriesGeoJSON as unknown as GeoJsonFeatureCollection);

    console.log({ country });
  }, []);

  return (
    <Box position="relative">
      <Globe
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        onGlobeClick={emitArc}
        ref={globeRef}
      />
    </Box>
  );
};

export default GlobeContainer;
