import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Video } from "expo-av";

const VideoItem = ({ videoUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        resizeMode="contain"
        useNativeControls={true}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#000", // Black background
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9, // Adjust the aspect ratio as per your video dimensions
  },
});

export default VideoItem;
