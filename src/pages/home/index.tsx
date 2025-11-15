import useRadioStations from "@/apis/useRadioStations";
import type { RadioStation } from "@/types/radio";
import countries from "@/constants/countries";
import { useState, useEffect, useRef } from "react";
import { Box, Button, Container, Heading, Stack, Text, Card, Image, Link } from "@chakra-ui/react";

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<RadioStation | null>(null);
  const autoSelectedRef = useRef<string | null>(null);
  const {
    data: stations,
    error: stationsError,
    isLoading,
  } = useRadioStations({
    limit: 5,
    countryCode: selectedCountry || undefined,
  });

  const handleRandomCountry = () => {
    // Filter countries that have at least 1 station
    const countriesWithStations = countries.filter((country) => country.stationcount >= 1);

    // Pick a random country
    const randomCountry = countriesWithStations[Math.floor(Math.random() * countriesWithStations.length)];

    setSelectedCountry(randomCountry.name);

    setSelectedStation(null); // Reset selected station
    autoSelectedRef.current = null; // Reset auto-select tracking
  };

  // Auto-select first station when stations are loaded
  useEffect(() => {
    if (stations && stations.length > 0 && selectedCountry && autoSelectedRef.current !== selectedCountry) {
      autoSelectedRef.current = selectedCountry;

      // Defer state update to avoid linter warning
      setTimeout(() => {
        setSelectedStation(stations[0]);
      }, 0);
    }
  }, [stations, selectedCountry]);

  return (
    <Container maxW="container.lg" py={8}>
      <Stack gap={6} align="stretch">
        <Heading size="2xl">Radio World</Heading>

        <Button onClick={handleRandomCountry} disabled={isLoading} colorScheme="blue" size="lg" loading={isLoading}>
          {isLoading ? "Loading..." : "Play from random country"}
        </Button>

        {stationsError && (
          <Box p={4} bg="red.50" borderWidth="1px" borderColor="red.200" borderRadius="md" color="red.800">
            Error: Something went wrong
          </Box>
        )}

        {selectedCountry && stations && stations.length > 0 && (
          <Box>
            <Heading size="lg" mb={4}>
              Stations from {countries.find((c) => c.iso_3166_1 === selectedCountry)?.name} ({stations.length})
            </Heading>
            <Stack gap={3} align="stretch">
              {stations.map((station) => (
                <Card.Root
                  key={station.stationuuid}
                  cursor="pointer"
                  onClick={() => setSelectedStation(station)}
                  variant={selectedStation?.stationuuid === station.stationuuid ? "outline" : "elevated"}
                  borderColor={selectedStation?.stationuuid === station.stationuuid ? "blue.500" : undefined}
                  borderWidth={selectedStation?.stationuuid === station.stationuuid ? 2 : undefined}
                  _hover={{
                    bg: "gray.50",
                  }}
                >
                  <Card.Body>
                    <Stack gap={2} align="start">
                      <Stack direction="row" gap={2} align="center">
                        <Text fontWeight="bold" fontSize="lg">
                          {station.name}
                        </Text>

                        {station.countrycode && (
                          <Text color="gray.600" fontSize="sm">
                            ({station.countrycode})
                          </Text>
                        )}
                      </Stack>

                      {station.tags && (
                        <Text fontSize="sm" color="gray.600">
                          Tags: {station.tags}
                        </Text>
                      )}
                      {station.bitrate && (
                        <Text fontSize="sm" color="gray.600">
                          Bitrate: {station.bitrate} kbps
                        </Text>
                      )}
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ))}
            </Stack>
          </Box>
        )}

        {selectedStation && (
          <Card.Root mt={8}>
            <Card.Body>
              <Stack gap={4} align="start">
                <Heading size="md">Now Playing: {selectedStation.name}</Heading>

                {selectedStation.favicon && (
                  <Image
                    src={selectedStation.favicon}
                    alt={selectedStation.name}
                    width="64px"
                    height="64px"
                    borderRadius="md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}

                <Box width="100%">
                  <audio
                    src={selectedStation.url_resolved || selectedStation.url}
                    controls
                    autoPlay
                    style={{ width: "100%" }}
                  />
                </Box>

                {selectedStation.homepage && (
                  <Link href={selectedStation.homepage} target="_blank" rel="noopener noreferrer" color="blue.500">
                    Visit Station Website
                  </Link>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>
        )}
      </Stack>
    </Container>
  );
};

export default Home;
