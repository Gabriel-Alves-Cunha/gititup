import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container, Title, IconContainer } from "./styles";

interface Props extends RectButtonProps {
	isLoading?: boolean;
	enabled?: boolean;
	icon: JSX.Element;
	light?: boolean;
	color?: string;
	title: string;
}

export function SocialSignInButton({
	isLoading = false,
	enabled = true,
	light = true,
	color,
	title,
	icon,
	...rest
}: Props) {
	const theme = useTheme();

	return (
		<Container
			style={{ opacity: enabled === false || isLoading === true ? 0.5 : 1 }}
			activeOpacity={0.6}
			rippleColor="white"
			color={color}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator color={theme.colors.main} />
			) : (
				<>
					<IconContainer>{icon}</IconContainer>
					<Title light={light}>{title}</Title>
				</>
			)}
		</Container>
	);
}
