import NewError from "../utils/NewError.js";
import jwt from 'jsonwebtoken'

export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new NewError('Please Login to continue', 400));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    if (!decoded) {
        return next(new NewError('Please Login to continue', 401));
    }

    req.user = decoded;
    next();
};

export const authorizeRoles = (...roles) => async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new NewError('Unauthorized Role', 403));
    }

    next();
}