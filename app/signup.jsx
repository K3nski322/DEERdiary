import React, { useState } from "react";
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
    }
  };

  return (
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
});
