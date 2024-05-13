import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MathScreen = () => {
  // Define the dictionary mapping people to their places of work
  const workplaces = {
    "doctor": "hospital",
    "police officer": "police station",
    "market vendor": "market shopkeeper",
    "shop mechanic": "garage",
    "carpenter": "carpenter’s workshop",
    "butcher": "butcher’s shop",
    "teacher": "school",
    "barber": "salon"
  };

  // State to hold the selected person and matched workplace
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [matchedWorkplace, setMatchedWorkplace] = useState(null);

  // Function to handle matching person to workplace
  const matchWorkplace = (person) => {
    const workplace = workplaces[person];
    if (workplace) {
      setMatchedWorkplace(workplace);
    } else {
      setMatchedWorkplace("Unknown");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a person:</Text>
      {Object.keys(workplaces).map((person, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.button}
          onPress={() => {
            setSelectedPerson(person);
            matchWorkplace(person);
          }}
        >
          <Text>{person}</Text>
        </TouchableOpacity>
      ))}
      {selectedPerson && (
        <Text style={styles.result}>
          ${selectedPerson} works at ${matchedWorkplace}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default MathScreen;