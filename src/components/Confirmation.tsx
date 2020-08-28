import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useNavigate } from "@reach/router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import firebase from "../firebaseConfig";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		submitButton: {
			width: "200px",
        },
        infoText: {
            margin: 'auto',
            textAlign: 'left'
        },
        textInput: {
            width: '100%',
            margin: '8px 8px 20px 1px'
        },
        resendLink: {
            width: '100%',
            marginTop: theme.spacing(2)
        }
	})
);
export interface ConfirmationProps {
    output: any;
    number: string;
}

const Confirmation: React.SFC<ConfirmationProps> = ({
	output, number
}: ConfirmationProps) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [verificationCode, setVerificationCode] = React.useState("");
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");

	const setCode = (event: any) => {
		setVerificationCode(event.target.value);
	};

	const handleVerifyCode = () => {
		// Request for OTP verification
		if (verificationCode.length === 6) {
			// Unique code generated for verification
			output
				.confirm(verificationCode)
				.then((user: any) => {
					navigate("/user-details", { state: { phoneNumber: number } });
				})
				.catch((error: any) => {
					setError(true);
					setErrorMessage(error.message);
					console.log(error.message);

				});
		} else {
			setError(true);
			setErrorMessage("Please enter a 6 digit OTP code.")
		}
	};

    const resendOTP = () => {
		console.log('enter');
        var applicationVerifier = new firebase.auth.RecaptchaVerifier(
			'recaptcha-container');
		var provider = new firebase.auth.PhoneAuthProvider();
		provider.verifyPhoneNumber('+16505550101', applicationVerifier)
			.then(function(verificationId) {
			  var code = window.prompt('Please enter the verification ' +
				  'code that was sent to your mobile device.');
			  return firebase.auth.PhoneAuthProvider.credential(verificationId,
				  code as any);
			})
			.then(function(phoneCredential) {
			  return firebase.auth().signInWithCredential(phoneCredential);
			});
        /*provider.verifyPhoneNumber(number, applicationVerifier)
            .then(function(verificationId) {
				console.log('Id is: ',verificationId);
              var verificationCode = 'Please enter the verification ' +
                  'code that was sent to your mobile device.';
              return firebase.auth.PhoneAuthProvider.credential(verificationId,
                  verificationCode);
            })
            .then(function(phoneCredential) {
              return firebase.auth().signInWithCredential(phoneCredential);
            });*/
    }

	return (
		<div style={{margin: 'auto'}}>
            <Typography variant="body2" gutterBottom className={classes.infoText}>
                We have sent the security code to {number}.
                <br/>
                Enter it below to verify your phone number.
            </Typography>
			<TextField
				placeholder="Enter the verification code..."
				value={verificationCode}
				onChange={setCode}
				label="Verification Code"
                inputProps={{ maxLength: 6 }}
				className={classes.textInput}
				id="verification-code"
				error={error ? true : false} //this will show error message only when there is error
                helperText={errorMessage}
			/>
            <div id="recaptcha-container"></div>
			<Button
				onClick={handleVerifyCode}
				variant="contained"
				color="primary"
				className={classes.submitButton}
			>
				Submit Value
			</Button>
            <Link
                component="button"
                variant="body2"
                className={classes.resendLink}
                onClick={resendOTP}
                >
                Resend Code
            </Link>
		</div>
	);
};

export default Confirmation;
