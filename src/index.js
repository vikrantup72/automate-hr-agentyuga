import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<GoogleOAuthProvider clientId="252438103570-0t66k1eempo83uohnk9c9drlfskfe3g8.apps.googleusercontent.com">
		<App />
	</GoogleOAuthProvider>
);
