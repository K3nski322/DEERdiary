import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Goals = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadEntries = async () => {
      const currentEmail = await AsyncStorage.getItem("currentUserEmail");
      if (!currentEmail) return;
      setEmail(currentEmail);

      const savedEntries = await AsyncStorage.getItem(`entries:${currentEmail}`);
      if (savedEntries) setEntries(JSON.parse(savedEntries));
    };
    loadEntries();
  }, []);

  const addEntry = async () => {
    if (!newEntry.trim()) return;

    const updated = [...entries, { id: Date.now().toString(), text: newEntry }];
    setEntries(updated);
    setNewEntry("");

    await AsyncStorage.setItem(`entries:${email}`, JSON.stringify(updated));

    // Update profile entries count
    const profileData = await AsyncStorage.getItem(`userProfile:${email}`);
    if (profileData) {
      const profile = JSON.parse(profileData);
      profile.entries = updated.length;
      await AsyncStorage.setItem(`userProfile:${email}`, JSON.stringify(profile));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Diary</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a new entry..."
          placeholderTextColor="#777"
          value={newEntry}
          onChangeText={setNewEntry}
        />
        <TouchableOpacity style={styles.addButton} onPress={addEntry}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryBox}>
            <Text style={styles.entryText}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Goals;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF8F0" },
  title: { fontSize: 28, fontWeight: "bold", color: "#6B4226", marginBottom: 20, textAlign: "center" },
  inputContainer: { flexDirection: "row", marginBottom: 15 },
  input: { flex: 1, backgroundColor: "white", borderRadius: 10, padding: 14, fontSize: 16, borderWidth: 1, borderColor: "#ddd" },
  addButton: { backgroundColor: "#21cc8d", marginLeft: 10, padding: 14, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
  entryBox: { backgroundColor: "white", padding: 15, borderRadius: 12, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 2 },
  entryText: { fontSize: 16, color: "#4A3C31" },
});
