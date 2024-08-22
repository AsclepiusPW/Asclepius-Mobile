import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleStyled: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 12,
  },
  subTitleStyled: {
    marginVertical: 6,
    fontSize: 16,
    flexDirection: "row",
  },
  paragraphStyled: {
    marginLeft: 13,
    fontSize: 16,
    lineHeight: 20,
    flexWrap: "wrap",
    maxWidth: "95%",
    paddingHorizontal: 4,
    marginVertical: 4,
    textAlign: "justify",
  },
  detailsStyled: {
    paddingVertical: 12,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  container: {
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "95%",
    minHeight: "20%",
    alignItems: "flex-start",

    borderRadius: 20,
  },
});

export default styles;
