import {
  Heading,
  Select,
  Box,
  Stack,
  VStack,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import divisions from "./data/divisions";
import { fetchDailyWeather } from "./fetchDailyWeather";
import ToggleMode from "./togglemode";
import WeatherCard from "./weatherCard";
import { fetchCity } from "./fetchCity";

const Title = () => {
  return (
    <Box align='center'>
      <Heading size='xl'>Weather App</Heading>
    </Box>
  );
};

export default function Weather() {
  const initialDivisionId = "3";

  const getDivision = (divisionId) => {
    return divisions.find((division) => division.id === divisionId);
  };
  const division = getDivision(initialDivisionId);

  const [divisionId, setDivisionId] = useState(initialDivisionId);
  const [name, setName] = useState(division.name);
  const [lat, setLat] = useState(division.lat);
  const [long, setLong] = useState(division.long);
  const [dailyWeatherData, setDailyWeatherData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = () => {
    fetchDailyWeather(lat, long)
      .then((dailyData) => {
        setDailyWeatherData(dailyData);
        setIsloading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const fetchCityData = () => {
    fetchCity(lat, long)
      .then((city) => {
        setName(`${city.state}, ${city.country}`);
        setIsloading(false);
      })
      .catch((error) => {
        setError(error);
      });
  };
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("your browswer doesn't support geolocation");
      fetchWeatherData();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
          fetchWeatherData();
          fetchCityData();
          setIsloading(false);
        },
        (error) => {
          fetchWeatherData();
          alert("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchWeatherData();
    setIsloading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divisionId]);

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <Title />
        <Flex flexDir='row' justifyContent='space-between'>
          <Box pt={6}>
            <ToggleMode />
          </Box>
          <Box />

          <Box>
            <FormControl minWidth='200px' px={4}>
              <FormLabel>Select City</FormLabel>
              <Select
                variant='filled'
                w='200px'
                value={divisionId}
                onChange={(event) => {
                  const divisionId = event.target.value;
                  const { name, lat, long } = getDivision(divisionId);
                  setDivisionId(event.target.value);
                  setName(name);
                  setLat(lat);
                  setLong(long);
                }}
              >
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Flex>
        {error ? (
          <Box mt={5} display='flex' flexDir='column' alignItems='center'>
            <Text size='md'>{error}</Text>
          </Box>
        ) : isLoading ? (
          <Box mt={5} display='flex' flexDir='column' alignItems='center'>
            <Text size='xl'>Loading</Text>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>
        ) : (
          <VStack spacing={4}>
            {dailyWeatherData.map((item) => (
              <WeatherCard key={item.dt} item={item} title={name} />
            ))}
          </VStack>
        )}
      </Stack>
    </Box>
  );
}
