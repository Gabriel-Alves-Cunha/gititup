import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

import theme from "../../styles/theme";

export const Container = styled.View`
	position: absolute;

	flex: 1;
	width: 75%;
	height: 40px;

	bottom: 30px;
`;

export const ButtonContainer = styled(RectButton)``;

export const Title = styled.Text`
	font-size: 16px;

	text-align: center;

	color: ${theme.colors.purple};
`;
