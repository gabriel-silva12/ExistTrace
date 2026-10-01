import { Pressable, StyleSheet, Text, View } from "react-native";

export interface GridItem {
  id: string;
  title?: string;
  subtitle?: string;
}

interface GridSelectorProps {
  items: GridItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const GridSelector = ({ items, selectedId, onSelect }: GridSelectorProps) => {
  const row1Items = items.slice(0, 2);
  const row2Items = items.slice(2, 4);

  const renderItem = (item: GridItem) => {
    const isSelected = selectedId === item.id;
    return (
      <Pressable
        key={item.id}
        style={({ pressed }) => [
          styles.gridCard,
          isSelected && styles.selectedGridCard,
          pressed && { opacity: 0.8 },
        ]}
        onPress={() => onSelect(item.id)}
      >
        <Text style={[styles.cardTitle, isSelected && styles.selectedText]}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.cardSubtitle,
            isSelected && styles.selectedSubtitleText,
          ]}
        >
          {item.subtitle}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.gridContainer}>
      <View style={styles.gridRow}>{row1Items.map(renderItem)}</View>
      <View style={styles.gridRow}>{row2Items.map(renderItem)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: { width: "100%", marginBottom: 30 },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  gridCard: {
    width: "49%",
    height: 120,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  selectedGridCard: { backgroundColor: "#407FA0", borderColor: "#eaeaed" },
  cardTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#111111",
    textAlign: "center",
  },
  cardSubtitle: { fontSize: 24, color: "#111111", textAlign: "center" },
  selectedText: { color: "#ffffff" },
  selectedSubtitleText: { color: "#ffffff" },
});

export default GridSelector;
