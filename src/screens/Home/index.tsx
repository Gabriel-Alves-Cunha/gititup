import React, { useCallback, useState, useMemo } from "react";
import { NativeScrollEvent, View, NativeSyntheticEvent } from "react-native";
import { useInfiniteQuery } from "react-query";
import { useNavigation } from "@react-navigation/core";

import allTheDataAnimation from "../../assets/animations/all-the-data.json";

import { FetchReposProps } from "../../@types/types";
import { fetchReposAxios } from "../../query";
import { Animation } from "../../components/Animation";
import { HamMenu } from "../../components/HamMenu";
import BigList from "../../components/BigList";
import {
	FooterComponent,
	refreshControl,
	retryDelay,
} from "../../components/BigList/utils";

import { Container, Header, AppName } from "./styles";

let timesfunctionIsBeingRedone = 1;
let count = 1;
const languages = [
	{ name: "C", value: "C" },
	{ name: "C++", value: "C++" },
];

export function Home() {
	const nav = useNavigation();

	const [language, setLanguage] = useState<FetchReposProps["language"]>("");
	const [since, setSince] = useState<FetchReposProps["since"]>("lastMonth");
	const [isOpen, setIsOpen] = useState(false);

	const {
		isFetchingNextPage,
		fetchNextPage,
		isFetching,
		refetch,
		status,
		data,
	} = useInfiniteQuery(
		"repos",
		async () => await fetchReposAxios({ language, since, pageParam: 1 }),
		{
			getNextPageParam: (_lastPage, pages) => {
				return { language, since, pageParams: pages.length + 1 };
			},
			onSettled: (_data, error) => {
				console.log(`\n\n[LOG] onSettled(${count}), error = ${error}`);
				++count;
			},
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			refetchOnMount: false,
			staleTime: 10000000,
			retryDelay,
		}
	);

	if (isFetching) console.log("\nisFetching\n");
	console.log(
		`\nTimes function is being redone = ${timesfunctionIsBeingRedone}\n`
	);
	++timesfunctionIsBeingRedone;

	// const footerComponent = () =>
	// isLoading ? FooterComponent() : <View style={{ height: 200 }} />;

	const handleRefresh = async () =>
		await refetch({ throwOnError: true, cancelRefetch: true });

	const checkIfNeedsToLoadMore = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const { nativeEvent } = event;
			const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
			const isCloseToBottom =
				layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;

			if (isCloseToBottom) fetchNextPage();
		},
		[]
	);

	function handleGo2ReadmePage(default_branch: string, full_name: string) {
		nav.navigate("MarkdownScreen", { default_branch, full_name });
	}

	const updatedData = () => data?.pages?.flat() ?? [];
	const memoUpdatedData = useMemo(updatedData, [data]);

	return (
		<Container>
			<Header>
				<AppName>GitItUp</AppName>

				<HamMenu setIsOpen={setIsOpen} isOpen={isOpen} />
			</Header>

			{status === "loading" && (
				<View
					style={{
						position: "absolute",
						flex: 1,
						alignItems: "center",
						marginLeft: "auto",
						marginRight: "auto",
						marginTop: "auto",
						marginBottom: "auto",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						justifyContent: "center",
						backgroundColor: "white",
					}}
				>
					<Animation src={allTheDataAnimation} height={400} />
				</View>
			)}

			<BigList
				refreshControl={refreshControl(isFetching, handleRefresh)}
				onScroll={checkIfNeedsToLoadMore}
				data={memoUpdatedData}
				onPress={handleGo2ReadmePage}
				// ListEmptyComponent={footerComponent}
				// ListFooterComponent={footerComponent}
			/>
		</Container>
	);
}
