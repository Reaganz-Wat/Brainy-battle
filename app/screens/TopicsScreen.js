import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
} from "react-native";
import COLORS from "../components/Colors";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import API from "../components/API";

const TopicsScreen = ({ navigation }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];
  const [topics, setTopics] = useState([]);

  const route = useRoute();
  const subject_id = route.params.subject_id;
  const class_id = route.params.class_id;

  // Dummy topics for demonstration
  // const topics = [
  //   { id: 1, name: "Introduction to Algebra 1" },
  //   { id: 2, name: "Equations" },
  //   { id: 3, name: "Inequalities" },
  //   { id: 4, name: "Functions" },
  //   { id: 5, name: "Graphs of Functions" },
  // ];

  const fetchTopics = async () => {
    try {
      const response = await axios.get(API.get_topics, {
        params: { subject_id: subject_id, class_id: class_id },
      });
      const topicsData = await response.data;
      setTopics(topicsData);
    } catch (err) {
      console.error("Error fetching topics:", err);
    }
  };

  useEffect(()=>{ fetchTopics() }, []);

  const handleSubtopicPress = (subtopic) => {
    setSelectedTopic(subtopic);
    setModalVisible(true);
    animateModal();
  };

  const animateModal = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleWatchTutorial = () => {
    // Navigate to TutorialScreen with necessary params
    navigation.navigate("TutorialScreen", {
      class_id: class_id,
      subject_id: subject_id,
      topic_id: selectedTopic.id,
    });
    setModalVisible(false);
  };

  const handleAttemptQuiz = () => {
    // Navigate to QuestionScreen with necessary params
    navigation.navigate("QuestionScreen", {
      class_id: class_id,
      subject_id: subject_id,
      topic_id: selectedTopic.id,
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Topics</Text>
      {topics.map((subtopic) => (
        <TouchableOpacity
          key={subtopic.id}
          style={styles.subtopicItem}
          onPress={() => handleSubtopicPress(subtopic)}
        >
          <Text style={styles.subtopicText}>{subtopic.topic}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal for subtopic options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Animated.View
          style={[
            styles.centeredView,
            {
              transform: [
                {
                  scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            }, {backgroundColor: "rgba(0, 0, 0, 0.5)"}
          ]}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleWatchTutorial}
            >
              <Text style={styles.optionText}>Watch Tutorial</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleAttemptQuiz}
            >
              <Text style={styles.optionText}>Attempt Quiz</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: 30,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.darkBlue,
  },
  subtopicItem: {
    backgroundColor: COLORS.lightBLUE,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  subtopicText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: COLORS.light,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionButton: {
    backgroundColor: COLORS.lightBLUE,
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    elevation: 3,
  },
  optionText: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "bold",
  },
});

export default TopicsScreen;
