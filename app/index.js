import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase.js';
import { FAB } from 'react-native-paper';
import { Link } from 'expo-router';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import testArtifact from '../data/test-artifact.json';
import ArtifactItem from '../components/artifact-item.js';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);  // New state for login status
  const [artifacts, setArtifacts] = useState([testArtifact]); 

  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Successfully logged in!", user.uid);
      setLoggedIn(true);  // Set the loggedIn state to true on successful login
    } catch (error) {
        console.log("Wrong email/password. Please try again.")
        Alert.alert("Error logging in:", error.message);
    }
  };

  // If logged in, redirect to the desired screen
  if (loggedIn) {
    if (artifacts.length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold'}}></Text>
        <Text>Click the '+' sign to add your artifact info!</Text>
        <Link href='/add' asChild>
          <FAB
            icon='plus'
            style={styles.fab}
          />
        </Link>
    </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{fontWeight: 'bold'}}></Text>
          {artifacts.map((artifact) => (
            <ArtifactItem key={uuidv4()} data={artifact} />
          ))}
          <Link href='/add' asChild>
            <FAB
              icon='plus'
              style={styles.fab}
            />
          </Link>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 16 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />
      <Button title="Login" onPress={loginUser} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontWeight: 'bold',
    },
    fab: {
      position: 'absolute',
      margin: 32,
      right: 0,
      bottom: 0,
    },
  });
  

export default Login;
