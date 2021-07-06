import React from "react";

import { ListSeparator } from "../ListSeparator";
import { RepoProps } from "../../@types/types";

import { Container, Title, Description, Profile, PersonImg } from "./styles";

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
					{/* <ImgContainer */}
					<PersonImg
						onError={() => handleErrorLoadingAvatarImage(index)}
						source={{
							uri: data.avatar_url,
						}}
						resizeMode="cover"
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
