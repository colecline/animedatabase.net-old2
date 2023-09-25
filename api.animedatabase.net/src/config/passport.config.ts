import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserService from "../services/UserService";

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await UserService.loginUser(username, password);
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	})
);

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await UserService.findUserById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
