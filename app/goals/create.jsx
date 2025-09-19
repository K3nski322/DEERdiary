<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/"); // not logged in
        return;
      }

      const userDoc = doc(db, "users", currentUser.uid);
      const unsubscribeSnapshot = onSnapshot(userDoc, (docSnap) => {
        const data = docSnap.exists() ? docSnap.data() : {};
        setUser({
          name: data.name || currentUser.displayName || "No Name",
          email: currentUser.email,
          bio: data.bio || "Lover of stories, thoughts, and quiet nights 🌙",
          joined: new Date(currentUser.metadata.creationTime).toLocaleDateString(),
          entries: data.entries || 0,
        });
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
=======
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
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
    router.replace("/");
  };

  const handleEditProfile = () => router.push("/edit-profile");

<<<<<<< HEAD
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Loading Profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://static.vecteezy.com/system/resources/previews/025/500/767/large_2x/forest-scene-with-animals-in-the-night-illustration-for-children-dark-blue-mural-wallpaper-from-the-contemporary-era-ai-generated-free-photo.jpg",
      }}
      style={styles.background}
    >
      {/* overlay to make text readable */}
      <View style={styles.overlay}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.headerSection}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/847/847969.png" }}
                style={styles.avatar}
              />
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
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>⭐</Text>
                <Text style={styles.statLabel}>Member</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{user.joined}</Text>
                <Text style={styles.statLabel}>Joined</Text>
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
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
=======
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
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
  );
};

export default Profile;

const styles = StyleSheet.create({
<<<<<<< HEAD
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", padding: 20 },
  container: { flex: 1 },
  headerSection: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, borderWidth: 2, borderColor: "#4a7c59" },
  name: { fontSize: 32, fontWeight: "bold", color: "#f5f0e1", marginBottom: 4 },
  email: { fontSize: 14, color: "#a8d5ba" },
  bioSection: { marginBottom: 20, padding: 15, backgroundColor: "rgba(26, 47, 26, 0.9)", borderRadius: 10, borderWidth: 1, borderColor: "#4a7c59" },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5, color: "#a8d5ba" },
  bio: { fontSize: 14, color: "#f5f0e1", lineHeight: 20 },
  stats: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#f5f0e1" },
  statLabel: { fontSize: 12, color: "#a8d5ba" },
  buttons: { marginTop: 20 },
  editButton: { backgroundColor: "#4a7c59", padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 10 },
=======
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
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
  logoutButton: { backgroundColor: "#E63946", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
