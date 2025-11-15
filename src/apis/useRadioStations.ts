import type { RadioStation } from "@/types/radio";
import { useQuery } from "@tanstack/react-query";

interface UseRadioStationsOptions {
  limit?: number;
}

const BASE_URL = "http://all.api.radio-browser.info/json/stations/bycountry/india";

const useRadioStations = (options: UseRadioStationsOptions = {}) => {
  const { limit = 10 } = options;

  return useQuery<RadioStation[], Error, RadioStation[]>({
    queryKey: ["radio-station", limit],
    queryFn: async () => {
      const url = `${BASE_URL}?limit=${limit}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.json();
    },
  });
};

export default useRadioStations;
