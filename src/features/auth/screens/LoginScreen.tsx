import React, { useState } from 'react'
import { View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { ScreenWrapper } from '~/shared/components/ScreenWrapper'
import { observer } from 'mobx-react-lite'
import { Text } from '~/shared/components/Text'
import { TextInput } from '~/shared/components/TextInput'
import { Button } from '~/shared/components/Button'
import { useColors } from '~/shared/hooks/useColors'
import { useStores } from '~/mobxStores/StoreProvider'

export const LoginScreen: React.FC = observer(() => {
    const colors = useColors()
    const { authStore } = useStores()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        if (!email.trim() || !password.trim()) return
        authStore.login({ email: email.trim(), password: password.trim() })
    }

    const handleEmailChange = (text: string) => {
        setEmail(text)
        if (authStore.error) authStore.clearError()
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text)
        if (authStore.error) authStore.clearError()
    }

    return (
        <ScreenWrapper scroll>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 justify-center">
                    <View className="items-center mb-8">
                        <Image
                            source={require('../../../../assets/taekus-logo.png')}
                            style={{
                                width: 200,
                                height: 60,
                                tintColor: colors.textPrimary,
                            }}
                            resizeMode="contain"
                        />
                        <Text variant="bodyMedium" className="text-text-secondary mt-2">
                            Sign in to your account
                        </Text>
                    </View>

                    <View className="gap-4">
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={handleEmailChange}
                            placeholder="you@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="email"
                            error={
                                authStore.error && !email.trim() ? 'Email is required' : undefined
                            }
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
                                authStore.error && !password.trim()
                                    ? 'Password is required'
                                    : undefined
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

                        {authStore.error && email.trim() && password.trim() && (
                            <Text variant="bodySmall" className="text-error">
                                {authStore.error}
                            </Text>
                        )}

                        <Button
                            label="Sign In"
                            onPress={handleLogin}
                            loading={authStore.isLoading}
                            disabled={!email.trim() || !password.trim()}
                            fullWidth
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
})
