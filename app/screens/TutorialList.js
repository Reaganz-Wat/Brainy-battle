// import React, { useState, useEffect } from "react";
// import { View, FlatList } from "react-native";
// import axios from "axios";
// import API from "../components/API";
// import VideoItem from "../components/VideoItem";

// const TutorialList = ({ navigation }) => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     getVideos();
//   }, []);

//   const getVideos = async () => {
//     try {
//       const response = await axios.get(API.get_videos, {
//         params: {
//           subject_id: 3,
//           class_id: 1,
//           topic_id: 8,
//         },
//       });
//       const data = await response.data;
//       setVideos(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleVideoPress = (videoUrl) => {
//     // Handle video press, navigate to video detail screen, etc.
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={videos}
//         renderItem={({ item }) => (
//           <VideoItem
//             videoUrl={API.video_concat + item}
//             onPress={() => handleVideoPress(API.video_concat + item)}
//           />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default TutorialList;


// import React, { useState, useEffect } from "react";
// import { View, FlatList } from "react-native";
// import VideoItem from "../components/VideoItem";

// const TutorialList = ({ navigation }) => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     // List of video URLs
//     const videoList = [
//       "/WEB APPLICATIONS/bbV2/PUPIL/MEDIA/664219630a62e_Prepositions for Kids.mp4",
//       "/WEB APPLICATIONS/bbV2/PUPIL/MEDIA/66421971a6dde_Position Words - Preposition _ English Grammar & Composition Grade 1 _ Periwinkle (2).mp4"
//     ];

//     // Set the videos state with the list of URLs
//     setVideos(videoList);
//   }, []);

//   const handleVideoPress = (videoUrl) => {
//     // Handle video press, navigate to video detail screen, etc.
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={videos}
//         renderItem={({ item }) => (
//           <VideoItem
//             videoUrl={item} // Pass the video URL directly since it's already formatted
//             onPress={() => handleVideoPress(item)}
//           />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default TutorialList;


// import React, { useState, useEffect } from "react";
// import { View, FlatList, TouchableOpacity, Text } from "react-native";

// const TutorialList = ({ navigation }) => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     // List of video URLs in the provided format
//     const videoList = [
//       {
//         "url": "/WEB APPLICATIONS/bbV2/PUPIL/MEDIA/664219630a62e_Prepositions for Kids.mp4"
//       },
//       {
//         "url": "/WEB APPLICATIONS/bbV2/PUPIL/MEDIA/66421971a6dde_Position Words - Preposition _ English Grammar & Composition Grade 1 _ Periwinkle (2).mp4"
//       }
//     ];

//     // Set the videos state with the list of URLs
//     setVideos(videoList);
//   }, []);

//   const handleVideoPress = (videoUrl) => {
//     // Handle video press, navigate to video detail screen, etc.
//     console.log("Video pressed:", videoUrl);
//     // You can implement navigation logic here to navigate to a video detail screen
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={videos}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleVideoPress(item.url)}>
//             <View style={{ padding: 10 }}>
//               <Text>{item.url}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default TutorialList;