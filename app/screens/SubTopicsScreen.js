// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import COLORS from '../components/Colors';

// const SubTopicsScreen = ({ navigation, route }) => {
//   const { classId, topicId } = route.params;

//   // Dummy subtopics for demonstration
//   const subtopics = [
//     { id: 1, name: 'Introduction to Algebra 1' },
//     { id: 2, name: 'Equations' },
//     { id: 3, name: 'Inequalities' },
//     { id: 4, name: 'Functions' },
//     { id: 5, name: 'Graphs of Functions' },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Subtopics</Text>
//       {subtopics.map((subtopic) => (
//         <TouchableOpacity
//           key={subtopic.id}
//           style={styles.subtopicItem}
//           onPress={() => navigation.navigate('TutorialScreen', { classId, topicId, subtopicId: subtopic.id })}
//         >
//           <Text style={styles.subtopicText}>{subtopic.name}</Text>
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
//   subtopicItem: {
//     backgroundColor: COLORS.lightBLUE,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   subtopicText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: COLORS.black,
//   },
// });

// export default SubTopicsScreen;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
// import COLORS from '../components/Colors';

// const SubTopicsScreen = ({ navigation, route }) => {
//   const { classId, topicId } = route.params;
//   const [selectedSubtopic, setSelectedSubtopic] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Dummy subtopics for demonstration
//   const subtopics = [
//     { id: 1, name: 'Introduction to Algebra 1' },
//     { id: 2, name: 'Equations' },
//     { id: 3, name: 'Inequalities' },
//     { id: 4, name: 'Functions' },
//     { id: 5, name: 'Graphs of Functions' },
//   ];

//   // Function to handle subtopic selection
//   const handleSubtopicSelect = (subtopic) => {
//     setSelectedSubtopic(subtopic);
//     setModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Subtopics</Text>
//       {subtopics.map((subtopic) => (
//         <TouchableOpacity
//           key={subtopic.id}
//           style={styles.subtopicItem}
//           onPress={() => handleSubtopicSelect(subtopic)}
//         >
//           <Text style={styles.subtopicText}>{subtopic.name}</Text>
//         </TouchableOpacity>
//       ))}

//       {/* Modal for options */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Options for {selectedSubtopic && selectedSubtopic.name}</Text>
//             <Button
//               title="Watch Tutorial"
//               onPress={() => {
//                 setModalVisible(false);
//                 navigation.navigate('TutorialScreen', { classId, topicId, subtopicId: selectedSubtopic.id });
//               }}
//             />
//             <Button
//               title="Attempt Quiz"
//               onPress={() => {
//                 setModalVisible(false);
//                 navigation.navigate('QuestionScreen', { classId, topicId, subtopicId: selectedSubtopic.id });
//               }}
//             />
//             <Button
//               title="Close"
//               onPress={() => setModalVisible(false)}
//             />
//           </View>
//         </View>
//       </Modal>
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
//   subtopicItem: {
//     backgroundColor: COLORS.lightBLUE,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   subtopicText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: COLORS.black,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center'
//   }
// });

// export default SubTopicsScreen;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
// import COLORS from '../components/Colors';

// const SubTopicsScreen = ({ navigation, route }) => {
//   const { classId, topicId } = route.params;
//   const [selectedSubtopic, setSelectedSubtopic] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Dummy subtopics for demonstration
//   const subtopics = [
//     { id: 1, name: 'Introduction to Algebra 1' },
//     { id: 2, name: 'Equations' },
//     { id: 3, name: 'Inequalities' },
//     { id: 4, name: 'Functions' },
//     { id: 5, name: 'Graphs of Functions' },
//   ];

//   const handleSubtopicPress = (subtopic) => {
//     setSelectedSubtopic(subtopic);
//     setModalVisible(true);
//   };

//   const handleWatchTutorial = () => {
//     // Navigate to TutorialScreen with necessary params
//     navigation.navigate('TutorialScreen', { classId, topicId, subtopicId: selectedSubtopic.id });
//     setModalVisible(false);
//   };

//   const handleAttemptQuiz = () => {
//     // Navigate to QuestionScreen with necessary params
//     navigation.navigate('QuestionScreen', { classId, topicId, subtopicId: selectedSubtopic.id });
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Subtopics</Text>
//       {subtopics.map((subtopic) => (
//         <TouchableOpacity
//           key={subtopic.id}
//           style={styles.subtopicItem}
//           onPress={() => handleSubtopicPress(subtopic)}
//         >
//           <Text style={styles.subtopicText}>{subtopic.name}</Text>
//         </TouchableOpacity>
//       ))}

//       {/* Modal for subtopic options */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <TouchableOpacity style={styles.optionButton} onPress={handleWatchTutorial}>
//               <Text style={styles.optionText}>Watch Tutorial</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionButton} onPress={handleAttemptQuiz}>
//               <Text style={styles.optionText}>Attempt Quiz</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
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
//   subtopicItem: {
//     backgroundColor: COLORS.lightBLUE,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   subtopicText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: COLORS.black,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: COLORS.light,
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   optionButton: {
//     backgroundColor: COLORS.lightBLUE,
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   optionText: {
//     fontSize: 18,
//     color: COLORS.black,
//   },
// });

// export default SubTopicsScreen;





import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated } from 'react-native';
import COLORS from '../components/Colors';

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