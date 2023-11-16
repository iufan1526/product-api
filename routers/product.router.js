import express from 'express';
import User from '../models/user.js';
import Product from '../models/product.js';
import SuccessResult from '../util/success/success.js';
import ErrorResult from '../util/error/error.js';

const router = express.Router();

/**
 * 상품 등록 API
 */
router.post('/product', async (req, res) => {
    const { product_name, product_description, product_state } = req.body;

    if (req.user === undefined || req.user === null) {
        return res.status(400).json(ErrorResult.errorAuthToken());
    }

    let createResult;
    try {
        createResult = await Product.create({
            product_name,
            product_description,
            product_state,
            user_id: req.user,
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json(ErrorResult.errorServer());
    }

    res.status(201).json(SuccessResult.successCreate(createResult, '상품등록이 정상적으로 완료되었습니다.'));
});

export default router;
