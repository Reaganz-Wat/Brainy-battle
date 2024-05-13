// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import COLORS from '../components/Colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import API from '../components/API';
// import { useRoute } from '@react-navigation/native';

// const TopicsScreen = ({ navigation }) => {
//   const route = useRoute();
//   const subject_id = route.params.id;
//   const [classId, setClassId] = useState(""); // Changed to camelCase
//   const [topics, setTopics] = useState([]);

//   // Function to retrieve class ID from AsyncStorage
//   const getClassId = async () => {
//     try {
//       // Retrieve the class ID from AsyncStorage
//       const classId = await AsyncStorage.getItem('classId');
//       setClassId(classId);
//       console.log('Retrieved class ID:', classId);
//     } catch (error) {
//       console.error('Error retrieving class ID:', error);
//     }
//   };

//   useEffect(() => {
//     getClassId();
//   }, []); // Run only once when the component mounts

//   // Function to fetch topics from the backend
//   const fetchTopics = async () => {
//     try {
//       if (!classId) return; // Return if classId is not set yet
//       console.log("Class_id: " + classId);
//       const response = await axios.get(API.get_topics, { params: { class_id: classId, subject_id: subject_id } });
//       setTopics(response.data);
//     } catch (error) {
//       console.error('Error fetching topics:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTopics();
//   }, [classId]); // Run fetchTopics when classId changes

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Topics</Text>
//       {topics.map((topic) => (
//         <TouchableOpacity
//           key={topic.id}
//           style={styles.topicItem}
//           onPress={() => navigation.navigate('SubTopicsScreen', { classId, topicId: topic.id })}
//         >
//           <Text style={styles.topicText}>{topic.topic}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.light,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//     marginTop: 30
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: COLORS.darkBlue,
//   },
//   topicItem: {
//     backgroundColor: COLORS.lightBlue,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   topicText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: COLORS.black,
//   },
// });

// export default TopicsScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import COLORS from '../components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API from '../components/API';
import { useRoute } from '@react-navigation/native';

const TopicsScreen = ({ navigation }) => {
  const route = useRoute();
  const subject_id = route.params.id;
  const [classId, setClassId] = useState("");
  const [topics, setTopics] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const animationValue = useState(new Animated.Value(0))[0];
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Function to retrieve class ID from AsyncStorage
  const getClassId = async () => {
    try {
      const classId = await AsyncStorage.getItem('classId');
      setClassId(classId);
      console.log('Retrieved class ID:', classId);
    } catch (error) {
      console.error('Error retrieving class ID:', error);
    }
  };

  useEffect(() => {
    getClassId();
  }, []);

  // Function to fetch topics from the backend
  const fetchTopics = async () => {
    try {
      if (!classId) return;
      console.log("Class_id: " + classId);
      const response = await axios.get(API.get_topics, { params: { class_id: classId, subject_id: subject_id } });
      setTopics(response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [classId]);

  const handleTopicPress = (topic) => {
    setSelectedTopic(topic);
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Topics</Text>
      {topics.map((topic) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.topicItem}
          onPress={() => handleTopicPress(topic)}
        >
          <Text style={styles.topicText}>{topic.topic}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal for topic options */}
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
            <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('SubTopicsScreen', { classId, topicId: selectedTopic.id })}>
              <Text style={styles.optionText}>View Subtopics</Text>
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
  topicItem: {
    backgroundColor: COLORS.lightBlue,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  topicText: {
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
    backgroundColor: COLORS.lightBlue,
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

export default TopicsScreen;