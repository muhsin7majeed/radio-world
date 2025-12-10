import { useCallback } from "react";
import * as turf from "@turf/turf";
import countriesGeoJSON from "@/assets/world.geo.json";
import type { GeoJsonFeatureCollection } from "@/types/geo";

const getCountry = (lat: number, lng: number, countriesGeoJSON: GeoJsonFeatureCollection) => {
  const pt = turf.point([lng, lat]);

  for (const feature of countriesGeoJSON.features) {
    if (turf.booleanPointInPolygon(pt, feature as Parameters<typeof turf.booleanPointInPolygon>[1])) {
      return feature.properties;
    }
  }

  return null;
};

const useGeoJson = () => {
  const getCountryFromCoordinates = useCallback((lat: number, lng: number) => {
    return getCountry(lat, lng, countriesGeoJSON as unknown as GeoJsonFeatureCollection);
  }, []);

  return {
    getCountryFromCoordinates,
    countriesGeoJSON: countriesGeoJSON as unknown as GeoJsonFeatureCollection,
  };
};

export default useGeoJson;
