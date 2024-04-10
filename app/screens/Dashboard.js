import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import SubjectCard from "../components/SubjectCard";

const Dashboard = ({ navigation }) => {
  const [subjects, setSubjects] = useState([
    {
      key: "1",
      sbj: "Math",
    },
    {
      key: "2",
      sbj: "Science",
    },
    {
      key: "3",
      sbj: "English",
    },
    {
      key: "4",
      sbj: "Social Studies",
    },
    {
      key: "5",
      sbj: "Reading",
    },
    {
      key: "6",
      sbj: "Literacy I",
    },
    {
      key: "7",
      sbj: "Literacy II",
    },
    {
      key: "8",
      sbj: "Fun",
    },
  ]);

  const sbjCard = ({item}) => (
    <SubjectCard item={item} onPress={()=>{navigation.navigate("SubjectDetailsScreen")}}/>
  );

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
      }}
    >
      {/* Top header, greetingview */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Image
            source={require("../../assets/greetings.png")}
            style={styles.greetings}
          />
          <View>
            <Text>Hi Reagan,</Text>
            <Text>Great to see you again!</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.greetings}
        />
      </View>

      {/* Middle leaderboard view */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          elevation: 3,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Image
            source={require("../../assets/trophy.png")}
            style={styles.greetings}
          />
          <View>
            <Text style={{ fontSize: 20 }}>Ranking</Text>
            <Text style={{ alignSelf: "center", fontSize: 23 }}>09</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Image
            source={require("../../assets/medal.png")}
            style={styles.greetings}
          />
          <View>
            <Text style={{ fontSize: 20 }}>Point</Text>
            <Text style={{ alignSelf: "center", fontSize: 23 }}>426</Text>
          </View>
        </View>
      </View>

      {/* Main content view */}
      <View style={{flex: 1}}>
        <Text style={{ fontSize: 20, marginTop: 10, marginBottom: 5 }}>
          Let's Learn
        </Text>
        <FlatList
          data={subjects}
          numColumns={2}
          keyExtractor={(item) => item.key}
          renderItem={sbjCard}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={
            {justifyContent: 'space-between'}
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greetings: {
    width: 50,
    height: 50,
  },
  imageStyles: {
    width: 100,
    height: 100,
  },
  subjectCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    height: 200,
    elevation: 4,
  },
});

export default Dashboard;
