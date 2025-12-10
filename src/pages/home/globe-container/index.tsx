import { Box } from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import useGeoJson from "@/hooks/useGeoJson";

const GlobeContainer = () => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const { getCountryFromCoordinates } = useGeoJson();

  const emitArc = useCallback(
    (props: { lat: number; lng: number }) => {
      const country = getCountryFromCoordinates(props.lat, props.lng);

      console.log({ country });
    },
    [getCountryFromCoordinates],
  );

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
