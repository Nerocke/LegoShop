import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const logo = require('../resources/ort-logo.png')

export const LoginScreen = () => {
  const [value, setValue] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <ScrollView ref={scrollViewRef} style={{flex: 1}} contentContainerStyle={{ paddingBottom: 300}}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Login",
          }}
        />
        <Image style={styles.image} source={logo} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Login"
          onFocus={() => {
            console.log('scroll')
            scrollViewRef.current?.scrollToEnd()
          }}
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <TextInput
         ref={passwordRef}
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Password"
          returnKeyType="send"
        />
        <View style={styles.button}>
          <Button
            title="Submit"
            onPress={() => {
              router.push("/home");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  image: {
    alignSelf: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 16,
  },
});