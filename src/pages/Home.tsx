import { Box, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import sampleData from "../assets/sampleData.json";
import "swiper/css";
const Home: FC = () => {
  return (
    <Flex
      flexDir={"column"}
      maxW={768}
      paddingX={4}
      gap={2}
      mx="auto"
      minH="100vh"
    >
      <Text fontSize={28} fontWeight="bold" textAlign="center" mt={8}>
        Voca Shake
      </Text>
      <Box maxW={768}>
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {sampleData.map((v) => (
            <SwiperSlide key={v.eng}>
              {/* <Button
              colorScheme="blue"
              variant={"outline"}
              paddingY={2}
              width={400}
              paddingX={3}
              key={v.eng}
              whiteSpace={"normal"}
            > */}
              {v.eng}
              {/* </Button> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

export default Home;
