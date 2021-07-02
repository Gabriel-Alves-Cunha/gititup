import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const ITEM_HEIGHT = 200;

export const Container = styled(TouchableOpacity)`
	flex: 1;
	width: 100%;
	height: ${ITEM_HEIGHT}px;

	padding: 25px;
`;

export const Profile = styled.View`
	flex-direction: row;
`;

export const Title = styled.Text``;

export const Description = styled.Text``;
