import styled from "styled-components/native";

export const Container = styled.View`
	width: 100%;
	height: 0.5px;

	background-color: ${({ theme }) => theme.colors.text_detail};
`;
