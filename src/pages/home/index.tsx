import useRadioStations from "@/apis/useRadioStations";
import type { RadioStation } from "@/types/radio";
import { useState } from "react";

const Home = () => {
  const [selectedStation, setSelectedStation] = useState<RadioStation | null>(null);
  const { data: stations, error: stationsError } = useRadioStations({
    limit: 5,
  });

  if (stationsError) {
    return <div>Error: Something went wrong</div>;
  }

  console.log(stations);

  return (
    <div>
      <h1>Radio Servers</h1>

      {stations?.map((station) => (
        <li
          key={station.stationuuid}
          onClick={() => setSelectedStation(station)}
          style={{
            cursor: "pointer",
            padding: "8px",
            backgroundColor: selectedStation?.stationuuid === station.stationuuid ? "#e0e0e0" : "transparent",
          }}
        >
          <strong>{station.name}</strong>
          {station.countrycode && <span> ({station.countrycode})</span>}
          {station.tags && <div>Tags: {station.tags}</div>}
          {station.bitrate && <div>Bitrate: {station.bitrate} kbps</div>}
        </li>
      ))}

      {selectedStation && (
        <>
          <h2>Radio Stations ({stations?.length ?? 0})</h2>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <ul></ul>
          </div>

          {selectedStation && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                border: "1px solid #ccc",
              }}
            >
              <h3>Now Playing: {selectedStation.name}</h3>
              {selectedStation.favicon && (
                <img
                  src={selectedStation.favicon}
                  alt={selectedStation.name}
                  style={{
                    width: "64px",
                    height: "64px",
                    marginBottom: "10px",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <audio
                src={selectedStation.url_resolved || selectedStation.url}
                controls
                autoPlay
                style={{ width: "100%", marginTop: "10px" }}
              />
              {selectedStation.homepage && (
                <div style={{ marginTop: "10px" }}>
                  <a href={selectedStation.homepage} target="_blank" rel="noopener noreferrer">
                    Visit Station Website
                  </a>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
