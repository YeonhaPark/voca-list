import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiVolume2 } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const AnotherDailyWord = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [currentSentenceNumber, setCurrentSentenceNumber] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const onClickAudio = async () => {
    const { data } = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${
        import.meta.env.VITE_TTS_KEY
      }`,
      {
        input: {
          text: state.wordData.sentences[currentSentenceNumber]?.english,
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
  const onClickPrev = () => {
    if (currentSentenceNumber === 0) {
      setCurrentSentenceNumber(state.wordData.sentences.length - 1);
    } else {
      setCurrentSentenceNumber((prev) => prev - 1);
    }
  };
  const onClickNext = () => {
    if (currentSentenceNumber === state.wordData.sentences.length - 1) {
      setCurrentSentenceNumber(0);
    } else {
      setCurrentSentenceNumber((prev) => prev + 1);
    }
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
      <Flex
        fontSize={24}
        fontWeight="bold"
        textAlign="center"
        mt={8}
        justifyContent="center"
      >
        Day {state.wordData.day} - {state.wordData.title}
      </Flex>
      <Flex mt={8} flexDir={"column"} px={4}>
        <Text>{state.wordData.sentences[currentSentenceNumber]?.english}</Text>
        <Text
          onClick={() => setIsClicked((prev) => !prev)}
          bgColor={isClicked ? "white" : "black"}
          mt={2}
        >
          {state.wordData.sentences[currentSentenceNumber]?.korean}
        </Text>
        <Flex mt={2} gap={2}>
          <Button
            variant="ghost"
            colorScheme="green"
            size="sm"
            mb={2}
            ml={2}
            onClick={onClickPrev}
          >
            <FiArrowLeft />
          </Button>
          <Button
            variant="ghost"
            colorScheme="green"
            size="sm"
            mb={2}
            ml={2}
            onClick={onClickNext}
          >
            <FiArrowRight />
          </Button>
          <Button
            variant="ghost"
            colorScheme="green"
            size="sm"
            mb={2}
            ml={2}
            onClick={onClickAudio}
          >
            <FiVolume2 />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AnotherDailyWord;
