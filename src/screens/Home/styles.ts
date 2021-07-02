import styled from "styled-components/native";
import { FlatList } from "react-native";

import { RepoProps } from "../../components/Repo";

export const Container = styled.View`
	flex: 1;

	align-items: center;
`;

export const Header = styled.View`
	flex: 1;

	margin-left: 23px;
	margin-top: 70px;
	margin-bottom: 90px;

	align-items: flex-start;
`;

export const AppName = styled.Text`
	font-family: serif;
	font-size: 25px;

	text-align: center;
`;

export const List = styled(FlatList as new () => FlatList<RepoProps>)`
	width: 100%;
`;
