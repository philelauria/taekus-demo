import React, { useState } from 'react'
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { Text } from '~/shared/components/Text'
import { TextInput } from '~/shared/components/TextInput'
import { Button } from '~/shared/components/Button'
import { useTheme } from '~/shared/hooks/useTheme'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { login, clearError, selectAuthLoading, selectAuthError } from '~/features/auth/slice'

export const LoginScreen: React.FC = () => {
    const { theme } = useTheme()
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectAuthLoading)
    const authError = useAppSelector(selectAuthError)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) return
        dispatch(login({ email: email.trim(), password: password.trim() }))
    }

    const handleEmailChange = (text: string) => {
        setEmail(text)
        if (authError) dispatch(clearError())
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text)
        if (authError) dispatch(clearError())
    }

    return (
        <ScreenWrapper scroll>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', marginBottom: theme.spacing['3xl'] }}>
                        <Image
                            source={require('../../../../assets/taekus-logo.png')}
                            style={{
                                width: 200,
                                height: 60,
                                tintColor: theme.colors.textPrimary,
                            }}
                            resizeMode="contain"
                        />
                        <Text
                            variant="bodyMedium"
                            color={theme.colors.textSecondary}
                            style={{ marginTop: theme.spacing.sm }}
                        >
                            Sign in to your account
                        </Text>
                    </View>

                    <View style={{ gap: theme.spacing.lg }}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={handleEmailChange}
                            placeholder="you@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            error={authError && !email.trim() ? 'Email is required' : undefined}
                        />

                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={handlePasswordChange}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoComplete="password"
                            error={
                                authError && !password.trim() ? 'Password is required' : undefined
                            }
                            rightIcon={
                                <Button
                                    label={showPassword ? 'Hide' : 'Show'}
                                    variant="ghost"
                                    size="sm"
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                        />

                        {authError && email.trim() && password.trim() && (
                            <Text variant="bodySmall" color={theme.colors.error}>
                                {authError}
                            </Text>
                        )}

                        <Button
                            label="Sign In"
                            onPress={handleLogin}
                            loading={isLoading}
                            disabled={!email.trim() || !password.trim()}
                            fullWidth
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}
