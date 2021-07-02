import styled from "styled-components/native";
import { FlatList } from "react-native";

import { RepoProps } from "../Repo";

export const Container = styled.View`
	width: 100%;
`;

export const List = styled(FlatList as new () => FlatList<RepoProps>)`
	width: 100%;
`;
