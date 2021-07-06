import React from "react";
import LottieView from "lottie-react-native";

import { AnimationObject } from "../../@types/types";

type Props = {
	src: string | AnimationObject;
	autoPlay: boolean;
	height: number;
	loop: boolean;
};

export function Animation({
	src,
	height,
	autoPlay = true,
	loop = true,
}: Props) {
	return (
		<LottieView
			source={src}
			style={{ height }}
			resizeMode="contain"
			autoPlay={autoPlay}
			loop={loop}
		/>
	);
}
