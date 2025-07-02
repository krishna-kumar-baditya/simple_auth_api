const UserRepository = require("../repositories/user.repositories");
// const { signupSchema, signinSchema } = require("../validators/auth.validator");
// const UserModel = require("../models/user.model");
// const Mailer = require("../helper/mailer");
// const deleteOldImage = require("../helper/deletefile");
// const jwt = require("jsonwebtoken");
class UserController {
    async profileDetails(req, res) {
        try {
            const user = req.user;
            const userWithoutSensitiveData = await UserRepository.findById(
                user._id
            );

            return res.status(200).send({
                status: 200,
                data: userWithoutSensitiveData,
                message: "User profile details fetched successfully!",
            });
        } catch (error) {
            console.log(
                `error in profileDetails of usercontroller due to : ${error.message} `
            );
            return res.status(500).send({
                status: 500,
                data: {},
                message: error.message || error,
            });
        }
    }
    async getAllUsers(req, res) {
        try {
            const { page = 1, limit = 5 } = req.query;
            const allUsersData = await UserRepository.getAllUsers(page, limit);
            console.log("allUsersData ", allUsersData);
            if (allUsersData) {
                return res.status(200).send({
                    status: 200,
                    data: allUsersData,
                    message: "All users data fetched successfully",
                });
            }
        } catch (error) {
            console.log(
                `error in getAllUsers of usercontroller due to : ${error.message} `
            );
            return res.status(500).send({
                status: 500,
                data: {},
                message: error.message || error,
            });
        }
    }
    async getSpecificUser(req, res) {
        try {
            const user = req.user;
            console.log("user ", user);
            const data = await UserRepository.findById(user._id);
            if (data) {
                return res.status(200).send({
                    status: 200,
                    data: data,
                    message: "User data fetch successfully",
                });
            }
        } catch (error) {
            console.log(
                `error in getSpecificUser of usercontroller due to : ${error.message} `
            );
            return res.status(500).send({
                status: 500,
                message: error.message || error,
            });
        }
    }
    async deleteUser(req, res) {
        try {
            // const user = req.user;
            // console.log("user ", user);
            const {id} = req.params
            console.log(id);
            
            const data = await UserRepository.deleteUser(id);
            if (data) {
                return res.status(200).send({
                    status: 200,
                    data: id,
                    message: "data deleted successfully",
                });
            }
        } catch (error) {
            console.log(
                `error in deleteUser of usercontroller due to : ${error.message} `
            );
            return res.status(500).send({
                status: 500,
                message: error.message || error,
            });
        }
    }
}
module.exports = new UserController();
