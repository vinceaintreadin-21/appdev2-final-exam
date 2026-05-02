import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function SignUpScreen() {
  const navigation = useNavigation<any>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const registerMutation = useMutation(api.users.register)

  const handleSignUp = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields!")
      return
    }

    try {
      const result = await registerMutation({ username, password })

      if (result && typeof result === 'object' && !result.success) {
        Alert.alert("Sign Up Failed", result.message)
      } else {
        Alert.alert("Success", "Account created!", [
          { text: "OK", onPress: () => navigation.navigate('Login') }
        ])
      }
    } catch (error) {
      Alert.alert("Error", "Unexpected error. Please try again!")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <Image
          source={require("./../assets/signup.webp")}
          style={styles.image}
        />
      </View>

      {/* 2. Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="johndoe"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="********"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-google" size={30} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-apple" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-facebook" size={30} color="#4267B2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>  {/* ✅ */}
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7D7AFF",
        paddingTop: 40
    },

    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: '80%',
        height: '70%'
    },

    formContainer: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 30,
    },

    label: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
        marginTop: 5
    },

    input: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        borderRadius: 15,
        fontSize: 16,
    },
    
    forgotText: {
        color: "#666",
        fontSize: 14,
        marginTop: 10,
    },

    loginButton: {
        backgroundColor: "#FFCC00",
        padding: 18,
        borderRadius: 15,  
        alignItems: "center",
        marginTop: 30  
    },

    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold"
    },

    orText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 18,
        fontWeight: "bold",
    },

    socialRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        alignItems: "center",
    },

    socialIcon: {
        backgroundColor: "#f0f0f0",
        padding: 15,
        borderRadius: 15,
    },
    
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    linkText: {
        color: "#FFCC00",
        fontWeight: "bold"
    }
});

