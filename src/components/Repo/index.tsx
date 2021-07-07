import React, { memo } from "react";

import { ListSeparator } from "../ListSeparator";
import { RepoProps } from "../../@types/types";

import { Container, Title, Description, Profile, PersonImg } from "./styles";

type Props = {
	onPress(default_branch: string, full_name: string): void;
	data: RepoProps;
	index: number;
};

function RepoComponent({ data, index, onPress }: Props) {
	return (
		<>
			<ListSeparator />
			<Container
				onPress={() =>
					onPress(
						data.default_branch ?? "ThereIsNoDefaultBranch",
						data.full_name
					)
				}
			>
				<Profile>
					<PersonImg
						onError={() => handleErrorLoadingAvatarImage(index)}
						source={{
							uri: data.avatar_url,
							cache: "force-cache",
						}}
						resizeMode="cover"
					/>

					<Title>
						{index} - {data.name}
					</Title>
				</Profile>

				<Description>{truncate(data.description ?? "", 150)}</Description>
			</Container>
			<ListSeparator />
		</>
	);
}

function truncate(str: string, numberOfChars: number) {
	return str.length > numberOfChars
		? str.substr(0, numberOfChars - 1) + "\u2026"
		: str;
}

function handleErrorLoadingAvatarImage(index: number) {
	console.log(`\n[ERROR] loading avatar index(${index})!\n`);
}

export const Repo = memo(RepoComponent, (nowProps, nextProps) => {
	return nowProps.data.html_url === nextProps.data?.html_url;
	// Or `Object.is(nowProps, nextProps);`
});
