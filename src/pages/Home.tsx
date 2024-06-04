import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export interface Quote {
  english: string;
  korean: string;
  memorized: boolean;
}

export interface Data {
  category: string;
  contents: Quote[];
}
const Home: FC = () => {
  const navigate = useNavigate();

  // 어레이 돌며 category 를 array로 뽑고

  const data: Data[] = [
    {
      category: "Sense and Sensability",
      contents: [
        {
          english:
            "Know your own happiness. Want for nothing but patience - or give it a more fascinating name: Call it hope.",
          korean:
            "당신의 행복을 알아라. 인내 외에는 아무것도 바라지 말라 - 아니면 그것을 더 매혹적인 이름으로 부르라: 그것을 희망이라고 부르라.",
          memorized: false,
        },
        {
          english: "To wish was to hope, and to hope was to expect.",
          korean: "바라는 것은 희망하는 것이고, 희망하는 것은 기대하는 것이다.",
          memorized: false,
        },
        {
          english:
            "It isn't what we say or think that defines us, but what we do.",
          korean:
            "우리를 정의하는 것은 우리가 말하거나 생각하는 것이 아니라 우리가 하는 일이다.",
          memorized: false,
        },
      ],
    },
    {
      category: "Emma",
      contents: [
        {
          english:
            "Nobody, who has not been in the interior of a family, can say what the difficulties of any individual of that family may be.",
          korean:
            "가족의 내부에 있지 않은 사람은 그 가족의 어느 개인의 어려움이 무엇인지 말할 수 없다.",
          memorized: false,
        },
        {
          english: "There is no charm equal to tenderness of heart.",
          korean: "마음의 부드러움만큼 매력적인 것은 없다.",
          memorized: false,
        },
      ],
    },
  ];
  return (
    <Flex flexDir="column" maxW={768} mx="auto" minH="100vh">
      <Text fontSize={48} fontWeight="bold" textAlign="center" mt={8}>
        Word App
      </Text>
      <Flex flexDir="column" mt={8} gap={4} px={4}>
        {data.map((v: Data, i: number) => (
          <Button
            key={v.category}
            variant="outline"
            colorScheme="green"
            justifyContent="start"
            isTruncated={true}
            onClick={() =>
              navigate(`/daily-word/${i + 1}`, {
                state: {
                  wordData: v.contents,
                },
              })
            }
          >
            <Text fontWeight="bold">{v.category}</Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
