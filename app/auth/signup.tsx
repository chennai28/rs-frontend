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

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

// 📄 Form schema (trim + confirm match)
const schema: yup.ObjectSchema<SignUpForm> = yup.object({
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
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const onSubmit = (data: SignUpForm) => {
    Alert.alert("Signup Data", JSON.stringify(data, null, 2));
    // TODO: Add Supabase sign-up logic here
  };

  return (
    <View style={{ flex: 1 }}>
      <BlobBackground stage={3} />
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

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
              textContentType="newPassword"
              accessibilityLabel="Password"
              returnKeyType="next"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={Colors.gray}
              style={[
                styles.input,
                errors.confirmPassword && { borderColor: Colors.crimson },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              textContentType="password"
              accessibilityLabel="Confirm Password"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            (!isValid || isSubmitting) && { opacity: 0.6 },
          ]}
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Optional helper text */}
        <Text style={{ color: Colors.gray, fontSize: 12, marginTop: 8 }}>
          Password must be at least 6 characters.
        </Text>
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
    backgroundColor: Colors.crimson,
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
