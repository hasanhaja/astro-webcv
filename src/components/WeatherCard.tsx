import type { WeatherDataType } from "../schema/WeatherData";

type WeatherCardProps = {
  data: WeatherDataType | null;
};

const WeatherCard = (props: WeatherCardProps) => (
<div class="bg-blue-200 rounded-md p-10 mb-2">
  <h1 class="text-2xl p-1 font-medium">
    {props.data?.city.name}, {props.data?.city.country}
  </h1>
  <div class="flex gap-1">
    <h1 class="text-4xl font-bold text-right pt-3 flex-grow">
      {props.data?.list[0].main.temp} &#176;C
    </h1>
    <div class="pt-3 flex-grow">
      <h3 class="text-2xl text-center pb-1">
        (Feels like {props.data?.list[0].main.feels_like} &#176;C)
      </h3>
      <h3 class="text-xl text-center pb-1">
        Humidity {props.data?.list[0].main.humidity}%
      </h3>
    </div>
  </div>
</div>);

export default WeatherCard;