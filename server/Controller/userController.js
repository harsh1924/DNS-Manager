import userModel from "../Schema/userModel.js";
import NewError from "../utils/NewError.js";

const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });

    if (!name || !email || !password) {
        return next(new NewError('All fields are required', 400));
    }
    if (userExists) {
        return next(new NewError('Account already exists', 400));
    }

    const user = await userModel.create({
        name,
        email,
        password
    });

    if (!user) {
        return next(new NewError('User registration failed. Please try again later', 400));
    }

    await user.save();
    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie('token', token, cookieOptions);
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
    })
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new NewError('All fields are required', 400));
    }

    const user = await userModel.findOne({ email }).select('+password');
    if (!(user && (await user.comparePassword(password)))) {
        return next(new NewError('Email or password do not match or user does not exist', 401));
    };
    const token = await user.generateJWTToken();
    user.password - undefined;
    res.cookie('token', token, cookieOptions);
    res.status(200).json({
        success: true,
        message: 'User Logged in successfully',
        user
    });
};

export const logout = async (req, res, next) => {
    res.cookie('token', null, {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 0,
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
}

export const getUserDetails = async (req, res, next) => {
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        success: true,
        message: 'User Details', 
        user
    })
}