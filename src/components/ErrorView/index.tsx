import React from "react";

import { TryAgainButton } from "../TryAgainButton/indes";

import { Container, Title } from "./styles";

type Props = {
	error: Error["message"];
	onPress(): void;
};

export function ErrorView({ error, onPress }: Props) {
	return (
		<Container>
			<Title>
				{error.includes("timeout")
					? "This is taking too long\nSomething is wrong!\nTry again later."
					: error}
			</Title>

			<TryAgainButton onPress={onPress} />
		</Container>
	);
}
