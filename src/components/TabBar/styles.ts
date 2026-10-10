import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#3e6e82",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    paddingBottom: 20,
  },

  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  tabActiveIndicator: {
    position: "absolute",
    top: -13,
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
  },
});

export default styles;