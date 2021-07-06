import { ReactNode } from "react";
import * as AuthSession from "expo-auth-session";

import { api } from "../services/api";

export type PromptAsyncResult = Exclude<
	AuthSession.AuthSessionResult,
	{ type: "cancel" | "dismiss" | "locked" }
>;

export type StoragedUser = {
	token: string;
};

export type AuthResponse = AuthSession.AuthSessionResult & {
	params: {
		access_token?: string;
		error?: string;
	};
};

export type AuthContextProps = {
	signOut(): Promise<void>;
	signIn(): Promise<void>;
	user: StoragedUser;
	loading: boolean;
};

export type AuthProviderProps = {
	children: ReactNode;
};

export const clientSecret = process.env.CLIENT_SECRET as string;
export const clientId = process.env.CLIENT_ID as string;

export const revocationEndpoint = `https://github.com/settings/connections/applications/${clientId}`;
export const authorizationEndpoint = "https://github.com/login/oauth/authorize";
export const tokenEndpoint = "https://github.com/login/oauth/access_token";
export const authUrl = "https://auth.expo.io/@gabriel925486/gititup";
export const scopes = ["public_repo"];

export const discovery: AuthSession.DiscoveryDocument = {
	authorizationEndpoint,
	revocationEndpoint,
	tokenEndpoint,
};

export async function createTokenWithCode(code: string) {
	console.log("\n[LOG] code in createToken =", code);

	const url =
		`https://github.com/login/oauth/access_token` +
		`?client_id=${clientId}` +
		`&client_secret=${clientSecret}` +
		`&code=${code}`;

	try {
		const res = await api.post(url, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		console.log("[LOG] res.request._response =", res.request._response);

		const access_token: string = res.data.access_token;
		console.log("[LOG] access_token =", access_token);

		return access_token;
	} catch (error) {
		throw new Error(error);
	}
}
