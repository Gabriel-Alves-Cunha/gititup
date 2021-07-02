import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { SocialSignInButton } from "../../components/SocialSignInButton";
import { useAuth } from "../../hooks/auth";

import { Container, Title } from "./styles";

import theme from "../../styles/theme";

export function SignIn() {
	const { loading, signIn } = useAuth();

	async function handleSignIn() {
		await signIn();
	}

	return (
		<Container>
			<Title>Welcome</Title>

			<SocialSignInButton
				icon={<AntDesign name="github" size={24} color="black" />}
				color={theme.colors.github_color}
				onPress={() => handleSignIn()}
				enabled={!loading}
				title="Enter with Github"
			/>
		</Container>
	);
}
