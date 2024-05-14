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


// import React, { useState } from "react";
// import { View, StyleSheet, Text, Animated, PanResponder } from "react-native";

// const TutorialList = () => {
//   const [droppedWords, setDroppedWords] = useState(Array(4).fill(null)); // Array to store dropped words for each sentence

//   const sentences = [
//     { question: "The cat is ____ the table.", answer: "on" },
//     { question: "The ball is ____ the box.", answer: "in" },
//     { question: "The book is ____ the shelf.", answer: "on" },
//     { question: "The bag is ____ the chair.", answer: "under" },
//   ];

//   // PanResponder to handle dragging gesture
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderMove: (evt, gestureState) => {
//       // Update position of dragged text
//       Animated.event([null, { dx: gestureState.dx, dy: gestureState.dy }], {
//         useNativeDriver: false,
//       })(evt, gestureState);
//     },
//     onPanResponderRelease: (evt, gestureState) => {
//       // Check if the dragged text is dropped inside any drop zone
//       sentences.forEach((_, index) => {
//         if (isDropZone(gestureState, index)) {
//           setDroppedWords((prevWords) => {
//             const newWords = [...prevWords];
//             newWords[index] = draggedWord;
//             return newWords;
//           });
//         }
//       });
//     },
//   });

//   // Function to check if the dragged text is dropped inside the drop zone
//   const isDropZone = (gestureState, index) => {
//     // Define drop zone boundaries (you might need to adjust these values based on your layout)
//     const dropZoneX = 100 + index * 100;
//     const dropZoneY = 200;
//     const dropZoneWidth = 100;
//     const dropZoneHeight = 40;
//     // Check if the gesture position is inside the drop zone boundaries
//     return (
//       gestureState.moveX > dropZoneX &&
//       gestureState.moveX < dropZoneX + dropZoneWidth &&
//       gestureState.moveY > dropZoneY &&
//       gestureState.moveY < dropZoneY + dropZoneHeight
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {sentences.map((sentence, index) => (
//         <View key={index} style={styles.sentenceContainer}>
//           <Text style={styles.questionText}>{sentence.question}</Text>
//           <View style={styles.dropZone}>
//             <Text style={styles.droppedText}>{droppedWords[index]}</Text>
//           </View>
//         </View>
//       ))}
//       <View style={styles.draggableContainer}>
//         {sentences.map((sentence, index) => (
//           <View key={index} style={styles.circle} {...panResponder.panHandlers}>
//             <Text>{sentence.answer}</Text>
//           </View>
//         ))}
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
//   circle: {
//     backgroundColor: "skyblue",
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default TutorialList;


// 1. Import necessary modules
import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// 2. Define component
const DragDrop = () => {
    // 3. Define state for dragged images and their translations
    const [draggedImages, setDraggedImages] = useState(dragImages);
    const translations = draggedImages.map(() => ({
        x: useSharedValue(0),
        y: useSharedValue(0),
    }));

    // 4. Define drop zone layout state
    const [dropZoneLayout, setDropZoneLayout] = useState({
        x: 0, y: 0, width: 0, height: 0
    });

    // 5. Function to handle drop event
    const handleDrop = (index) => {
        const dropX = dropZoneLayout.x;
        const dropY = dropZoneLayout.y;

        // Check if image is dropped inside drop zone
        if (
            translations[index].x.value >= dropX &&
            translations[index].x.value + IMAGE_WIDTH <= dropX + dropZoneLayout.width &&
            translations[index].y.value >= dropY &&
            translations[index].y.value + IMAGE_HEIGHT <= dropY + dropZoneLayout.height
        ) {
            // Update state to reflect successful drop
            console.log("Dropped successfully:", index);
        } else {
            // Reset image position if not dropped inside drop zone
            translations[index].x.value = withSpring(0);
            translations[index].y.value = withSpring(0);
        }
    };

    // 6. Function to render animated styles
    const getAnimatedStyle = (index) => useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translations[index].x.value },
                { translateY: translations[index].y.value },
            ],
        };
    });

    // 7. Render component
    return (
        <View style={styles.container}>
            <View style={styles.dragView}>
                {draggedImages.map((item, index) => (
                    <PanGestureHandler key={index} onGestureEvent={(event) => {
                        translations[index].x.value = event.nativeEvent.translationX;
                        translations[index].y.value = event.nativeEvent.translationY;
                    }} onEnded={() => handleDrop(index)}>
                        <Animated.View style={[styles.imageView, getAnimatedStyle(index)]}>
                            <Image source={item.path} style={styles.image} />
                        </Animated.View>
                    </PanGestureHandler>
                ))}
            </View>
            <View style={styles.dropView} onLayout={(event) => {
                const { x, y, width, height } = event.nativeEvent.layout;
                setDropZoneLayout({ x, y, width, height });
            }}>
                <View style={styles.dropZone}></View>
            </View>
        </View>
    );
};

// 8. Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    dragView: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropView: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageView: {
        position: 'absolute',
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        resizeMode: 'contain',
    },
    dropZone: {
        width: DROP_ZONE_WIDTH,
        height: DROP_ZONE_HEIGHT,
        borderWidth: 1,
    },
});

// 9. Define constants
const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 100;
const DROP_ZONE_WIDTH = 200;
const DROP_ZONE_HEIGHT = 200;

// 10. Export component
export default DragDrop;
