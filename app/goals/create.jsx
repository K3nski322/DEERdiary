import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", bio: "", entries: 0, joined: "" });

  useEffect(() => {
    const loadProfile = async () => {
      const currentEmail = await AsyncStorage.getItem("currentUserEmail");
      if (!currentEmail) return;

      const savedProfile = await AsyncStorage.getItem(`userProfile:${currentEmail}`);
      if (savedProfile) setUser(JSON.parse(savedProfile));
      else setUser({ name: "Unknown", email: currentEmail, bio: "", entries: 0, joined: "Unknown" });
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUserEmail");
    router.replace("/");
  };

  const handleEditProfile = () => router.push("/edit-profile");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.entries}</Text>
          <Text style={styles.statLabel}>Entries</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 28, fontWeight: "bold", color: "#6B4226" },
  email: { fontSize: 14, color: "#555" },
  bioSection: { marginBottom: 20, padding: 15, backgroundColor: "#FFF", borderRadius: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5, color: "#6B4226" },
  bio: { fontSize: 14, color: "#4A3C31", lineHeight: 20 },
  stats: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#6B4226" },
  statLabel: { fontSize: 12, color: "#555" },
  buttons: { marginTop: 20 },
  editButton: { backgroundColor: "#8FB339", padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  logoutButton: { backgroundColor: "#E63946", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
