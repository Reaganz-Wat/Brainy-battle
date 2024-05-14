// import React, { useState } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { DraggableGrid } from "react-native-draggable-grid";

// const VideoScreen = () => {
//   const [data, setData] = useState([
//     { name: "1", key: "one", color: "black"},
//     { name: "2", key: "two", color: "yellow"},
//     { name: "3", key: "three", color: "red" },
//     { name: "4", key: "four", color: "black" },
//     { name: "5", key: "five", color: "yellow" },
//     { name: "6", key: "six", color: "red" },
//     { name: "7", key: "seven", color: "black" },
//     { name: "8", key: "eight", color: "yellow" },
//     { name: "9", key: "night", color: "red" },
//     { name: "10", key: "ten", color: "black" },
//     { name: "11", key: "eleven", color: "yellow" },
//   ]);

//   const render_item = (item) => {
//     return (
//       <View style={[styles.item, {backgroundColor: item.color}]} key={item.key}>
//         <Text style={styles.item_text}>{item.name}</Text>
//       </View>
//     );
//   };

//   const onDragRelease = (updatedData) => {
//     setData(updatedData);
//   };

//   return (
//     <View style={{flex: 1}}>
//       <View>
//         <Text>Re-arrange this numbers 1 to 10</Text>
//       </View>
//       <View style={styles.wrapper}>
//         <DraggableGrid
//           numColumns={4}
//           renderItem={render_item}
//           data={data}
//           onDragRelease={onDragRelease}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     paddingTop: 100,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//   },
//   item: {
//     width: 90,
//     height: 90,
//     borderRadius: 8,
//     backgroundColor: "blue",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   item_text: {
//     fontSize: 40,
//     color: "#FFFFFF",
//   },
// });

// export default VideoScreen;


import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { DraggableGrid } from "react-native-draggable-grid";

const TutorialList = () => {
  const [droppedWord, setDroppedWord] = useState(null);

  const sentences = [
    { question: "The cat is ____ the table.", answer: "on" },
    { question: "The ball is ____ the box.", answer: "in" },
    { question: "The book is ____ the shelf.", answer: "on" },
    { question: "The bag is ____ the chair.", answer: "under" },
  ];

  const renderWord = (word, index) => {
    return (
      <DraggableGrid
        key={index}
        renderSize={56}
        x={0}
        y={0}
        onShortPressRelease={() => setDroppedWord(word)}
      >
        <TouchableOpacity style={styles.wordContainer}>
          <Text style={styles.wordText}>{word}</Text>
        </TouchableOpacity>
      </DraggableGrid>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        {sentences.map((sentence, index) => (
          <View key={index} style={styles.sentenceContainer}>
            <Text style={styles.questionText}>{sentence.question}</Text>
            <Text style={styles.answerText}>{sentence.answer}</Text>
          </View>
        ))}
      </View>
      <View style={styles.draggableContainer}>
        {data.map((word, index) => renderWord(word, index))}
      </View>
      <View style={styles.droppedWordContainer}>
        <Text style={styles.droppedWordText}>{droppedWord}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  sentenceContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  answerText: {
    fontSize: 16,
    color: "green",
  },
  draggableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordContainer: {
    width: 100,
    height: 50,
    borderRadius: 8,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  wordText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  droppedWordContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  droppedWordText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

export default TutorialList;
