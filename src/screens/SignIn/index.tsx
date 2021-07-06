import React from "react";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import geometricsAnimation from "../../assets/animations/geometric-back.json";

import { SocialSignInButton } from "../../components/SocialSignInButton";
import { Animation } from "../../components/Animation";
import { useAuth } from "../../hooks/auth";

import { Container, AppName, SubTitle } from "./styles";

import theme from "../../styles/theme";

export function SignIn() {
	const { loading, signIn } = useAuth();

	const handleSignIn = async () => await signIn();

	return (
		<Container>
			<AppName>GitItUp</AppName>

			<View
				style={{
					position: "absolute",
					justifyContent: "center",
					alignItems: "center",
					top: 325,
					alignSelf: "center",
				}}
			>
				<SubTitle>Explore the trending repos{"\n"}from GitHub</SubTitle>
			</View>

			<Animation src={geometricsAnimation} height={350} autoPlay loop />

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
