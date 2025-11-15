import { useQuery } from "@tanstack/react-query";

const useRadioServer = (baseurl: string) => {
  return useQuery<unknown, Error, unknown>({
    queryKey: ["radio-server", baseurl],
    queryFn: () => fetch(`${baseurl}`).then((res) => res.json()),
    enabled: Boolean(baseurl),
  });
};

export default useRadioServer;
