import React from "react";
import { ActionMessage } from "../ActionMessage";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const LandingLayout = (props) => {
	return (
		<>
			<Navbar />
			{props.children}
			<ActionMessage />
			<Footer />
		</>
	);
};
