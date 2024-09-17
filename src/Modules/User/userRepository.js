// import schema
const User = require('./userSchema');

const createUser = async (data) => {
    const user = new User(data);
    return user.save();
};

const findByEmail = async (email) => {
    return User.findOne({ email });
};

const findByUsername = async (username) => {
    return User.findOne({ username });
};
const findUserById = async (userId) => {
    return await User.findOne({ userId: userId });
};

module.exports = {
    createUser,
    findByEmail,
    findByUsername,
    findUserById
};
