const UserModel = require("../models/user.model");
class UserRepository {
    // find user by id
    async findById(userID) {
        try {
            return await UserModel.findById({
                _id: userID,
                isDeleted: false,
            }).select("-password -_id -isDeleted -createdAt -updatedAt");
        } catch (error) {
            throw error;
        }
    }
    // get all users
    async getAllUsers(page = 1, limit = 5) {
        try {
            const skip = (page - 1) * limit;
            const total = await UserModel.countDocuments({ isDeleted: false });
            console.log("total ", total);

            const users = await UserModel.find({ isDeleted: false })
                .skip(skip)
                .limit(parseInt(limit));
            console.log("users ", users);
            return {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
                users,
            };
        } catch (error) {
            throw error;
        }
    }
    // async getSpecificUser(id){
    //     try {
    //         return await UserModel.findById(id)
    //     } catch (error) {

    //     }
    // }
    // delete user
    async deleteUser(userID) {
        try {
            return await UserModel.updateOne(
                {
                    _id: userID,
                },
                {
                    isDeleted: true,
                }
            );
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new UserRepository();
