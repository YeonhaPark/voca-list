import { Accordion, Box, Button, Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WordCard from "../components/WordCard";
import { FiArrowLeft } from "react-icons/fi";

const DailyWord: FC = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  // const wordData = state.wordData ?? null;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }

    console.log(state);
  }, []);

  if (!state) return <div>Loading...</div>;

  return (
    <Flex flexDir="column" maxW={768} mx="auto" minH="100vh">
      <Box>
        <Button
          onClick={() => navigate("/")}
          size={"md"}
          variant={"ghost"}
          colorScheme="transparent"
        >
          <FiArrowLeft />
        </Button>
      </Box>
      <Flex
        fontSize={24}
        fontWeight="bold"
        textAlign="center"
        justifyContent="center"
      >
        Day {state.wordData.day} - {state.wordData.title}
      </Flex>
      <Accordion mt={8} allowMultiple>
        {state.wordData.sentences.map((v: ISentence, i: number) => (
          <WordCard key={i} sentence={v} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default DailyWord;
