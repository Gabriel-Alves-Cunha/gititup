import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { StatusBar } from "react-native";
import { LogBox } from "react-native";

import { AuthProvider } from "./src/hooks/auth";
import { Routes } from "./src/routes";

import theme from "./src/styles/theme";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const queryClient = new QueryClient();

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<StatusBar backgroundColor="transparent" barStyle="dark-content" />

			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<Routes />
				</QueryClientProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
