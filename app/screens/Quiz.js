import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../components/Colors";
import BrainyButton from "../components/BrainyButton";

const Quiz = () => {
  const renderQuestion = () => (
    <View style={styles.questionBackground}>
      <Text
        style={[
          styles.question,
          {
            opacity: 0.5,
            fontSize: 18,
            alignSelf: "flex-start",
            marginLeft: 10,
          },
        ]}
      >
        1/1
      </Text>
      <Text style={{ fontSize: 25 }}>What is the capital City of Uganda ?</Text>
    </View>
  );
  const renderOptions = () => (
    <View style={styles.renderOptionsStyle}>
      <Text
        style={{
          fontSize: 20,
          alignSelf: "flex-start",
          color: "#402903",
          fontWeight: "bold",
        }}
      >
        Kampala
      </Text>
    </View>
  );
  const renderButton = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 20,
      }}
    >
      <BrainyButton
        text="Previous"
        faceColor="#E1B471"
        sidecolor="#402903"
        fontSize={20}
        textColor="#fff"
        someWidth={100}
      />
      <BrainyButton
        text="Next"
        faceColor="#E1B471"
        sidecolor="#402903"
        fontSize={20}
        textColor="#fff"
        someWidth={100}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      {/* QUESTION HEADER */}
      <View style={{marginTop: 30}}>
      {renderQuestion()}
      </View>

      {/* QUESTION OPTIONS */}
      <View style={{marginTop: 30}}>
        {renderOptions()}
        {renderOptions()}
        {renderOptions()}
        {renderOptions()}
      </View>

      {/* NAVIGATION BUTTONS */}
      {renderButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionBackground: {
    backgroundColor: "#fbdbacc6",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,

    borderWidth: 0.2,
    borderColor: "#402903",
    borderBottomWidth: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    shadowColor: "#1c5da6",
  },
  renderOptionsStyle: {
    alignItems: "center",
    backgroundColor: "#E1B471",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#402903",
    marginVertical: 5,
  },
});

export default Quiz;
