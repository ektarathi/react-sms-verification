import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PhoneAuth from './components/PhoneAuth';
import firebase from "./firebaseConfig.js";

Enzyme.configure({ adapter: new Adapter() });

function validatePhoneNumber(value: any) {
  var regexp = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
	return regexp.test(value);
}

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Phone Verification App/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders Child component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(PhoneAuth)).toHaveLength(1);
});

describe('Firebase Util Test Suite', () => {
  beforeAll(async () => {
    jest.setTimeout(3000);
    firebase.initializeApp({
      projectId: "react-sms-verification",
      auth: { uid: "ekta", email: "rathiekta2801@gmail.com" }
    });
  })
});

describe("fetch input values", () => {
  it("Should capture content correctly onChange", () => {
    const wrapper = mount(<PhoneAuth path={"/"}/>);
    const content = wrapper.find("input").at(0);
    content.value = '+447436214960';
    content.simulate("change", { target: {value: '+447435214960'}});
    let number = validatePhoneNumber(content.value);
  });
});

it('should verify phone number with verification code', () => {
  // Turn off phone auth app verification.
  firebase.auth().settings.appVerificationDisabledForTesting = true;

  var phoneNumber = "+447435214960";
  var testVerificationCode = "456789";

  var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      return confirmationResult.confirm(testVerificationCode)
    }).catch(function (error) {
      console.log(error);
    });
});