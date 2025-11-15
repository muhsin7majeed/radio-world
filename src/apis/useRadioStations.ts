import type { RadioStation } from "@/types/radio";
import { useQuery } from "@tanstack/react-query";

interface UseRadioStationsOptions {
  limit?: number;
  countryCode?: string;
}

const BASE_URL = "http://all.api.radio-browser.info/json/stations/bycountry";

const useRadioStations = (options: UseRadioStationsOptions = {}) => {
  const { limit = 10, countryCode } = options;

  return useQuery<RadioStation[], Error, RadioStation[]>({
    queryKey: ["radio-station", limit, countryCode],
    queryFn: async () => {
      if (!countryCode) {
        return [];
      }
      const url = `${BASE_URL}/${countryCode}?limit=${limit}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.json();
    },
    enabled: !!countryCode,
  });
};

export default useRadioStations;
