import React from "react";
import FastImage from "react-native-fast-image";

import { ListSeparator } from "../ListSeparator";
import { RepoProps } from "../../@types/types";

import { Container, Title, Description, Profile } from "./styles";

type Props = {
	onPress(default_branch: string, full_name: string): void;
	data: RepoProps;
	index: number;
};

export function Repo({ data, index, onPress }: Props) {
	return (
		<>
			<ListSeparator />
			<Container
				onPress={() => onPress(data.default_branch ?? "", data.full_name)}
			>
				<Profile>
					<FastImage
						style={{ width: 50, height: 50, borderRadius: 25 }}
						resizeMode="contain"
						source={{
							uri: data.avatar_url,
						}}
						onError={() => handleErrorLoadingAvatarImage(index)}
					/>

					<Title>
						{index} - {data.name}
					</Title>
				</Profile>

				<Description>{truncate(data.description ?? "", 200)}</Description>
			</Container>
			<ListSeparator />
		</>
	);
}

function truncate(str: string, n: number) {
	return str.length > n ? str.substr(0, n - 1) + "\u2026" : str;
}

function handleErrorLoadingAvatarImage(index: number) {
	console.log(`\n[ERROR] loading avatar index(${index})!\n`);
}
