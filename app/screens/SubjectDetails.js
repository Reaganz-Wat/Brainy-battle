import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import SubjectCard from "../components/SubjectCard";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const SubjectDetails = ({ navigation }) => {

  // Get the id of the subjects
  const route = useRoute();
  const id = route.params.id;

  // now make a request to the backend and fetch the levels for the subjects


  const [subjects, setSubjects] = useState([
    {
      key: "1",
      sbj: "Level 01",
    },
    {
      key: "2",
      sbj: "Level 02",
    },
    {
      key: "3",
      sbj: "Level 03",
    },
    {
      key: "4",
      sbj: "Level 04",
    },
    {
      key: "5",
      sbj: "Level 05",
    },
    {
      key: "6",
      sbj: "Level 06",
    },
    {
      key: "7",
      sbj: "Level 07",
    },
    {
      key: "8",
      sbj: "Level 08",
    },
  ]);

  const sbjCard = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Pressable style={{ flex: 1 }} onPress={()=>{navigation.navigate("S")}}>
        <View style={styles.subjectCard}>
          <Image
            source={require("../../assets/dna.png")}
            style={styles.imageStyles}
          />
          <Text>{item.sbj}</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <FlatList
        data={subjects}
        numColumns={2}
        keyExtractor={(item) => item.key}
        renderItem={sbjCard}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: "#eee",
    borderBottomWidth: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    shadowColor: "#1c5da6",
  },
  cardPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 0 },
    borderBottomWidth: 0,
  },
});

export default SubjectDetails;
