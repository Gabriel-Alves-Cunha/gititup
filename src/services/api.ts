import { Octokit } from "@octokit/core";
import axios from "axios";

export const octokit = new Octokit({
	baseURL: "https://github.com/search/repositories",
	headers: { accept: "application/vnd.github.v3+json" },
	timeout: 3000,
});

export const api = axios.create({
	headers: { Accept: "application/vnd.github.v3+json" },
	timeout: 3000,
});
