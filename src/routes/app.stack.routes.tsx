import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { MarkdownScreen } from "../screens/MarkdownScreen";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
	return (
		// This is an unordered list of screens
		<Navigator headerMode="float" initialRouteName="GitItUp">
			<Screen name="GitItUp" component={Home} />
			<Screen name="MarkdownScreen" component={MarkdownScreen} />
		</Navigator>
	);
}
