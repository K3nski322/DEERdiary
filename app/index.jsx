import React, { useState } from "react";
<<<<<<< HEAD
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter both email and password.");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/goals");
    } catch (error) {
      console.error(error.message);
      Alert.alert("Sign In Failed", error.message);
=======

  const handleSignIn = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem(`userCredentials:${email}`);
      if (!savedCredentials) return Alert.alert("Error", "Account not found!");

      const { password: savedPassword } = JSON.parse(savedCredentials);
      if (password !== savedPassword) return Alert.alert("Error", "Incorrect password!");

      await AsyncStorage.setItem("currentUserEmail", email); // track current user
      router.replace("/goals");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Something went wrong.");
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
    }
  };

  return (
<<<<<<< HEAD
    <ImageBackground
      source={{ uri: "https://static.vecteezy.com/system/resources/previews/025/500/743/large_2x/forest-scene-with-animals-in-the-night-illustration-for-children-dark-blue-mural-wallpaper-from-the-contemporary-era-ai-generated-free-photo.jpg" }} // 🌲 forest background
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>🦌 DEERdiary</Text>
        <Text style={styles.subheader}>Join Our Forest</Text>

        <View style={styles.formBox}>
          <Text style={styles.title}>Sign In</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password input with toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signinButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={{ color: "#fff" }}>Don’t have an account? </Text>
            <Link href="/signup" style={styles.signupLink}>
              Create Account
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
=======
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.signinButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text>Don’t have an account? </Text>
        <Link href="/signup" style={styles.signupLink}>Create Account</Link>
      </View>
    </SafeAreaView>
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
  );
};

export default SignIn;

const styles = StyleSheet.create({
<<<<<<< HEAD
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#E6E2AF",
    textAlign: "center",
    marginBottom: 5,
  },
  subheader: {
    fontSize: 20,
    color: "#C5E0B4",
    textAlign: "center",
    marginBottom: 30,
  },
  formBox: {
    backgroundColor: "rgba(0,0,0,0.6)", // dark box
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: "#4CAF50", // green border
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: "#fff",
  },
  signinButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupLink: {
    color: "#FFD700",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
=======
  container: { flex: 1, padding: 20, backgroundColor: "#FFF8F0", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#6B4226" },
  input: { backgroundColor: "white", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  signinButton: { backgroundColor: "#21cc8d", padding: 16, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  signupContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  signupLink: { color: "#4DA6FF", textDecorationLine: "underline" },
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
});
