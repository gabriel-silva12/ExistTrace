import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// 1. Export the item model type so screens can share it
export interface GridItem {
  id: string;
  title?: string;
  subtitle?: string;
}

// 2. Define the configuration parameters expected as props
interface GridSelectorProps {
  items: GridItem[]; // Must accept an array of exactly 4 items for the 2x2 shape
}

const GridSelector = ({ items }: GridSelectorProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Fallback protection: if a screen passes less than 4 items, build safety defaults
  const row1Items = items.slice(0, 2);
  const row2Items = items.slice(2, 4);

  return (
    <View style={styles.gridContainer}>
      
      {/* Row 1: Left and Right items */}
      <View style={styles.gridRow}>
        {row1Items.map((item) => {
          const isSelected = selectedItem === item.id;
          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.gridCard,
                isSelected && styles.selectedGridCard,
                pressed && { opacity: 0.8 }
              ]}
              onPress={() => setSelectedItem(item.id)}
            >
              <Text style={[styles.cardTitle, isSelected && styles.selectedText]}>{item.title}</Text>
              <Text style={[styles.cardSubtitle, isSelected && styles.selectedSubtitleText]}>{item.subtitle}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Row 2: Bottom Left and Right items */}
      <View style={styles.gridRow}>
        {row2Items.map((item) => {
          const isSelected = selectedItem === item.id;
          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.gridCard,
                isSelected && styles.selectedGridCard,
                pressed && { opacity: 0.8 }
              ]}
              onPress={() => setSelectedItem(item.id)}
            >
              <Text style={[styles.cardTitle, isSelected && styles.selectedText]}>{item.title}</Text>
              <Text style={[styles.cardSubtitle, isSelected && styles.selectedSubtitleText]}>{item.subtitle}</Text>
            </Pressable>
          );
        })}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: { width: "100%", marginBottom: 32,  },
  gridRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16,},
  gridCard: { width: "49%", height: 120, borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 8, padding: 0, justifyContent: "center", backgroundColor: "#ffffff" },
  selectedGridCard: { backgroundColor: "#0b0f45", borderColor: "#eaeaed" },
  cardTitle: { fontSize: 40, fontWeight: "bold", color: "#111111", marginBottom: 0, textAlign: "center" , padding: 0 },
  cardSubtitle: { fontSize: 24, color: "#1111111", textAlign: "center", marginBottom: 0 },
  selectedText: { color: "#ffffff" },
  selectedSubtitleText: { color: "#b0b5ff" },
});

export default GridSelector;