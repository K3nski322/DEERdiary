<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
=======
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
<<<<<<< HEAD
    if (!auth.currentUser) return;

    const userDoc = doc(db, "users", auth.currentUser.uid);
    userDoc.get?.().then(async () => {
      const snapshot = await userDoc.get?.();
      if (snapshot && snapshot.exists()) {
        const data = snapshot.data();
        setName(data?.name || "");
        setBio(data?.bio || "");
      }
    });
  }, []);

  const handleSave = async () => {
    if (!name.trim()) return Alert.alert("Error", "Name cannot be empty");

    const userDoc = doc(db, "users", auth.currentUser.uid);
    await setDoc(userDoc, { name, bio }, { merge: true });
    Alert.alert("Success", "Profile updated!");
=======
    const loadProfile = async () => {
      const currentEmail = await AsyncStorage.getItem("currentUserEmail");
      if (!currentEmail) return;

      const profile = await AsyncStorage.getItem(`userProfile:${currentEmail}`);
      if (profile) {
        const { name, bio } = JSON.parse(profile);
        setName(name);
        setBio(bio);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    const currentEmail = await AsyncStorage.getItem("currentUserEmail");
    if (!currentEmail) return;

    const updatedProfile = { name, bio };
    await AsyncStorage.setItem(`userProfile:${currentEmail}`, JSON.stringify(updatedProfile));
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
    router.back();
  };

  return (
<<<<<<< HEAD
    <ImageBackground
      source={{ uri: "https://static.vecteezy.com/system/resources/previews/025/500/767/large_2x/forest-scene-with-animals-in-the-night-illustration-for-children-dark-blue-mural-wallpaper-from-the-contemporary-era-ai-generated-free-photo.jpg" }}
      style={styles.background}
    >
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.header}>🌲 Join Our Forest</Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Your Bio"
          placeholderTextColor="#ccc"
          value={bio}
          onChangeText={setBio}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
=======
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your Name" />
      <TextInput style={[styles.input, { height: 80 }]} value={bio} onChangeText={setBio} placeholder="Your Bio" multiline />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
  );
};

export default EditProfile;

const styles = StyleSheet.create({
<<<<<<< HEAD
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", padding: 20, justifyContent: "center" },
  header: { fontSize: 32, fontWeight: "bold", color: "#f5f0e1", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "rgba(26, 47, 26, 0.9)", color: "#f5f0e1", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#4a7c59" },
  saveButton: { backgroundColor: "#4a7c59", padding: 16, borderRadius: 10, alignItems: "center", marginTop: 10 },
  saveButtonText: { color: "white", fontWeight: "600", fontSize: 16 },
=======
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#6B4226", textAlign: "center" },
  input: { backgroundColor: "white", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  saveButton: { backgroundColor: "#8FB339", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
});
