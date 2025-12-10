import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import useGeoJson from "@/hooks/useGeoJson";
import useReverseGeoCode from "@/apis/useReverseGeoCode";
import type { GeoJsonFeature, GeoPosition } from "@/types/geo";

const GlobeContainer = () => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [globePosition, setGlobePosition] = useState<GeoPosition>({ lat: 0, lng: 0 });
  const { getCountryFromCoordinates } = useGeoJson();
  // const { data: reverseGeoCode } = useReverseGeoCode({
  //   latitude: globePosition.lat,
  //   longitude: globePosition.lng,
  // });

  useEffect(() => {
    if (!globeRef.current) return;

    let frame: number;
    let lastCountry: string | null = null;

    const rotate = () => {
      const currentPOV = globeRef.current!.pointOfView();
      const newLng = (currentPOV.lng + 0.05) % 360;
      const newLat = currentPOV.lat;

      globeRef.current!.pointOfView({
        lat: newLat,
        lng: newLng,
        altitude: currentPOV.altitude,
      });

      const pov = globeRef.current!.pointOfView();

      const country = getCountryFromCoordinates(pov.lat, pov.lng);

      if (country && country.name !== lastCountry) {
        lastCountry = country.name;

        setGlobePosition({ lat: pov.lat, lng: pov.lng });
      }

      frame = requestAnimationFrame(rotate);
    };

    rotate();
    return () => cancelAnimationFrame(frame);
  }, [getCountryFromCoordinates]);

  const emitArc = useCallback((props: GeoPosition) => {
    // On click, get position
    console.log({ props });
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
