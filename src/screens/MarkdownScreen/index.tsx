import React, { useEffect, useState } from "react";
import { ScrollView, Linking, Alert, StatusBar, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import MarkdownWebView from "react-native-github-markdown";

import loadingTextAnimation from "../../assets/animations/loading-text.json";
import computadoraAnimation from "../../assets/animations/computadora.json";

import { getGithubReadmeString } from "../../query";
import { Animation } from "../../components/Animation";
import { ErrorView } from "../../components/ErrorView";

import { Container, BuildingMarkdown } from "./styles";

export function MarkdownScreen() {
	const route = useRoute();
	const { default_branch, full_name } = route.params as Params;

	const [isBuildingMarkdown, setIsBuildingMarkdown] = useState(false);
	const [isLoadingRequest, setIsLoadingRequest] = useState(false);
	const [error, setError] = useState("");
	const [text, setText] = useState("");

	async function getMarkdowData() {
		try {
			setIsLoadingRequest(true);
			setText(await getGithubReadmeString({ default_branch, full_name }));
			setError("");
		} catch (error) {
			setError(error as Error["message"]);
		} finally {
			setIsLoadingRequest(false);
		}
	}

	useEffect(() => {
		(async () => getMarkdowData())();
	}, []);

	return (
		<Container>
			<StatusBar barStyle="dark-content" />

			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ height: "110%" }}
			>
				{/* {error && <ErrorView error={error} onPress={getMarkdowData} />} */}

				{/* {isLoadingRequest ? (
					<Animation src={loadingTextAnimation} height={100} autoPlay loop />
				) : isBuildingMarkdown ? (
					<Animation src={computadoraAnimation} height={100} autoPlay loop />
				) : ( */}
				<MarkdownWebView
					onHttpError={(syntheticEvent) => {
						const { nativeEvent } = syntheticEvent;
						console.warn(
							"WebView received error status code: ",
							nativeEvent.statusCode
						);
					}}
					onRenderProcessGone={(syntheticEvent) => {
						const { nativeEvent } = syntheticEvent;
						console.warn("WebView Crashed: ", nativeEvent.didCrash);
					}}
					onNavigationStateChange={(navState) => {
						// Keep track of going back navigation within component
						navState.canGoBack = true;
					}}
					onScroll={(syntheticEvent) => {
						const { contentOffset } = syntheticEvent.nativeEvent;
						console.table(contentOffset);
					}}
					onLoadStart={() => setIsBuildingMarkdown(true)}
					onLoad={() => setIsBuildingMarkdown(false)}
					originWhitelist={["https://*", "git://*"]}
					androidLayerType={"hardware"}
					content={text}
					allowsBackForwardNavigationGestures
					pullToRefreshEnabled
					startInLoadingState
					domStorageEnabled
					highlight
				/>
				{/* )} */}
			</ScrollView>
		</Container>
	);
}

function onLinkPress(url: string) {
	Linking.openURL(url).catch((err) => {
		console.warn(
			`\nAn error ocorred when onpening link ${url}\n\n[ERROR] Unable to open link, ${err}`
		);
		Alert.alert("Erro ao abrir link!");
		return false;
	});
	return true;
}

type Params = {
	default_branch: string;
	full_name: string;
};
