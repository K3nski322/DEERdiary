import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
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
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your Name" />
      <TextInput style={[styles.input, { height: 80 }]} value={bio} onChangeText={setBio} placeholder="Your Bio" multiline />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#6B4226", textAlign: "center" },
  input: { backgroundColor: "white", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  saveButton: { backgroundColor: "#8FB339", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
