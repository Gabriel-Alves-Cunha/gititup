import { fetchRepos } from "../query";

type Await<T> = T extends {
	then(onfulfilled?: (value: infer U) => unknown): unknown;
}
	? U
	: T;

type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type GithubRepoProps = ArrayElement<
	Exclude<Await<ReturnType<typeof fetchRepos>>, undefined>
>;

export type useQueryResponse = {
	error: string | null;
	isLoading: boolean;
	isError: boolean;
	data: any;
};

export type FetchReposProps = {
	since: "lastWeek" | "lastMonth";
	language: string;
	pageParam: number;
};

type Owner = NonNullable<GithubRepoProps["owner"]>;
export type RepoProps = Pick<
	GithubRepoProps,
	| "html_url"
	| "description"
	| "name"
	| "stargazers_count"
	| "language"
	| "full_name"
	| "default_branch"
> &
	Pick<Owner, "login" | "avatar_url">;