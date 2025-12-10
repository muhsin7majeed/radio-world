import type { ReverseGeoCodeResponse } from "@/types/geo";
import { useQuery } from "@tanstack/react-query";

interface UseReverseGeoCodeOptions {
  latitude?: number;
  longitude?: number;
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const useReverseGeoCode = (options: UseReverseGeoCodeOptions = {}) => {
  const { latitude, longitude } = options;

  return useQuery<ReverseGeoCodeResponse, Error, ReverseGeoCodeResponse>({
    queryKey: ["reverse-geocode", latitude, longitude],
    queryFn: async () => {
      const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.json();
    },
    enabled: !!latitude && !!longitude,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });
};

export default useReverseGeoCode;
