import { StyleSheet } from "react-native";

export const tableStyles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 6,
    fontSize: 12,
  },
  header: {
    backgroundColor: "#e6e6e6",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleCell: {
    flex: 4,
    backgroundColor: "#fff176",
    fontWeight: "bold",
    textAlign: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  blueRow: {
    backgroundColor: "#dbe9f4",
  },
});
