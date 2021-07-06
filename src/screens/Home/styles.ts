import styled from "styled-components/native";

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
