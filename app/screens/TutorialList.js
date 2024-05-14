// import React, { useState } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import Draggable from "../components/Draggable"; // Import the Draggable component from the second code snippet

// const TutorialList = () => {
//   const [droppedWord, setDroppedWord] = useState(null);

//   const sentences = [
//     { question: "The cat is ____ the table.", answer: "on" },
//     { question: "The ball is ____ the box.", answer: "in" },
//     { question: "The book is ____ the shelf.", answer: "on" },
//     { question: "The bag is ____ the chair.", answer: "under" },
//   ];

//   const renderSentence = (sentence, index) => {
//     return (
//       <View key={index} style={styles.sentenceContainer}>
//         <Text style={styles.questionText}>{sentence.question}</Text>
//         <View style={styles.dropZone}>
//           <Text style={styles.droppedText}>{droppedWord}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {sentences.map((sentence, index) => renderSentence(sentence, index))}
//       <View style={styles.draggableContainer}>
//         <Draggable
//           word="on" // Pass the word you want to make draggable
//           onDrop={(word) => setDroppedWord(word)} // Update the dropped word state when it's dropped
//         />
//         <Draggable word="in" onDrop={(word) => setDroppedWord(word)} />
//         <Draggable word="under" onDrop={(word) => setDroppedWord(word)} />
//         <Draggable word="beside" onDrop={(word) => setDroppedWord(word)} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   sentenceContainer: {
//     marginBottom: 20,
//   },
//   questionText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   dropZone: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   droppedText: {
//     fontSize: 16,
//   },
//   draggableContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });

// export default TutorialList;


import React, { useState } from "react";
import { View, StyleSheet, Text, Animated, PanResponder } from "react-native";

const TutorialList = () => {
  const [droppedWords, setDroppedWords] = useState(Array(4).fill(null)); // Array to store dropped words for each sentence

  const sentences = [
    { question: "The cat is ____ the table.", answer: "on" },
    { question: "The ball is ____ the box.", answer: "in" },
    { question: "The book is ____ the shelf.", answer: "on" },
    { question: "The bag is ____ the chair.", answer: "under" },
  ];

  // PanResponder to handle dragging gesture
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Update position of dragged text
      Animated.event([null, { dx: gestureState.dx, dy: gestureState.dy }], {
        useNativeDriver: false,
      })(evt, gestureState);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Check if the dragged text is dropped inside any drop zone
      sentences.forEach((_, index) => {
        if (isDropZone(gestureState, index)) {
          setDroppedWords((prevWords) => {
            const newWords = [...prevWords];
            newWords[index] = draggedWord;
            return newWords;
          });
        }
      });
    },
  });

  // Function to check if the dragged text is dropped inside the drop zone
  const isDropZone = (gestureState, index) => {
    // Define drop zone boundaries (you might need to adjust these values based on your layout)
    const dropZoneX = 100 + index * 100;
    const dropZoneY = 200;
    const dropZoneWidth = 100;
    const dropZoneHeight = 40;
    // Check if the gesture position is inside the drop zone boundaries
    return (
      gestureState.moveX > dropZoneX &&
      gestureState.moveX < dropZoneX + dropZoneWidth &&
      gestureState.moveY > dropZoneY &&
      gestureState.moveY < dropZoneY + dropZoneHeight
    );
  };

  return (
    <View style={styles.container}>
      {sentences.map((sentence, index) => (
        <View key={index} style={styles.sentenceContainer}>
          <Text style={styles.questionText}>{sentence.question}</Text>
          <View style={styles.dropZone}>
            <Text style={styles.droppedText}>{droppedWords[index]}</Text>
          </View>
        </View>
      ))}
      <View style={styles.draggableContainer}>
        {sentences.map((sentence, index) => (
          <View key={index} style={styles.circle} {...panResponder.panHandlers}>
            <Text>{sentence.answer}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sentenceContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropZone: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  droppedText: {
    fontSize: 16,
  },
  draggableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    backgroundColor: "skyblue",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TutorialList;
