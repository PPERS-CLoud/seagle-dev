<<<<<<< HEAD
import { useState } from 'react'
import { useRouter } from 'expo-router'
=======
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'expo-router'
import { login } from '../services/api'
>>>>>>> 99037158edb5ad25e847a076a76812966a78ad73
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
<<<<<<< HEAD
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useAuth } from '../../context/AuthContext'

export default function Auth() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [staySigned, setStaySigned] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.')
      return
    }
    setLoading(true)
    try {
      await login(email.trim(), password)
      router.replace('/tabs')
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed'
      Alert.alert('Login Failed', msg)
    } finally {
      setLoading(false)
=======
  Alert,
  ActivityIndicator,
} from 'react-native'
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS } from '../constants/theme'

export default function Auth() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [staySigned, setStaySigned] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password')
      return
    }

    setIsLoading(true)
    try {
      const data = await login(email, password)
      await signIn(data.user, data.token)
      router.replace('/tabs')
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Invalid credentials')
    } finally {
      setIsLoading(false)
>>>>>>> 99037158edb5ad25e847a076a76812966a78ad73
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/seagle.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Log in to seagle</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="johndoe@email.com"
            placeholderTextColor="#999999ce"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            editable={!loading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="*********"
            placeholderTextColor="#999999ce"
            secureTextEntry
            style={styles.input}
            editable={!loading}
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setStaySigned((s) => !s)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, staySigned && styles.checkboxChecked]}>
              {staySigned && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.checkboxLabel}>Stay signed in</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
<<<<<<< HEAD
          style={[styles.loginButton, loading && { opacity: 0.7 }]}
          onPress={handleSignIn}
          activeOpacity={0.9}
          disabled={loading}
        >
          {loading ? (
=======
          style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
          onPress={handleSignIn}
          activeOpacity={0.9}
          disabled={isLoading}
        >
          {isLoading ? (
>>>>>>> 99037158edb5ad25e847a076a76812966a78ad73
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Log In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signUpRow}>
          <Text style={styles.noAccount}>Don't have an account?</Text>
<<<<<<< HEAD
          <TouchableOpacity onPress={() => router.push('/screens/SignUpScreen')}>
=======
          <TouchableOpacity onPress={() => router.push('../screens/SignUpScreen')}>
>>>>>>> 99037158edb5ad25e847a076a76812966a78ad73
            <Text style={styles.signUpLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image source={require('../../assets/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By clicking Sign in, Continue with Google you agree to seagle{' '}
          <Text style={styles.link}>Terms of Use</Text> and <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity style={styles.adminLink}>
          <Text style={styles.adminText}>Sign in as Admin</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

// ...existing code... (keep all the existing styles exactly as they are)
const styles = StyleSheet.create({
  container: {
    padding: SPACING.xxl,
    alignItems: 'stretch',
    backgroundColor: COLORS.bgWhite,
    flexGrow: 1,
  },
  logo: {
    width: 92,
    height: 92,
    alignSelf: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  field: { marginBottom: SPACING.md },
  label: {
    marginBottom: SPACING.sm,
    color: COLORS.textBody,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    fontStyle: '#ffffff9d',
    backgroundColor: '#fff',
    fontSize: 16,
=======
    borderColor: COLORS.borderInput,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgWhite,
    fontSize: FONT_SIZES.lg,
>>>>>>> 99037158edb5ad25e847a076a76812966a78ad73
  },
  row: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.textMuted,
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: COLORS.bgWhite, borderColor: COLORS.orange },
  checkboxInner: { width: 10, height: 10, backgroundColor: COLORS.orange, borderRadius: 2 },
  checkboxLabel: { color: COLORS.textBody },
  forgot: { color: COLORS.textGray, textDecorationLine: 'underline' },
  loginButton: {
    backgroundColor: '#f7944d',
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    marginTop: 18,
    alignItems: 'center',
  },
  loginText: { color: COLORS.white, fontWeight: '700', fontSize: FONT_SIZES.lg },
  signUpRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccount: { color: COLORS.textGray },
  signUpLink: { color: COLORS.textBody, fontWeight: '600' },
  dividerRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: 1, backgroundColor: COLORS.borderInput, flex: 1, marginHorizontal: SPACING.md },
  dividerText: { color: COLORS.textMuted, fontWeight: '600' },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.md,
    marginTop: 14,
    justifyContent: 'center',
  },
  googleIcon: { width: 20, height: 20, marginRight: SPACING.md },
  googleText: { fontSize: FONT_SIZES.lg, color: '#111827' },
  terms: {
    marginTop: 14,
    color: COLORS.textGray,
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: { textDecorationLine: 'underline', color: COLORS.textBody },
  adminLink: { marginTop: SPACING.md, alignSelf: 'center' },
  adminText: { color: COLORS.textBody, textDecorationLine: 'underline' },
})