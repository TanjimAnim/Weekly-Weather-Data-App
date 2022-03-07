import React from "react";
import {
  Heading,
  Text,
  Box,
  Stack,
  Spacer,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import Skycons, { SkyconsType } from "react-skycons";

const skyiconMap = {
  Clear: SkyconsType.CLEAR_DAY,
  Clouds: SkyconsType.CLOUDY,
  Snow: SkyconsType.SNOW,
  Drizzle: SkyconsType.RAIN,
  Rain: SkyconsType.SLEET,
  Fog: SkyconsType.FOG,
};

export default function WeatherCard({ item, title }) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const bg = useColorModeValue("white", "#1A202C");
  const color = useColorModeValue("black", "white");

  return (
    <Stack
      spacing={4}
      bg={bg}
      w='100%'
      p={5}
      color={color}
      maxW='2xl'
      borderWidth='1px'
      borderRadius='lg'
    >
      <Flex justifyContent='space-between'>
        <Box>
          <Heading as='h4' size='md'>
            {title}
          </Heading>
          <Text>
            {new Date(item.dt * 1000).toLocaleDateString(undefined, options)}
          </Text>
        </Box>

        <Box>
          <Heading size='md' alignItems='right' transition='0.6'>
            {item.temp.day} &#8451;
          </Heading>
          <Text size='sm' alignItems='right'>
            Feels like: {item.feels_like.day}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Flex>
          <Skycons
            color={color}
            type={skyiconMap[item.weather[0].main]}
            animate={true}
            size={60}
            resizeClear={true}
          />
          <Text pl='20px' pt='10px'>
            {item.weather[0].main}
          </Text>
          <Spacer />
          <Box>
            <Text align='right'>
              <Text as='span' fontWeight='bold'>
                Humidity
              </Text>
              : {item.humidity}%
            </Text>
            <Text align='right'>
              <Text as='span' fontWeight='bold'>
                Wind Speed
              </Text>
              : {item.wind_speed} km/h
            </Text>
          </Box>
        </Flex>
      </Box>
      <Accordion allowToggle mt='15px'>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              View More Details
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Flex w='100%' justifyContent='space-between'>
              <Box>
                <Text>
                  <Text as='span' fontWeight='bold'>
                    Sunrise:{" "}
                  </Text>
                  {new Date(item.sunrise * 1000).toLocaleTimeString()}
                </Text>
                <Text>
                  <Text as='span' fontWeight='bold'>
                    Sunset:{" "}
                  </Text>
                  {new Date(item.sunset * 1000).toLocaleTimeString()}
                </Text>
              </Box>

              <Box>
                <Text>
                  <Text as='span' fontWeight='bold'>
                    Min Temp of the day:{" "}
                  </Text>
                  {item.temp.min} &#8451;
                </Text>
                <Text>
                  <Text as='span' fontWeight='bold'>
                    Max Temp of the day:{" "}
                  </Text>
                  {item.temp.max} &#8451;
                </Text>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
