const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

const { logger } = require('../logger/logger');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                const expiryDate = new Date( Date.now() + 60 * 60 * 1000 * 24);// 쿠키 하루동안 저장
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token, {expires: expiryDate, sameSite: 'none', secure: true})//서로다른 도메인간 쿠키 저장시 sameSite 지정 필수
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, token: user.token
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err){ logger.error(err); return res.json({ success: false, err })};
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
