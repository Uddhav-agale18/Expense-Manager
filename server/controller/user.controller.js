const { generateToken } = require('../auth/userAuth');
const User = require('../model/user.model')
const bcrypt = require('bcrypt')
// const cookie = require('cookie')

exports.createUser = async (req, res) => {
    try {
        const result = await User.create(req.body);
        res.status(200).json({ message: "User Successfully Created", data: result })
    }
    catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(500).send(error.message || "internal server error")
    }
}

exports.login = async (req, res) => {

    try {
        const { username, password } = req.body;

        let user = await User.findOne({ email: username });
        if (!user) {
            user = await User.findOne({ phone: username });
        }

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(500).json({ message: "Invalid Username Or Password" })
        }
        let userData = {
            id: user._id,
            email: user.email
        }
        const token = generateToken(userData)
        res.cookie("token", token)
        res.status(200).json({ message: "Login Successfully", user: user, token: token })
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Login Err" })

    }

}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(500).json("User Not Found")
        } else {
            res.status(200).json(user)
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.updateUser = async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if (!user) {
            return res.status(500).json("user not found")
        }
        const result = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if (!user) {
            return res.status(200).json("user Not Found")
        }
        const result = await User.findByIdAndDelete(id, { new: true });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.imageUpload = async (req, res) => {

    try {
        const id = req.user.id;
        const user = await User.findById(id)
        if (!user) {
            return res.status(200).json("user Not Found for upload image")
        }

        const updateImage = {
            imageUrl: `http://localhost:3000/profile/${req.file.filename}`
        }
        const result = await User.findByIdAndUpdate(id, updateImage, { new: true })
        res.json({
            success: 1,
            profile_url: `http://localhost:3000/profile/${req.file.filename}`
        })

    } catch (error) {
        res.status(500).json({ error: error })

    }

}
