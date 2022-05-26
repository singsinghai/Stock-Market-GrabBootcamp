import { Flex } from "@chakra-ui/react";
import * as React from "react";

export const SplitView = props => {
	const { left, right } = props;

	// Nếu chỉ có left hoặc right thì giãn full chiều ngang
	if (left && !right) {
		return left;
	}

	if (right && !left) {
		return right;
	}

	// Nếu có cả left và right thì split view
	return (
		<Flex direction="row" alignItems="start" >
			<div> {left} </div>
			<div style={{ display: "flex", flex: "1 1 0%", paddingLeft: "0.5rem" }}>{right}</div>
		</Flex>
	)

}