import React, { useCallback, useState } from "react";
import { NativeScrollEvent, View } from "react-native";
import { InfiniteData, useInfiniteQuery } from "react-query";
import { useNavigation } from "@react-navigation/core";

import { FetchReposProps, RepoProps } from "../../@types/types";
import { fetchReposAxios } from "../../query";
import BigList from "../../components/BigList";
import {
	FooterComponent,
	refreshControl,
	retryDelay,
} from "../../components/BigList/utils";

import { Container, Header, AppName } from "./styles";
import { NativeSyntheticEvent } from "react-native";
import { useMemo } from "react";

let count = 1;
let timesfunctionIsBeingRedone = 1;

export function Home() {
	const nav = useNavigation();
	const [language, setLanguage] = useState<FetchReposProps["language"]>("");
	const [since, setSince] = useState<FetchReposProps["since"]>("lastMonth");

	const {
		data,
		fetchNextPage,
		isFetching,
		isFetchingNextPage,
		status,
		refetch,
	} = useInfiniteQuery(
		"repos",
		async () => await fetchReposAxios({ language, since, pageParam: 1 }),
		{
			onSuccess: (data) => console.log("\n\n[LOG] data =", data),
			getNextPageParam: (_lastPage, pages) => {
				return { language, since, pageParams: pages.length + 1 };
			},
			onSettled: (_data, error) => {
				console.log(`\n\n[LOG] onSettled(${count}), error = ${error}`);
				++count;
			},
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: 10000000,
			retryDelay,
		}
	);

	if (isFetching) console.log("\nisFetching\n");
	console.log(
		`\n timesfunctionIsBeingRedone = ${timesfunctionIsBeingRedone}\n`
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

	console.log(`\n[LOG] setRepo(${count}), data.length =`, data?.pages.length);

	return (
		<Container>
			{/* <Header>
					<AppName>GitItUp</AppName>
				</Header> */}

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

// map((page) => {
// 	page.map((repo) => repo);
// }
