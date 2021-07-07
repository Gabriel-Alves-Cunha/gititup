import React, { useCallback, useState } from "react";
import { NativeSyntheticEvent, NativeScrollEvent, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import allTheDataAnimation from "../../assets/animations/all-the-data.json";

import { Language, RepoProps, Since } from "../../@types/types";
import { usingQuery } from "../../query";
import { Animation } from "../../components/Animation";
import { HamMenu } from "../../components/HamMenu";
import { BigList } from "../../components/BigList";
import {
	FooterComponent,
	refreshControl,
} from "../../components/BigList/utils";

import { Container, Header, AppName, animStyle } from "./styles";

let timesfunctionIsBeingRedone = 1;
const languages = [
	{ name: "C", value: "C" },
	{ name: "C++", value: "C++" },
];

export function Home() {
	const nav = useNavigation();

	const [language, setLanguage] = useState<Language>("");
	const [since, setSince] = useState<Since>("lastMonth");
	const [repos, setRepos] = useState([] as RepoProps[]);
	const [pageNumber, setPageNumber] = useState(1);
	const [isOpen, setIsOpen] = useState(false);

	const { isFetching, status } = usingQuery({
		setPageNumber,
		pageNumber,
		language,
		setRepos,
		since,
	});

	if (isFetching) console.log("\n[LOG] isFetching = true");
	console.log(
		`\n[LOG] Times function is being redone = ${timesfunctionIsBeingRedone}`
	);
	++timesfunctionIsBeingRedone;

	// const footerComponent = () =>
	// isLoading ? FooterComponent() : <View style={{ height: 200 }} />;

	const handleRefresh = () => setPageNumber(1);

	const checkIfNeedsToLoadMore = (
		event: NativeSyntheticEvent<NativeScrollEvent>
	) => {
		const { nativeEvent } = event;
		const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
		const isCloseToBottom =
			layoutMeasurement.height + contentOffset.y >= contentSize.height - 1600;

		if (isCloseToBottom && !isFetching)
			setPageNumber((prevNumber) => prevNumber + 1);
	};

	const handleGo2ReadmePage = useCallback(
		(default_branch: string, full_name: string) => {
			nav.navigate("MarkdownScreen", { default_branch, full_name });
		},
		[]
	);

	return (
		<Container>
			<Header>
				<AppName>GitItUp</AppName>

				<HamMenu setIsOpen={setIsOpen} isOpen={isOpen} />
			</Header>

			{status === "loading" && (
				<View style={animStyle}>
					<Animation src={allTheDataAnimation} height={400} />
				</View>
			)}

			<BigList
				refreshControl={refreshControl(isFetching, handleRefresh)}
				// ListFooterComponent={footerComponent}
				// ListEmptyComponent={footerComponent}
				onScroll={checkIfNeedsToLoadMore}
				onPress={handleGo2ReadmePage}
				data={repos}
			/>
		</Container>
	);
}
