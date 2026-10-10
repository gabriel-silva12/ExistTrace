import { View } from "react-native";
import QuizCard from "./QuizCard.";
import styles from "./styles";
import { QuizOption, QuizSelectorProps } from "./types";

//Eu usei muita IA pra reescrever esse componente eu não sei quase nada que tá acontendo nesse codigo, mas eu sei pra que ele funciona

const chunkItems = <T,>(items: T[], size: number): T[][] => { //Não entedi quase nada disso
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
};


const QuizSelector = (props: QuizSelectorProps) => {
  const { options, columns = 2, cardHeight = 120, gap = 4 } = props;

  const columnCount = Math.max(1, Math.floor(columns));
  

  const rows = chunkItems(options, columnCount);

  const handleOptionPress = (id: string) => {
    if (props.selectionMode === "multiple") {
      const currentIds = props.selectedIds;
      const isSelected = currentIds.includes(id);
      const nextIds = isSelected
        ? currentIds.filter((item) => item !== id)
        : [...currentIds, id];
      props.onSelect(nextIds);
    } else {
      const currentId = props.selectedId;
      const nextId = currentId === id ? null : id;
      props.onSelect(nextId);
    }
  };

  const isOptionSelected = (id: string): boolean => {
    if (props.selectionMode === "multiple") {
      return props.selectedIds.includes(id);
    }
    return props.selectedId === id;
  };

  return (
    <View style={[styles.container, { gap }]}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { gap }]}>
          {row.map((option: QuizOption) => (
            <View key={option.id} style={styles.cell}>
              <QuizCard
                option={option}
                selected={isOptionSelected(option.id)}
                onPress={() => handleOptionPress(option.id)}
                height={cardHeight}
              />
            </View>
          ))}

          {Array.from(
            { length: columnCount - row.length },
            (_, index) => (
              <View key={`empty-${index}`} style={styles.cell} />
            )
          )}
        </View>
      ))}
    </View>
  );
};

export default QuizSelector;