import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { auth, signInWithEmailAndPassword, ref, database, get } from '../firebase.js';
import { FAB } from 'react-native-paper';
import { Link } from 'expo-router';
// import testArtifact from '../data/test-artifact.json';
import ArtifactItem from './components/artifact-item.js';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  // const [artifacts, setArtifacts] = useState([testArtifact]); 

  const currentUserUIDRef = useRef(null);
  const currentSnapshot = useRef(null);
  const artifactsIds = useRef(null);
  const currentUserArtifactData = useRef(null);

  const [loadingArtifacts, setLoadingArtifacts] = useState(false);


  useEffect(() => {
    if (loggedIn) {
      setLoadingArtifacts(true);
      
      const dbRef = ref(database);
      get(dbRef, `users/${currentUserUIDRef.current}/users`).then((snapshot) => {
        if (snapshot.exists()) {
          currentSnapshot.current = snapshot;
  
          const deepCopy = JSON.parse(JSON.stringify(currentSnapshot.current));
          artifactsIds.current = Object.keys(deepCopy?.users?.[currentUserUIDRef.current]?.["ownedItems"]);
  
          currentUserArtifactData.current = [];
          for (var i = 0; i < artifactsIds.current.length; i++) {
            currentUserArtifactData.current.push(deepCopy?.items?.[artifactsIds.current[i]]);
          }
        } else {
          console.log("No data found for current user.");
        }
        
        setLoadingArtifacts(false);
      });
    }
  }, [loggedIn]);
  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      currentUserUIDRef.current = user.uid;
      console.log("Successfully logged in!", currentUserUIDRef.current);
      setLoggedIn(true);
    } catch (error) {
        console.log("Error logging in. Please try again.")
        Alert.alert("Error logging in:", error.message);
    }
  }; 

  if (loggedIn) {
    if (loadingArtifacts) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    } else if (currentUserArtifactData.current == null || currentUserArtifactData.current.length == 0) {
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
        {currentUserArtifactData.current ? 
            currentUserArtifactData.current.map((artifact, index) => (
                <ArtifactItem key={index} data={artifact} />
            ))
        : 
            <Text>Loading...</Text>  // This is a placeholder; you can replace it with a loading spinner or other content
        }
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
