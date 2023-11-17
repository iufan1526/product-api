import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { ValidatePassword, ValidateEmail } from '../util/validation/auth.validation.js';
import ErrorResult from '../util/error/error.js';
import SuccessResult from '../util/success/success.js';

const router = express.Router();
dotenv.config();

/**
 * 회원가입 API
 */
router.post('/auth/signup', async (req, res) => {
    const { user_email, user_password, passwordConfirm, user_name } = req.body;

    if (!ValidatePassword.validatePasswordLength(user_password)) {
        return res.status(400).json(ErrorResult.errorPasswordLength());
    }
    if (!ValidatePassword.validateEqualPassword(user_password, passwordConfirm)) {
        return res.status(400).json(ErrorResult.errorNotEqualPassword());
    }

    let selectUser;
    try {
        selectUser = await User.findAll({
            where: {
                user_email,
            },
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json(ErrorResult.errorServer());
    }

    if (selectUser.length > 0) {
        return res.status(400).json(ErrorResult.errorDuplicatingEmail());
    }
    if (!ValidateEmail.validateConfirmEmail(user_email)) {
        return res.status(400).json(ErrorResult.errorBadPatternEmail());
    }

    let resultUser;
    try {
        resultUser = await User.create({
            user_email,
            user_name,
            user_password: bcrypt.hashSync(user_password, 10),
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json(ErrorResult.errorServer());
    }

    return res.status(201).json(SuccessResult.success(resultUser, '회원이 정상적으로 등록 완료되었습니다.'));
});

/**
 * 로그인 API
 */
router.post('/auth/login', async (req, res) => {
    const { user_email, user_password } = req.body;

    let selectUser;
    try {
        selectUser = await User.findOne({
            where: {
                user_email,
            },
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json(ErrorResult.errorServer());
    }

    if (selectUser.length === 0) {
        return res.status(400).json(ErrorResult.errorEmptyEmail());
    }

    const comparePassword = await bcrypt.compare(user_password, selectUser.dataValues.user_password);
    if (!comparePassword) {
        return res.status(400).json(ErrorResult.errorNotEqualPassword());
    }

    // jwt 발급
    const token = jwt.sign(
        {
            userid: selectUser.dataValues.id,
        },
        process.env.JWT_KEY,
        {
            expiresIn: '12h',
        }
    );

    res.status(200)
        .header({ authorization: `Bearer ${token}` })
        .json(SuccessResult.successLogin(token));
});

export default router;
