import React, { useRef } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import LottieView from "lottie-react-native";

import menuAnimation from "../../assets/animations/hamburger-menu.json";

import { Menu } from "./styles";

type Props = {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
};

export function HamMenu({ setIsOpen, isOpen }: Props) {
	const animation = useRef(null);

	const onPress = () => {
		if (!isOpen) {
			setIsOpen(true);
			animation.current?.play(0, 8);
		} else if (isOpen) {
			setIsOpen(false);
			animation.current?.play(8, 16);
		}
	};

	const onAnimationFinish = () => animation.current?.pause();

	return (
		<Menu onPress={onPress}>
			<LottieView
				onAnimationFinish={onAnimationFinish}
				source={menuAnimation}
				style={{ height: 300 }}
				ref={animation}
				loop={false}
				speed={3}
				resizeMode="contain"
				autoSize
			/>
		</Menu>
	);
}
