import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

export type Column<T> = {
  key: keyof T;
  title: string;
  width?: number;
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  maxHeight?: number;
};

export function Table<T extends Record<string, any>>({
  columns,
  data,
  maxHeight,
}: TableProps<T>) {
  const { width: screenWidth } = useWindowDimensions();

  const availableWidth = screenWidth - 14;

  const totalWidth = columns.reduce(
    (sum, column) => sum + (column.width ?? 1),
    0
  );

  const getColumnWidth = (column: Column<T>) => {
    const proportion = column.width ?? 1;

    return (availableWidth * proportion) / totalWidth;
  };

  const getAlignment = (column: Column<T>) => {
    switch (column.align) {
      case 'center':
        return 'center';

      case 'right':
        return 'flex-end';

      default:
        return 'flex-start';
    }
  };

  return (
    <View
      style={[
        styles.container,
        maxHeight !== undefined && {
          maxHeight,
        },
      ]}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={[
            styles.table,
            {
              width: availableWidth,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.row}>
            {columns.map((column) => (
              <View
                key={String(column.key)}
                style={[
                  styles.cell,
                  styles.headerCell,
                  {
                    width: getColumnWidth(column),
                    alignItems: getAlignment(column),
                  },
                ]}
              >
                <Text style={styles.headerText}>
                  {column.title}
                </Text>
              </View>
            ))}
          </View>

          {/* Body */}
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator
            style={[
              styles.body,
              maxHeight !== undefined && {
                maxHeight,
              },
            ]}
          >
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
                      {
                        width: getColumnWidth(column),
                        alignItems: getAlignment(column),
                      },
                    ]}
                  >
                    {column.render ? (
                      column.render(item)
                    ) : (
                      <Text style={styles.cellText}>
                        {String(item[column.key])}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },

  table: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 5,
    overflow: 'hidden',
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

  body: {
    flexGrow: 0,
  },
});