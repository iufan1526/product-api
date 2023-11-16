import express from 'express';
import User from '../models/user.js';
import SuccessResult from '../util/success/success.js';
import ErrorResult from '../util/error/error.js';

const router = express.Router();

/**
 * 사용자 조회 API
 */
router.get('/user', async (req, res) => {
    if (req.user === undefined || req.user === null) {
        return res.status(400).json(ErrorResult.errorAuthToken());
    }

    const selectUser = await User.findOne({
        attributes: ['user_name', 'user_email'],
        where: {
            id: req.user,
        },
    });

    res.status(200).json(SuccessResult.successUser(selectUser));
});

export default router;
