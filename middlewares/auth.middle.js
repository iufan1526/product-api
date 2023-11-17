import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ErrorResult from '../util/error/error.js';

/**
 * 인증 미들웨어
 */
export default (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization === undefined || authorization === null) {
        return res.status(400).json(ErrorResult.errorAuthToken());
    }

    const requestAuthToken = authorization.split(' ');

    let resultAuth;
    try {
        resultAuth = jwt.verify(requestAuthToken[1], process.env.JWT_KEY);
    } catch (err) {
        console.log(err);
        return res.status(400).json(ErrorResult.errorAuthToken());
    }

    req.user = resultAuth.userid;

    next();
};
