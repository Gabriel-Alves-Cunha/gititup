import React, { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	TouchableOpacity,
	RefreshControl,
	ScrollView,
	StatusBar,
	Linking,
	Alert,
	View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import MarkdownWebView from "react-native-github-markdown";

import loadingTextAnimation from "../../assets/animations/loading-text.json";

import { getGithubReadmeString } from "../../query";
import { Animation } from "../../components/Animation";
import { ErrorView } from "../../components/ErrorView";

import { Container } from "./styles";

export function MarkdownScreen() {
	const route = useRoute();
	const { default_branch, full_name } = route.params as Params;
	const webviewRef = useRef(null);

	const [isLoadingRequest, setIsLoadingRequest] = useState(true);
	const [canGoForward, setCanGoForward] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [canGoBack, setCanGoBack] = useState(false);
	const [error, setError] = useState("");
	const [text, setText] = useState("");

	const backButtonHandler = () => {
		if (webviewRef.current) webviewRef.current.goBack();
	};

	const frontButtonHandler = () => {
		if (webviewRef.current) webviewRef.current.goForward();
	};

	async function getMarkdowData() {
		try {
			setIsLoadingRequest(true);
			setText(await getGithubReadmeString({ default_branch, full_name }));
			setIsRefreshing(false);
			setError("");
		} catch (error) {
			setError(error as Error["message"]);
		} finally {
			setIsLoadingRequest(false);
		}
	}

	function MyNagivator() {
		return (
			<View
				style={{
					justifyContent: "space-around",
					backgroundColor: "#f7f4f5",
					flexDirection: "row",
					padding: 10,
				}}
			>
				<TouchableOpacity onPress={backButtonHandler} disabled={!canGoBack}>
					<Feather
						color={canGoBack ? "black" : "gray"}
						name="arrow-left"
						size={24}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={frontButtonHandler} disabled={!canGoForward}>
					<Feather
						color={canGoBack ? "black" : "gray"}
						name="arrow-right"
						size={24}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	useEffect(() => {
		(async () => getMarkdowData())();
	}, []);

	return (
		<Container>
			<StatusBar barStyle="dark-content" />

			<MyNagivator />

			{isLoadingRequest ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Animation src={loadingTextAnimation} height={100} autoPlay loop />
				</View>
			) : error ? (
				<ErrorView error={error} onPress={getMarkdowData} />
			) : (
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={() => {
								setIsRefreshing(true);
								getMarkdowData();
							}}
						/>
					}
					style={{ height: "110%" }}
				>
					<MarkdownWebView
						onHttpError={(syntheticEvent) => {
							console.warn(
								"WebView received error status code: ",
								syntheticEvent.nativeEvent.statusCode
							);
						}}
						onRenderProcessGone={(syntheticEvent) => {
							console.warn(
								"WebView Crashed: ",
								syntheticEvent.nativeEvent.didCrash
							);
						}}
						renderLoading={() => (
							<ActivityIndicator
								color="black"
								size="large"
								style={{ flex: 1, justifyContent: "flex-start" }}
							/>
						)}
						onShouldStartLoadWithRequest={(event) => {
							if (!event.url.includes("https://raw.githubusercontent.com/"))
								return onLinkPress(event.url);
							return true;
						}}
						onNavigationStateChange={(navState) => {
							setCanGoForward(navState.canGoForward);
							setCanGoBack(navState.canGoBack);
						}}
						originWhitelist={["https://*", "git://*"]}
						androidLayerType={"hardware"}
						style={{ flex: 1 }}
						ref={webviewRef}
						content={text}
						allowsBackForwardNavigationGestures
						allowsFullscreenVideo
						pullToRefreshEnabled
						startInLoadingState
						domStorageEnabled
						scalesPageToFit
						highlight
					/>
				</ScrollView>
			)}
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
