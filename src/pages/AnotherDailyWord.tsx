import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";

import { useEffect, useState } from "react";
import { FiArrowLeft, FiVolume2 } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { Quote } from "./Home";

const AnotherDailyWord = () => {
  const [lang, setLang] = useState<string>("english");
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((prevIndex) => (prevIndex + 1) % state.wordData.length),
    onSwipedRight: () =>
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + state.wordData.length) % state.wordData.length
      ),
    trackMouse: true,
  });
  ``;
  const handleSwiperClick = () => {
    lang === "english" ? setLang("korean") : setLang("english");
  };
  const onClickAudio = async (text: string) => {
    const { data } = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${
        import.meta.env.VITE_TTS_KEY
      }`,
      {
        input: {
          text,
        },
        voice: {
          languageCode: "en-US",
          ssmlGender: "NEUTRAL",
        },
        audioConfig: {
          audioEncoding: "MP3",
        },
      }
    );
    const binaryData = atob(data.audioContent);
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });
    const newAudio = new Audio(URL.createObjectURL(blob));
    document.body.appendChild(newAudio);

    newAudio.play();
  };

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, []);
  return (
    <Flex
      position="relative"
      flexDir="column"
      maxW={768}
      mx="auto"
      minH="100vh"
      {...handlers}
      style={{ display: "flex", overflow: "hidden", width: "300px" }}
    >
      <Button
        m={4}
        position="absolute"
        variant="ghost"
        colorScheme="transparent"
        onClick={() => navigate("/")}
      >
        <FiArrowLeft />
      </Button>
      <div
        style={{
          display: "flex",
          transform: `translateX(-${index * 300}px)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {state.wordData.map((card: Quote) => (
          <Flex
            style={{
              minWidth: "300px",
              textAlign: "center",
              padding: "20px",
              background: "#ddd",
              margin: "5px",
            }}
            mt={8}
            flexDir={"column"}
            px={4}
            key={card.english}
          >
            <Text onClick={handleSwiperClick}>
              {lang === "english" ? card.english : card.korean}
            </Text>
            <Flex mt={2} gap={2}>
              <Button
                variant="ghost"
                colorScheme="green"
                size="sm"
                mb={2}
                ml={2}
                onClick={() => onClickAudio(card.english)}
              >
                <FiVolume2 />
              </Button>
            </Flex>
          </Flex>
        ))}
      </div>
    </Flex>
  );
};

export default AnotherDailyWord;
