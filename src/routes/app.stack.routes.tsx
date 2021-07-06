import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { MarkdownScreen } from "../screens/MarkdownScreen";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
	return (
		// This is an unordered list of screens
		<Navigator headerMode="none" initialRouteName="GitItUp">
			<Screen name="GitItUp" component={Home} />
			<Screen
				name="MarkdownScreen"
				component={MarkdownScreen}
				options={{
					headerTitleAlign: "center",
					headerTitle: "Readme",
					headerShown: true,
				}}
			/>
		</Navigator>
	);
}
