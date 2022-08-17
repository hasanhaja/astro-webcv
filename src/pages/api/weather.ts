import type { FormType } from "../../schema/Form";
import { WeatherData, WeatherDataType } from "../../schema/WeatherData";
import * as qs from "query-string";
import { WeatherSearchQuery, WeatherSearchQueryType } from "../../schema/WeatherSearchQuery";

const fetchWeatherData = async (
  apiKey?: string,
  city: FormType = "London",
  unit: string = "metric",
): Promise<WeatherDataType | null> => {
  try {
    if (!apiKey) {
      console.error("API key not found");
      return null;
    }

    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&apiKey=${apiKey}&units=${unit}`,
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

export async function get({request: req}) {
  const { query } = qs.parseUrl(req.url);
  try {
    const searchQuery = WeatherSearchQuery.parse(query) as WeatherSearchQueryType;
    
    const data = await fetchWeatherData(import.meta.env.WEATHER_API_KEY, searchQuery.city);

    if (!data) {
      // TODO Handle this error properly
      console.log("no data");
      throw new Error("No data found");
    }
  
    return new Response(JSON.stringify(data), {
      status: 200
    });
  } catch (ex) {
    console.log("really no data");
    return new Response(null, {
      status: 404,
      statusText: "No data found",
    });
  }
}