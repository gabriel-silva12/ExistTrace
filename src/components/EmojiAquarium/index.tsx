import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

import type { QuizOption } from "@/components/QuizSelector/types";
import type { EmojiAquariumProps } from "./types";

import { styles } from "./styles";

const EMOJI_SIZE = 76;
const EDGE_PADDING = 8;
const MIN_DISTANCE = EMOJI_SIZE + 12;
const MAX_ATTEMPTS = 40;
const MIN_DURATION = 3500;
const MAX_DURATION = 6500;

type Point = {
  x: number;
  y: number;
};

type FloatingEmojiProps = {
  option: QuizOption;
  initialPosition: Point;
  width: number;
  height: number;
  selected: boolean;
  disabled: boolean;
  onSelect: (id: string) => void;
  getNextDestination: (id: string) => Point;
};

function randomBetween(min: number, max: number): number {
  return min + Math.random() * Math.max(0, max - min);
}

function distanceBetween(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function createInitialPositions(
  count: number,
  width: number,
  height: number,
): Point[] {
  if (count === 0) return [];

  const usableWidth = Math.max(0, width - EMOJI_SIZE - EDGE_PADDING * 2);
  const usableHeight = Math.max(0, height - EMOJI_SIZE - EDGE_PADDING * 2);

  const columns = Math.max(
    1,
    Math.floor((width - EDGE_PADDING * 2) / MIN_DISTANCE),
  );

  const rows = Math.ceil(count / columns);
  const positions: Point[] = [];

  for (let i = 0; i < count; i++) {
    const column = i % columns;
    const row = Math.floor(i / columns);

    const x =
      columns === 1
        ? usableWidth / 2 + EDGE_PADDING
        : EDGE_PADDING + (column / (columns - 1)) * usableWidth;

    const y =
      rows === 1
        ? usableHeight / 2 + EDGE_PADDING
        : EDGE_PADDING + (row / (rows - 1)) * usableHeight;

    positions.push({ x, y });
  }

  return positions;
}

function FloatingEmoji({
  option,
  initialPosition,
  width,
  height,
  selected,
  disabled,
  onSelect,
  getNextDestination,
}: FloatingEmojiProps) {
  const position = useRef(new Animated.ValueXY(initialPosition)).current;

  const scale = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    position.setValue(initialPosition);
  }, [initialPosition, position]);

  useEffect(() => {
    if (width < EMOJI_SIZE || height < EMOJI_SIZE || disabled) {
      return;
    }

    let active = true;

    const move = () => {
      if (!active) return;

      const destination = getNextDestination(option.id);
      const duration = randomBetween(MIN_DURATION, MAX_DURATION);

      const animation = Animated.parallel([
        Animated.timing(position.x, {
          toValue: destination.x,
          duration,
          useNativeDriver: false,
        }),
        Animated.timing(position.y, {
          toValue: destination.y,
          duration,
          useNativeDriver: false,
        }),
      ]);

      animationRef.current = animation;

      animation.start(({ finished }) => {
        if (finished && active) {
          move();
        }
      });
    };

    move();

    return () => {
      active = false;
      animationRef.current?.stop();
      animationRef.current = null;
    };
  }, [width, height, disabled, option.id, position, getNextDestination]);

  useEffect(() => {
    const animation = Animated.spring(scale, {
      toValue: selected ? 1.15 : 1,
      useNativeDriver: false,
      speed: 18,
      bounciness: 8,
    });

    animation.start();

    return () => animation.stop();
  }, [selected, scale]);

  return (
    <Animated.View
      style={[
        styles.emoji,
        selected && styles.emojiSelected,
        {
          transform: [...position.getTranslateTransform(), { scale }],
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Selecionar ${option.title}`}
        accessibilityState={{
          selected,
          disabled: disabled && !selected,
        }}
        disabled={disabled && !selected}
        onPress={() => onSelect(option.id)}
        style={styles.emojiPressable}
      >
        <Text style={styles.emojiText}>{option.title}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function EmojiAquarium({
  options,
  selectedIds,
  onSelect,
  disabled = false,
}: EmojiAquariumProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const initialPositions = useMemo(
    () => createInitialPositions(options.length, size.width, size.height),
    [options.length, size.width, size.height],
  );

  // Guarda o destino reservado de cada emoji para reduzir colisões.
  const destinationsRef = useRef<Record<string, Point>>({});

  const positionsById = useMemo(
    () =>
      Object.fromEntries(
        options.map((option, index) => [
          option.id,
          initialPositions[index] ?? { x: EDGE_PADDING, y: EDGE_PADDING },
        ]),
      ) as Record<string, Point>,
    [options, initialPositions],
  );

  // Atualiza o registro quando as opções ou dimensões mudam.
  destinationsRef.current = positionsById;

  const getNextDestination = useCallback(
    (id: string): Point => {
      const maxX = Math.max(
        EDGE_PADDING,
        size.width - EMOJI_SIZE - EDGE_PADDING,
      );

      const maxY = Math.max(
        EDGE_PADDING,
        size.height - EMOJI_SIZE - EDGE_PADDING,
      );

      const others = Object.entries(destinationsRef.current)
        .filter(([otherId]) => otherId !== id)
        .map(([, point]) => point);

      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const candidate = {
          x: randomBetween(EDGE_PADDING, maxX),
          y: randomBetween(EDGE_PADDING, maxY),
        };

        if (
          others.every(
            (other) => distanceBetween(candidate, other) >= MIN_DISTANCE,
          )
        ) {
          destinationsRef.current[id] = candidate;
          return candidate;
        }
      }

      // Em espaços apertados, permite o movimento em vez de travar.
      const fallback = {
        x: randomBetween(EDGE_PADDING, maxX),
        y: randomBetween(EDGE_PADDING, maxY),
      };

      destinationsRef.current[id] = fallback;
      return fallback;
    },
    [size.width, size.height],
  );

  return (
    <View
      style={styles.aquarium}
      onLayout={({ nativeEvent }) => {
        const { width, height } = nativeEvent.layout;

        setSize((previous) =>
          previous.width === width && previous.height === height
            ? previous
            : { width, height },
        );
      }}
    >
      {size.width > 0 &&
        size.height > 0 &&
        options.map((option, index) => (
          <FloatingEmoji
            key={option.id}
            option={option}
            initialPosition={initialPositions[index]}
            width={size.width}
            height={size.height}
            selected={selectedIds.includes(option.id)}
            disabled={disabled}
            onSelect={onSelect}
            getNextDestination={getNextDestination}
          />
        ))}
    </View>
  );
}
