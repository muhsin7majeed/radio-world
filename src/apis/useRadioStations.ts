import type { RadioStation } from "@/types/radio";
import { useQuery } from "@tanstack/react-query";

interface UseRadioStationsOptions {
  baseurl?: string;
  limit?: number;
  offset?: number;
}

const useRadioStations = (options: UseRadioStationsOptions = {}) => {
  const { baseurl, limit = 20, offset = 0 } = options;

  return useQuery<RadioStation[], Error, RadioStation[]>({
    queryKey: ["radio-stations", baseurl, limit, offset],
    queryFn: async () => {
      if (!baseurl) {
        throw new Error("Base URL is required");
      }

      const url = `${baseurl}/json/stations`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "User-Agent": "muhsi.in/radio-world/1.0",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          limit,
          offset,
          countryCode: "DE",
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error(err);
          return [];
        });

      console.log(response);

      return response;
    },
    enabled: Boolean(baseurl),
  });
};

export default useRadioStations;
