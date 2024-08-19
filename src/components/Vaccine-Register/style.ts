import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "95%",
    minHeight: 156,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 20,
  },
  styledIcon: { margin: 5, color: "rgba(104, 179, 159, 1)" },
  styledViewIcon: {
    marginHorizontal: 12,
    borderColor: "rgba(104, 179, 159, 1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderRadius: 10,
    width: 112,
    height: 112,
  },
  informations: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default styles;
