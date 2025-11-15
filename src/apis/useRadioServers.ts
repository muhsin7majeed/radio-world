import type { RadioServerResponse } from "@/types/radio";
import { useQuery } from "@tanstack/react-query";

const useRadioServers = () => {
  return useQuery<RadioServerResponse[], Error, string[]>({
    queryKey: ["radio-servers"],
    queryFn: () => fetch("http://all.api.radio-browser.info/json/servers").then((res) => res.json()),
    select: (data) => data.map((server) => "https://" + server.name),
  });
};

export default useRadioServers;
