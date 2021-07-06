import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Title, ButtonContainer } from "./styles";

type Props = RectButtonProps;

export function TryAgainButton({ ...rest }: Props) {
	return (
		<Container>
			<ButtonContainer {...rest}>
				<Title>Try again</Title>
			</ButtonContainer>
		</Container>
	);
}
