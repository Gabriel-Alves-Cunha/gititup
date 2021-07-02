import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
	flex: 1;

	justify-content: center;
	align-items: center;
`;

export const Title = styled.Text``;

export const SignInButton = styled(TouchableOpacity)`
	width: 80%;
	height: 40px;

	margin: 10px;

	background-color: red;
	color: red;
`;

export const SignInTitle = styled.Text`
	text-align: center;
	justify-content: center;
	align-items: center;
`;
