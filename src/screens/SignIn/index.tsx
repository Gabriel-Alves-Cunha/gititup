import React from "react";
import { ActivityIndicator } from "react-native";

import { useAuth } from "../../hooks/auth";

import { Container, Title, SignInButton, SignInTitle } from "./styles";

import theme from "../../styles/theme";

export function SignIn() {
	const { disabled, loading, signIn } = useAuth();

	async function handleSignIn() {
		await signIn();
	}

	return (
		<Container>
			<Title>Idiota</Title>

			{loading ? (
				<ActivityIndicator color={theme.colors.main} />
			) : (
				<SignInButton onPress={handleSignIn} disabled={disabled}>
					<SignInTitle>Entrar com Github</SignInTitle>
				</SignInButton>
			)}
		</Container>
	);
}
