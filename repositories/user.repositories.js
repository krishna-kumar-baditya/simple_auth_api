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
    // get all users without npm i mongoose-aggregate-paginate-v2
    // async getAllUsers(page = 1, limit = 5) {
    //     try {
    //         const skip = (page - 1) * limit;
    //         const total = await UserModel.countDocuments({ isDeleted: false });
    //         console.log("total ", total);

    //         const users = await UserModel.find({ isDeleted: false })
    //             .skip(skip)
    //             .limit(parseInt(limit));
    //         console.log("users ", users);
    //         return {
    //             total,
    //             page: parseInt(page),
    //             limit: parseInt(limit),
    //             totalPages: Math.ceil(total / limit),
    //             users,
    //         };
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    async getAllUsers(page = 1, limit = 5) {
        try {
            const options = {
                page,
                limit
            }
            const result = await UserModel.aggregatePaginate([
                {
                    $match : {
                        isDeleted : false
                    }
                },
                {
                    $project : {
                        _id : 1,
                        firstName :1,
                        lastName :1,
                        email :1,
                        role :1,
                        age :1,
                        profilePic :1,
                    }
                }
            ],options)
            console.log("result",result);
            
            return {
                total : result.totalDocs,
                page : result.page,
                limit : result.limit,
                totalPages : result.totalPages,
                users : result.docs,
            }
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
bkjbkj