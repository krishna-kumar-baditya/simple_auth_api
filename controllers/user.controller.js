const UserRepository = require("../repositories/user.repositories");
const { updateUserSchema } = require("../validators/user.validator");
const UserModel = require("../models/user.model");
const deleteOldImage = require("../helper/deletefile");
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
    // async getSpecificUser(req, res) {
    //     try {
    //         const user = req.user;
    //         console.log("user ", user);
    //         const data = await UserRepository.findById(user._id);
    //         if (data) {
    //             return res.status(200).send({
    //                 status: 200,
    //                 data: data,
    //                 message: "User data fetch successfully",
    //             });
    //         }
    //     } catch (error) {
    //         console.log(
    //             `error in getSpecificUser of usercontroller due to : ${error.message} `
    //         );
    //         return res.status(500).send({
    //             status: 500,
    //             message: error.message || error,
    //         });
    //     }
    // }
    async getSpecificUser(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const data = await UserRepository.findById(id);
            if (data) {
                return res.status(200).send({
                    status: 200,
                    data: data,
                    message: "Specific User data fetch successfully",
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
    async updateUserData(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const { error, value } = updateUserSchema.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                const message = error.details.map((detail) => detail.message);
                return res.status(400).send({
                    status: 400,
                    data: {},
                    message: message,
                });
            }
            const { email, password, firstName, lastName, age, role } =
                value ?? {};
            const hashedPassword = await new UserModel().generateHash(password);
            const profilePic = req.file ? req.file.filename : null;
            const isEmailExists = await UserRepository.emailExists(email, id);
            if (isEmailExists) {
                deleteOldImage("uploads/profile", profilePic);
                return res.status(400).send({
                    status: 400,
                    data: {},
                    message: "Email is already taken",
                });
            }
            const userObj = {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                age,
                role,
                profilePic,
            };

            const updatedData = await UserRepository.updateUserData(
                id,
                userObj
            );
            console.log("updatedData ", updatedData);

            if (updatedData) {
                return res.status(200).send({
                    status: 200,
                    message: "update data successfully",
                });
            }
        } catch (error) {
            console.log(
                `error in updateUserData of usercontroller due to : ${error.message} `
            );
            return res.status(500).send({
                status: 500,
                message: error.message || error,
            });
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
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
