import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const ITEM_HEIGHT = 200;

export const Container = styled(TouchableOpacity)`
	flex: 1;
	width: 100%;
	height: ${ITEM_HEIGHT}px;

	padding: 15px;
`;

export const Profile = styled.View`
	flex-direction: row;

	align-items: center; /* Y */

	margin-bottom: 10px;
`;

export const PersonImg = styled.Image`
	width: 40px;
	height: 40px;

	border-radius: 40px;

	overflow: hidden;
`;

export const Title = styled.Text`
	font-size: 15px;

	left: 20px;
`;

export const Description = styled.Text`
	height: 70px;
`;
