import { createSignal } from "solid-js";
import type { FormType } from "../schema/Form";
import { WeatherData, WeatherDataType } from "../schema/WeatherData";
import Searcher from "./Searcher";
import WeatherCard from "./WeatherCard";

// TODO add more fields so FormType contains unit and other parameters

// TODO better error handling
const fetchWeatherData = async (
  city: FormType = "London",
  unit: string = "metric",
): Promise<WeatherDataType | null> => {
  try {
    const data = await fetch(
      // `http://localhost:3000/api/weather?city=${city}`,
      `https://astro.hasanhaja.com/api/weather?city=${city}`,
      {
        headers: {
          accept: "application/json",
        },
      },
    );
    const json = await data.json();

    return WeatherData.parse(json);
  } catch (e) {
    console.error("API fetch or parse failed");
    console.error(e);
    return null;
  }
};

const WeatherSearch = () => {
  const [data, setData] = createSignal<WeatherDataType | null>(null);
  const [submitting, setSubmitting] = createSignal(false);

  return (
    <div>
      <Searcher
        handleSubmit={async (formData) => {
          setSubmitting(true);
          const resp = await fetchWeatherData(formData);
          setSubmitting(false);
          if (!resp) {
            console.error("No data found");
          }
          setData(resp);
        }}
      />
      {submitting() ? <p class="text-lg italic">Submitting...</p> : null}
      {data() ? <WeatherCard data={data()} /> : null}
    </div>
  );
};

export default WeatherSearch;