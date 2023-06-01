const User = require('../models/user.model');

exports.user_add = (req, res) => {
    console.log('ggg',req);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User Already Exists"
                });
            } else {
                const users = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    mobilenumber: req.body.mobilenumber,
                });
                users.save().then(result => {
                    res.status(200).json({
                        message: "User Added Sucessfully",
                        data: result,
                        status: 200
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            }

        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.all_users = async (req, res, next) => {
    try {
        let { page, size } = req.query;
        // Empty check for Page & Size
        if (!page) {
            page = 1
        } if (!size) {
            size = 10
        }
        // Data Limits Display
        const limit = parseInt(size);

        // Data Next Skip Diaplay
        const skip = (page - 1) * size;

        // Data Retrive From DB
        const usersCount = await User.find();
        const users = await User.find().limit(limit).skip(skip)

        res.status(200).json({
            message: "All Users",
            page,
            size,
            userCount: usersCount.length,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
};