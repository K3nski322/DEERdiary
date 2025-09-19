<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Home = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [profileName, setProfileName] = useState("");
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [editId, setEditId] = useState(null);
  const [unlockModalVisible, setUnlockModalVisible] = useState(false);
  const [currentUnlockEntry, setCurrentUnlockEntry] = useState(null);
  const [inputPasscode, setInputPasscode] = useState("");

  // Live listener for user profile
  useEffect(() => {
    if (!user) return;

    const profileRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(profileRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setProfileName(data.name || "Friend");
      } else {
        setProfileName("Friend");
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Load diary entries
  useEffect(() => {
    if (!user) return;

    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "diaryEntries")
        );
        const loaded = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isUnlocked: false, // default state for unlocking
        }));
        setEntries(loaded);
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };

    fetchEntries();
  }, [user]);

  // Add or edit entry
  const handleSaveEntry = async () => {
    if (!newEntry.trim()) return;

    try {
      const entryData = {
        text: newEntry,
        passcode: newPasscode ? newPasscode : null,
      };

      if (editId) {
        const entryRef = doc(db, "users", user.uid, "diaryEntries", editId);
        await updateDoc(entryRef, entryData);
        setEntries(
          entries.map((e) =>
            e.id === editId ? { ...e, ...entryData, isUnlocked: false } : e
          )
        );
        setEditId(null);
      } else {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "diaryEntries"),
          entryData
        );
        setEntries([...entries, { id: docRef.id, ...entryData, isUnlocked: false }]);
      }

      setNewEntry("");
      setNewPasscode("");
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  const handleDeleteEntry = async (entry) => {
    if (entry.passcode && !entry.isUnlocked) return; // can't delete locked entry
    try {
      await deleteDoc(doc(db, "users", user.uid, "diaryEntries", entry.id));
      setEntries(entries.filter((e) => e.id !== entry.id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleEditEntry = (entry) => {
    if (entry.passcode && !entry.isUnlocked) return; // can't edit locked entry
    setNewEntry(entry.text);
    setNewPasscode(entry.passcode || "");
    setEditId(entry.id);
  };

  const handleUnlockEntry = (entry) => {
    setCurrentUnlockEntry(entry);
    setInputPasscode("");
    setUnlockModalVisible(true);
  };

  const checkPasscode = () => {
    if (inputPasscode === currentUnlockEntry.passcode) {
      setEntries(
        entries.map((e) =>
          e.id === currentUnlockEntry.id ? { ...e, isUnlocked: true } : e
        )
      );
      setUnlockModalVisible(false);
      setCurrentUnlockEntry(null);
    } else {
      alert("Incorrect passcode!");
=======
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
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
    }
  };

  return (
<<<<<<< HEAD
    <ImageBackground
      source={{
        uri: "https://static.vecteezy.com/system/resources/previews/025/500/767/large_2x/forest-scene-with-animals-in-the-night-illustration-for-children-dark-blue-mural-wallpaper-from-the-contemporary-era-ai-generated-free-photo.jpg",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.header}>🦌 DEERdiary</Text>
        <Text style={styles.subHeader}>Welcome to your forest, {profileName} 🌲</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Write your thoughts..."
            placeholderTextColor="#ccc"
            value={newEntry}
            onChangeText={setNewEntry}
          />
          <TextInput
            style={[styles.input, { marginTop: 5 }]}
            placeholder="Optional passcode for private entry"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={newPasscode}
            onChangeText={setNewPasscode}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSaveEntry}>
            <Text style={styles.addButtonText}>{editId ? "Edit" : "Add"}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.entryBox}>
              <Text style={styles.entryText}>
                {item.passcode ? (item.isUnlocked ? item.text : "🔒 Private Entry") : item.text}
              </Text>

              <View style={styles.entryActions}>
                {item.passcode && (
                  <TouchableOpacity onPress={() => handleUnlockEntry(item)}>
                    <MaterialCommunityIcons
                      name={item.isUnlocked ? "lock-open" : "lock"}
                      size={20}
                      color="#FFD700"
                      style={{ marginRight: 10 }}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => handleEditEntry(item)}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={20}
                    color={item.passcode && !item.isUnlocked ? "#888" : "#A8B2A4"}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteEntry(item)}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color={item.passcode && !item.isUnlocked ? "#888" : "#FF6B6B"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Unlock Modal */}
        <Modal visible={unlockModalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={{ marginBottom: 10 }}>Enter passcode to unlock:</Text>
              <TextInput
                style={styles.modalInput}
                secureTextEntry
                value={inputPasscode}
                onChangeText={setInputPasscode}
              />
              <TouchableOpacity style={styles.modalButton} onPress={checkPasscode}>
                <Text style={{ color: "white" }}>Unlock</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#888", marginTop: 5 }]}
                onPress={() => setUnlockModalVisible(false)}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  header: { fontSize: 42, fontWeight: "bold", textAlign: "center", color: "#f5f0e1", marginBottom: 10 },
  subHeader: { fontSize: 18, textAlign: "center", color: "#a8d5ba", marginBottom: 20 },
  inputWrapper: {
    borderWidth: 2,
    borderColor: "#4a7c59",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "rgba(26,47,26,0.9)",
  },
  input: {
    backgroundColor: "rgba(15,36,16,0.9)",
    color: "white",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#4a7c59",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4a7c59",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  entryBox: {
    backgroundColor: "rgba(26,47,26,0.9)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#4a7c59",
  },
  entryText: { fontSize: 16, color: "white" },
  entryActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 8 },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#4a7c59",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
=======
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
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
});
