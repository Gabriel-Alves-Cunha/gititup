import React from "react";
import { SafeAreaView, ScrollView, Linking, Alert } from "react-native";
import { StatusBar } from "react-native";
import Markdown from "react-native-markdown-display";

import { getGithubReadmeString } from "../../query";

import { Container } from "./styles";

type Props = {
	default_branch: string;
	full_name: string;
};

export function MarkdownScreen(props: Props) {
	const text = getGithubReadmeString(props);

	return (
		<Container>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					style={{ height: "100%" }}
				>
					<Markdown onLinkPress={(url) => onLinkPress(url)}>{text}</Markdown>
				</ScrollView>
			</SafeAreaView>
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
