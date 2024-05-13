import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import COLORS from '../components/Colors';
import { useRoute } from '@react-navigation/native';

const SubTopicsScreen = ({ navigation, route }) => {
  const { classId, topicId } = route.params;
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];

  // Dummy subtopics for demonstration
  const subtopics = [
    { id: 1, name: 'Introduction to Algebra 1' },
    { id: 2, name: 'Equations' },
    { id: 3, name: 'Inequalities' },
    { id: 4, name: 'Functions' },
    { id: 5, name: 'Graphs of Functions' },
  ];

  const handleSubtopicPress = (subtopic) => {
    setSelectedSubtopic(subtopic);
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
    navigation.navigate('TutorialScreen', { classId, topicId, subtopicId: selectedSubtopic.id });
    setModalVisible(false);
  };

  const handleAttemptQuiz = () => {
    // Navigate to QuestionScreen with necessary params
    navigation.navigate('QuestionScreen', { classId, topicId, subtopicId: selectedSubtopic.id });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Subtopics</Text>
      {subtopics.map((subtopic) => (
        <TouchableOpacity
          key={subtopic.id}
          style={styles.subtopicItem}
          onPress={() => handleSubtopicPress(subtopic)}
        >
          <Text style={styles.subtopicText}>{subtopic.name}</Text>
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
            },
          ]}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.optionButton} onPress={handleWatchTutorial}>
              <Text style={styles.optionText}>Watch Tutorial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleAttemptQuiz}>
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
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: COLORS.light,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  optionText: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default SubTopicsScreen;