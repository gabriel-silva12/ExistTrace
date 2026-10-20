import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";

import type { ReactNode } from "react";
import type { QuizOption, QuizSelectorProps } from "./types";
import styles from "./styles";

const positions = [
  { left: "8%", top: "18%" },
  { right: "8%", top: "27%" },
  { left: "18%", top: "61%" },
  { right: "12%", top: "70%" },
] as const;

type AnimatedWordProps = {
  title: string;
  selected: boolean;
  dimmed: boolean;
  fontSize: number;
};

const AnimatedWord = ({
  title,
  selected,
  dimmed,
  fontSize,
}: AnimatedWordProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.spring(scale, {
        toValue: selected ? 1.3 : dimmed ? 0.82 : 1,
        friction: 8,
        tension: 55,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: dimmed ? 0.35 : 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [selected, dimmed, scale, opacity]);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ scale }],
        backgroundColor: selected ? "#3e6e82" : "transparent",
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize,
          color: selected ? "#ffffff" : "#344B59",
          fontWeight: selected ? "700" : "500",
          textAlign: "center",
          letterSpacing: 0.2,
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

type FloatingWordProps = {
  children: ReactNode;
  index: number;
};

const FloatingWord = ({ children, index }: FloatingWordProps) => {
  const offsetY = useRef(new Animated.Value(0)).current;
  const offsetX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const phase = index * 0.8;
    const duration = 3200 + index * 400;

    const createFloat = (
      value: Animated.Value,
      amplitude: number,
      delay: number,
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: amplitude,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
            isInteraction: false,
          }),
          Animated.timing(value, {
            toValue: -amplitude,
            duration: duration * 2,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
            isInteraction: false,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
            isInteraction: false,
          }),
        ]),
      );

    const animationY = createFloat(offsetY, 5, phase * 100);
    const animationX = createFloat(offsetX, 2, phase * 150);

    animationY.start();
    animationX.start();

    return () => {
      animationY.stop();
      animationX.stop();
    };
  }, [index, offsetX, offsetY]);

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: offsetX },
          { translateY: offsetY },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};

const QuizSelector = (props: QuizSelectorProps) => {
  const { options, fontSize = 27 } = props;

  const handleOptionPress = (id: string) => {
    if (props.selectionMode === "multiple") {
      const currentIds = props.selectedIds;

      if (currentIds.includes(id)) {
        props.onSelect(currentIds.filter((item) => item !== id));
        return;
      }

      if (
        props.maxSelections !== undefined &&
        currentIds.length >= props.maxSelections
      ) {
        return;
      }

      props.onSelect([...currentIds, id]);
      return;
    }

    props.onSelect(props.selectedId === id ? null : id);
  };

  const isOptionSelected = (id: string) => {
    if (props.selectionMode === "multiple") {
      return props.selectedIds.includes(id);
    }

    return props.selectedId === id;
  };

  const hasSelection =
    props.selectionMode === "multiple"
      ? props.selectedIds.length > 0
      : props.selectedId !== null;

  return (
    <View style={styles.container}>
      {options.map((option: QuizOption, index) => {
        const selected = isOptionSelected(option.id);
        const dimmed = hasSelection && !selected;
        const position = positions[index % positions.length];

        return (
          <Pressable
            key={option.id}
            onPress={() => handleOptionPress(option.id)}
            style={[styles.word, position]}
            accessibilityRole="button"
            accessibilityLabel={option.title ?? "Opção"}
            accessibilityState={{ selected }}
          >
            <FloatingWord index={index}>
              <AnimatedWord
                title={option.title ?? ""}
                selected={selected}
                dimmed={dimmed}
                fontSize={fontSize}
              />
            </FloatingWord>
          </Pressable>
        );
      })}
    </View>
  );
};

export default QuizSelector;