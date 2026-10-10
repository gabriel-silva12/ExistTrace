import { Pressable, Text } from "react-native";

import styles from "./styles";
import type { QuizCardProps } from "./types";

const QuizCard = ({
  option,
  selected,
  onPress,
  height,
}: QuizCardProps) => (
  <Pressable
    style={({ pressed }) => [
      styles.card,
      { height },
      selected && styles.selectedCard,
      pressed && styles.pressedCard,
    ]}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{ selected }}
  >
    {!!option.title && (
      <Text
        style={[styles.title, selected && styles.selectedText]}
      >
        {option.title}
      </Text>
    )}

    {!!option.subtitle && (
      <Text
        style={[styles.subtitle, selected && styles.selectedText]}
      >
        {option.subtitle}
      </Text>
    )}
  </Pressable>
);

export default QuizCard;