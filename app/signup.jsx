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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Error", "Please fill in all fields.");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created! You can now sign in.");
      router.replace("/");
    } catch (error) {
      console.error(error.message);
      Alert.alert("Sign Up Failed", error.message);
=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      // Save user profile
      const profileKey = `userProfile:${email}`;
      const existing = await AsyncStorage.getItem(profileKey);
      if (existing) {
        Alert.alert("Error", "Account already exists!");
        return;
      }

      const userProfile = { name, bio: "Hello! 🌟", entries: 0 };
      await AsyncStorage.setItem(profileKey, JSON.stringify(userProfile));

      // Save credentials
      const credentials = { email, password };
      await AsyncStorage.setItem(`userCredentials:${email}`, JSON.stringify(credentials));

      // Set current logged-in user
      await AsyncStorage.setItem("currentUserEmail", email);

      Alert.alert("Success", "Account created successfully!");
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
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password with toggle */}
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

          {/* Confirm Password with toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.signinContainer}>
            <Text style={{ color: "#fff" }}>Already have an account? </Text>
            <Link href="/" style={styles.signinLink}>
              Sign In
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: "#4CAF50",
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
  signupButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signinLink: {
    color: "#FFD700",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
=======
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <Link href="/" style={styles.loginLink}>Sign In</Link>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF8F0", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#6B4226" },
  input: { backgroundColor: "white", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  signupButton: { backgroundColor: "#8FB339", padding: 16, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  loginContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  loginLink: { color: "#4DA6FF", textDecorationLine: "underline" },
>>>>>>> e5a608970d7bedce8cae47b09411613aa7e4479c
});
