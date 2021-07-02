import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
	flex-direction: row;

	width: 100%;
	height: 56px;

	align-items: center;

	background-color: ${({ theme }) => theme.colors.main};

	border-radius: 8px;
`;

export const Title = styled.Text`
	flex: 1;
	text-align: center;

	/* font-family: ${({ theme }) => theme.fonts}; */
	font-size: 15px;

	color: ${({ theme }) => theme.colors.background_primary};
`;
