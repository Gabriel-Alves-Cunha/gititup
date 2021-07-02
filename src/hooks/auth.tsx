import React, { createContext, useContext, useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import { Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGED_USER } from "../config/storage";
import { api } from "../services/api";
import {
	createTokenWithCode,
	AuthProviderProps,
	PromptAsyncResult,
	AuthContextProps,
	StoragedUser,
	discovery,
	clientId,
	scopes,
} from "./utils";

export const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps) {
	console.log(
		"-----------------------------------------------------------------"
	);

	const redirectUri = AuthSession.makeRedirectUri();
	const [_request, _response, promptAsync] = AuthSession.useAuthRequest(
		{
			redirectUri,
			clientId,
			scopes,
		},
		discovery
	);
	const [user, setUser] = useState({} as StoragedUser);
	const [isLoading, setIsLoading] = useState(false);

	async function signIn() {
		console.log("\nSigning in!\n");
		setIsLoading(true);

		try {
			const result = (await promptAsync()) as PromptAsyncResult;
			if (result.type !== "success")
				throw new Error("\n[ERROR] promptAsync() returned an error: " + result);

			const token = await createTokenWithCode(result.params.code);

			api.defaults.headers.authorization = `Bearer ${token}`;
			Octokit.defaults({ auth: token });

			const userData: StoragedUser = {
				token,
			};

			setUser(userData);
			storeUser(userData);
		} catch (error) {
			console.error("\n[ERROR]: " + JSON.stringify(error));
			Alert.alert("Erro", "Houve um erro ao conectar com o servidor :(");
		}

		setIsLoading(false);
	}

	async function signOut() {
		console.log("\nSigning out!\n");

		setUser({} as StoragedUser);

		await AsyncStorage.removeItem(STORAGED_USER);
	}

	async function storeUser(userData: StoragedUser) {
		try {
			await AsyncStorage.setItem(STORAGED_USER, JSON.stringify(userData));
		} catch (error) {
			console.error(error);
		}
	}

	async function loadStoragedUserData() {
		const storagedData = await AsyncStorage.getItem(STORAGED_USER);
		console.log("\n[LOG] storagedData =", storagedData);

		if (storagedData) {
			const userData = JSON.parse(storagedData) as StoragedUser;

			Octokit.defaults({ auth: userData.token });
			api.defaults.headers.authorization = `Bearer ${userData.token}`;

			setUser(userData);
		}
	}

	useEffect(() => {
		loadStoragedUserData();
		console.log("\n[LOG] user =", user);
	}, []);

	return (
		<AuthContext.Provider
			value={{ loading: isLoading, user, signIn, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const ctx = useContext(AuthContext);
	return ctx;
}

export { useAuth, AuthProvider };
