import { FetchReposProps, GithubRepoProps, RepoProps } from "../@types/types";
import { api, octokit } from "./../services/api";

export async function fetchRepos({
	language = "",
	since = "lastMonth",
	pageParam = 1,
}: FetchReposProps) {
	// page is not working, it's returning 100 at a time! So I'm just 'using' this function to get the return type :(
	const l = encodeURIComponent(language);
	const lang = l ? `&language=${l}&` : "";
	const lastMonth = getLastMonth();

	const q = `sort=stars&order=desc&per_page=10&page=${pageParam}`;
	console.log("\n\n[LOG] queryUrl =", q);

	try {
		const res = await octokit.request("GET /repositories", {
			q,
		});

		// console.log("\n\n[LOG] res =", res);
		// console.log("\n\n[LOG] res.data =", res.data);
		// console.log("\n\n[LOG] keys of res =", Object.keys(res));
		// console.log("\n\n[LOG] res.status =", res.status);
		// console.log("\n\n[LOG] res.url =", res.url);
		// console.log("\n\n[LOG] res.headers =", res.headers);
		// console.log("\n\n[LOG] res.data.length =", res.data.length);

		return res.data;
	} catch (error) {
		console.error(`\n[ERROR] fetchRepos(): ${error}`);
		throw new Error(error);
	}
}

export async function fetchReposAxios({
	language = "",
	since = "lastMonth",
	pageParam = 1,
}: FetchReposProps) {
	const l = encodeURIComponent(language);
	const lang = l ? `language=${l}&` : "";
	const lastMonth = getLastMonth();
	// const sinceOption = since ==="lastMonth"?lastMonth:lastWeek;
	const url = `?q=created:>=${lastMonth}&${lang}sort=stars&order=desc&per_page=10&page=${pageParam}`;
	console.log("\n\n[LOG] queryUrl =", url);

	try {
		const res = await api.get(
			"https://api.github.com/search/repositories" + url
		);

		// console.log("\n\n[LOG] res =", res);

		const repos: RepoProps[] = res.data.items.map((repo: GithubRepoProps) => {
			const ret: RepoProps = {
				avatar_url: repo.owner?.avatar_url ?? "",
				stargazers_count: repo.stargazers_count,
				default_branch: repo.default_branch,
				login: repo.owner?.login ?? "",
				description: repo.description,
				full_name: repo.full_name,
				language: repo.language,
				html_url: repo.html_url,
				name: repo.name,
			};
			return ret;
		});

		// console.log("\n[LOG] repos =", repos);

		return repos;
	} catch (error) {
		console.log(JSON.stringify(error));
		return [];
	}
}

export async function getGithubReadmeString({
	default_branch,
	full_name,
}: Pick<RepoProps, "default_branch" | "full_name">): Promise<string> {
	try {
		const res = await api.get(
			`https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
			{ timeout: TIMEOUT_INTERVAL_MS }
		);
		// console.log("\n\n[LOG] res =", res);

		return res.data;
	} catch (error) {
		console.log(JSON.stringify(error));
		throw new Error(error);
	}
}

function getLastMonth() {
	const lastMonth = new Date();
	lastMonth.setDate(0);
	lastMonth.setDate(1);
	return lastMonth.toISOString().split("T")[0]; // YYYY-MM-dd
}

export const TIMEOUT_INTERVAL_MS = 1000 * 10;
