import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import BlobBackground from "../../components/ui/BlobBackground";
import Colors from "../../constants/Colors";

type SignInForm = {
  email: string;
  password: string;
};

const schema: yup.ObjectSchema<SignInForm> = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
  .string()
  .trim()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
    "8+ chars incl. upper, lower, number & symbol"
  )
  .required("Password is required"),
});

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",        // validate as user types
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const onSubmit = (data: SignInForm) => {
    Alert.alert("Login Attempt", JSON.stringify(data, null, 2));
    // TODO: Add Supabase sign-in logic here
  };

  return (
    <View style={{ flex: 1 }}>
      <BlobBackground stage={3} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor={Colors.gray}
              style={[
                styles.input,
                errors.email && { borderColor: Colors.crimson },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              accessibilityLabel="Email"
              returnKeyType="next"
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.gray}
              style={[
                styles.input,
                errors.password && { borderColor: Colors.crimson },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              textContentType="password"
              accessibilityLabel="Password"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            (!isValid || isSubmitting) && { opacity: 0.6 },
          ]}
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "JetBrainsMono_700Bold",
    color: Colors.hotPink,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.peach,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: Colors.white,
    fontFamily: "JetBrainsMono_700Bold",
  },
  error: {
    color: Colors.crimson,
    marginBottom: 10,
    fontSize: 12,
  },
  button: {
    backgroundColor: Colors.royalBlue,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "JetBrainsMono_700Bold",
  },
});
