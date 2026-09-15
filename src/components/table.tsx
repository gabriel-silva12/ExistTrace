import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions
} from 'react-native';

export type Column<T> = {
  key: keyof T;
  title: string;
  width?: number;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
}: TableProps<T>) {

  const { width: screenWidth } = useWindowDimensions()

  const avaibleWidth = screenWidth - 14

  const columnWidth = avaibleWidth / columns.length

  return (
    <ScrollView 
    horizontal
    showsHorizontalScrollIndicator={false}
    >
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.row}>
          {columns.map((column) => (
            <View
              key={String(column.key)}
              style={[
                styles.cell,
                { width: columnWidth},
                styles.headerCell,
              ]}
            >
              <Text style={styles.headerText}>
                {column.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Rows */}
        {data.map((item, rowIndex) => (
          <View
            key={rowIndex}
            style={[
              styles.row,
              rowIndex % 2 === 1 && styles.alternateRow,
            ]}
          >
            {columns.map((column) => (
              <View
                key={String(column.key)}
                style={[
                  styles.cell,
                  { width: columnWidth}
                ]}
              >
                <Text style={styles.cellText}>
                  {String(item[column.key])}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 5,
    overflow: "hidden"
  },

  row: {
    flexDirection: 'row',
  },

  alternateRow: {
    backgroundColor: '#f8f8f8',
  },

  cell: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
  },

  headerCell: {
    backgroundColor: '#eee',
  },

  headerText: {
    fontWeight: 'bold',
  },

  cellText: {
    fontSize: 14,
  },
});