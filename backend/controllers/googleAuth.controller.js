const passport = require("passport");
const { UnauthenticatedError } = require("../errors");
const CustomAPIError = require("../errors/custom-error");
const CLIENT_URL = "http://ec2-3-14-136-159.us-east-2.compute.amazonaws.com/"

exports.login = (req, res) => {
	res.redirect(CLIENT_URL+'homepage');
};

exports.successLogin = (req, res) => {
	const user = req.user;
	res.json({ user });
};

exports.failedLogin = (req, res) => {
	throw new UnauthenticatedError("LoginFail");
};

exports.logout = (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect(CLIENT_URL + 'login')

};

exports.googleAuth = passport.authenticate("google", {
	scope: ["profile", "email"],
});

exports.googleAuthCallback = passport.authenticate("google", {
	successRedirect: CLIENT_URL,
	failureRedirect: CLIENT_URL + 'login',
});