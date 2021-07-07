import React from "react";
import { ScrollView, ScrollViewProps } from "react-native";

import { FooterComponent, keyExtractor } from "./utils";
import { RepoProps } from "../../@types/types";
import { Repo } from "../Repo";

type BigListProps = ScrollViewProps & {
	onPress(default_branch: string, full_name: string): void;
	data: RepoProps[];
};

export function BigList({ data, onPress, ...rest }: BigListProps) {
	return (
		<ScrollView {...rest}>
			{data.map((repo, index) => (
				<Repo
					key={keyExtractor(repo)}
					onPress={onPress}
					index={index + 1}
					data={repo}
				/>
			))}
		</ScrollView>
	);
}
