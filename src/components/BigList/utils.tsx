import React from "react";
import { RefreshControl, View } from "react-native";

import { RepoProps } from "../../@types/types";
import { Loading } from "../Loading";

export function FooterComponent() {
	return (
		<View style={{ marginVertical: 200 }}>
			<Loading />
		</View>
	);
}

export function keyExtractor(repo: RepoProps) {
	return repo.html_url;
}

export function retryDelay(attempt: number) {
	// exponential backoff
	return Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000);
}

export function refreshControl(refreshing: boolean, handleRefresh: () => void) {
	return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />;
}
