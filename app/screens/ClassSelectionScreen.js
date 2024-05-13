import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClassSelectionScreen = ({ navigation }) => {
  const classes = [
    { id: 1, class: 'P.1' },
    { id: 2, class: 'P.2' },
    { id: 3, class: 'P.3' }
  ];

  // const selectClass = async (selectedClass) => {
  //   try {
  //     // Store the selected class ID in AsyncStorage
  //     await AsyncStorage.setItem('classId', selectedClass.id.toString());
  //     console.log('Class ID stored successfully:', selectedClass.id);
  //     // Navigate to the next screen
  //     navigation.navigate('DashboardScreen');
  //   } catch (error) {
  //     console.error('Error storing class ID:', error);
  //   }
  // };

  const go_to_dashboard = (selectClass) => {
    navigation.navigate("DashboardScreen", { class_id: selectClass.id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Learning Platform</Text>
      <Text style={styles.subHeading}>Please select your class:</Text>
      {classes.map((classItem) => (
        <TouchableOpacity
          key={classItem.id}
          style={styles.classItem}
          onPress={() => go_to_dashboard(classItem)}
        >
          <Text style={styles.classText}>{classItem.class}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA', // Lavender color
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5D5FEE', // Blue color
  },
  subHeading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#696969', // Dim gray color
  },
  classItem: {
    backgroundColor: '#FFD700', // Gold color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  classText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default ClassSelectionScreen;
