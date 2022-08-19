import { createResource, createSignal, Suspense } from "solid-js";
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
  // TODO Make this dynamically speak to the right env
  const baseUrl = "https://astro.hasanhaja.com";
  try {
    const data = await fetch(
      `${baseUrl}/api/weather?city=${city}`,
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
  const [formData, setFormData] = createSignal<FormType | null>(null);
  const [weatherData] = createResource(formData, (city) => fetchWeatherData(city));

  return (
    <div>
      <Searcher
        handleSubmit={(data) => setFormData(data ?? null)}
      />
      <Suspense fallback={<p class="text-lg italic">Submitting...</p>}>
        {weatherData() && <WeatherCard data={weatherData() ?? null} />}
      </Suspense>
    </div>
  );
};

export default WeatherSearch;