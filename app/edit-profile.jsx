import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
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
    router.back();
  };

  return (
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
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", padding: 20, justifyContent: "center" },
  header: { fontSize: 32, fontWeight: "bold", color: "#f5f0e1", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "rgba(26, 47, 26, 0.9)", color: "#f5f0e1", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#4a7c59" },
  saveButton: { backgroundColor: "#4a7c59", padding: 16, borderRadius: 10, alignItems: "center", marginTop: 10 },
  saveButtonText: { color: "white", fontWeight: "600", fontSize: 16 },
});
