import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    }
  };

  return (
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
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF8F0", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#6B4226" },
  input: { backgroundColor: "white", borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  signinButton: { backgroundColor: "#21cc8d", padding: 16, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  signupContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  signupLink: { color: "#4DA6FF", textDecorationLine: "underline" },
});
