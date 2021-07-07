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
	pageNumber: number;
	language: string;
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

export type AnimationObject = {
	// From lottieView
	v: string;
	fr: number;
	ip: number;
	op: number;
	w: number;
	h: number;
	nm: string;
	ddd: number;
	assets: any[];
	layers: any[];
};

export type Language = FetchReposProps["language"];
export type Since = FetchReposProps["since"];

export type usingQueryParams = {
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
	setRepos: React.Dispatch<React.SetStateAction<RepoProps[]>>;
	language: Language;
	pageNumber: number;
	since: Since;
};
