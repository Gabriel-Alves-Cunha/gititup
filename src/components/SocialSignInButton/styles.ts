import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
	color: string | undefined;
}

interface ButtonTextProps {
	light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
	flex-direction: row;

	width: 75%;
	height: 60px;

	align-items: center;
	justify-content: center;

	background-color: ${({ color, theme }) =>
		color ?? theme.colors.main};

	border-radius: 8px;
`;

export const IconContainer = styled.View`
	height: 100%;

	justify-content: center;
	align-items: center;

	padding: ${RFValue(16)}px;

	background-color: white;
`;

export const Title = styled.Text<ButtonTextProps>`
	/* font-family: ${({ theme }) => theme.fonts.primary_500}; */
	flex: 1;
	font-size: ${RFValue(15)}px;
	text-align: center;

	color: ${({ light, theme }) =>
		light ? theme.colors.white : theme.colors.header};
`;
