import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import PhoneAuth from "./components/PhoneAuth";
import UserDetails from "./components/UserDetails";

import { Router } from "@reach/router";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function App() {
	return (
		<div className="App">
			<CssBaseline />
			<Container maxWidth="lg">
				<main>
					<Box pt={3} pb={6}>
						<Typography variant="h3" component="h3">
							Phone Verification App
						</Typography>
						<Typography variant="body1">
							A web application for verifying the mobile number so that we can
							send the promotions/offers to the subscribed users.
						</Typography>
					</Box>
					<Router>
						<PhoneAuth path="/" />
						<UserDetails path="user-details" />
					</Router>
				</main>
			</Container>
		</div>
	);
}

export default App;
