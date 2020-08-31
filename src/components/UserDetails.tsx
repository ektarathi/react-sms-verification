import * as React from "react";
import { useNavigate } from "@reach/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Phone from "../assets/images/phone.png";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		mobileImage: {
			width: "70%",
			height: "100%",
		},
		details: {
			textAlign: "left",
			margin: "auto",
			"& > *": {
				margin: theme.spacing(1),
				width: "50ch",
			},
		},
		button: {
			width: "200px",
		},
	})
);

export interface UserDetailsProps {
	path: string;
}

const UserDetails = (props: any) => {
    const classes = useStyles();
    const navigate = useNavigate();
	let number = props.location.state.phoneNumber;

	return (
		<div className={classes.root}>
			<Grid container
				spacing={3}
				alignItems="center"
				justify="center"
			>
				<Grid item xs={12} sm={6}>
					<div className={classes.details}>
						<Typography variant="h4" component="h4" style={{width: 'auto'}}>
							You're all set!
						</Typography>
						<Typography variant="body2">
							We have verified {number} as your phone number. Congratulations!
						</Typography>
						<Button
							variant="contained"
							color="primary"
                            className={classes.button}
                            onClick={() => navigate("/")}
						>
							{" "}
							Exit{" "}
						</Button>
					</div>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Avatar alt="Phone" src={Phone} className={classes.mobileImage} />
				</Grid>
			</Grid>
		</div>
	);
};

export default UserDetails;
