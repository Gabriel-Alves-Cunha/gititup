import styled from "styled-components/native";
import { StyleProp, ViewStyle } from "react-native";

export const Container = styled.View`
	flex: 1;

	align-items: center;
`;

export const Header = styled.View`
	flex-direction: row;
	flex: 1;
	width: 100%;
	height: 100px;

	justify-content: space-between;
	align-items: center;

	background-color: white;
	padding: 24px;
`;

export const AppName = styled.Text`
	font-family: serif;
	font-size: 24px;

	margin-bottom: 8px;
`;

export const animStyle: StyleProp<ViewStyle> = {
	backgroundColor: "white",
	justifyContent: "center",
	alignItems: "center",
	marginBottom: "auto",
	position: "absolute",
	marginRight: "auto",
	marginLeft: "auto",
	marginTop: "auto",
	bottom: 0,
	right: 0,
	flex: 1,
	left: 0,
	top: 0,
};
