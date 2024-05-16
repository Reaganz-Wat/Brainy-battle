import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, StatusBar, TextInput } from "react-native";
import COLORS from '../components/Colors';
import ClassCard from "../components/ClassCard";
import { SimpleLineIcons } from "@expo/vector-icons";
import SideBarCard from "./SideBarCard";
import Slider from "../components/Slider";
import { ScrollView } from "react-native-gesture-handler";

const Dashboard = ({ navigation }) => {

  const [classes, setSubjects] = useState([
    {
      key: "1",
      class: "Primary One",
      pic: require("../../assets/p1.png"),
    },
    {
      key: "2",
      class: "Primary Two",
      pic: require("../../assets/p2.png"),
    },
    {
      key: "3",
      class: "Primay Three",
      pic: require("../../assets/p33.jpg"),
    },
  ]);

  const clascard = ({ item }) => (
    <ClassCard
      item={item}
      onPress={() => {
        // Navigate to different screens based on the clicked class
        switch (item.class) {
          case "Primary One":
            navigation.navigate("PrimaryOneDashboard", { id: item.key });
            break;
          case "Primary Two":
            navigation.navigate("PrimaryTwoDashboard", { id: item.key });
            break;
          case "Primay Three":
            navigation.navigate("PrimaryThreeDashboard", { id: item.key });
            break;
          default:
            break;
        }
      }}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      {/* Top header, greeting view */}
      <View style={styles.header}>
        <View style={styles.greetingContent}>
          <Image
            source={require("../../assets/greetings.png")}
            style={styles.greetings}
          />
          <View>
            <Text style={styles.greetingText}>Hi Reagan,</Text>
            <Text>Great to see you again!</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.greetings}
        />
      </View>
       <View style={styles.divider}></View>
       <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <SimpleLineIcons name="magnifier" size={24} color={COLORS.darkBlue} style={styles.searchIcon}/>
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          placeholderTextColor='gray'
          underlineColorAndroid='transparent'
        />
      </View>
      <View>
        <Image 
        source={require("../../assets/images/unnamed.png")}
        style={{height: 180, width: "100%",
        borderRadius: 8,
        marginTop: 10
        }}
        
        />
        <Text style={{
          position: 'absolute',
          fontWeight: '800',
          margin: 20,
          fontSize: 24,
          color: 'white'
        }}>
          Welcome
        </Text>
      </View>
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Choose Your Class</Text>
      </View>
      <View style={styles.divider}></View>
      <FlatList
        data={classes}
        numColumns={2}
        keyExtractor={(item) => item.key}
        renderItem={clascard}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Daily Scores</Text>
      </View>
      <View style={styles.divider}></View>
      <Slider/>
      <SideBarCard/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'white',
    padding: 10,
    marginTop:10,
    borderRadius: 5,
  },
  greetingContent: {
    flexDirection: "row",
    gap: 5,
  },
  greetings: {
    width: 40,
    height: 40,
  },
  greetingText: {
    fontWeight: '800',
  },
  divider: {
    height: 2,
    marginTop: 5,
    backgroundColor: COLORS.lightBLUE,
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    height: 40,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    color: COLORS.darkBlue,
  },
  sliderContainer: {
    height: 190,
    marginTop: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    position: 'absolute',
    margin: 10,
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
  },
  sectionTitle: {
    marginTop: 8,
  },
  sectionTitleText: {
    fontWeight: '600',
  },
  dailyScores: {
    height: 250,
    marginTop: 10,
  },
});

export default Dashboard;
