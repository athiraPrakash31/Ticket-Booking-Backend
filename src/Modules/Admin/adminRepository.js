const Admin = require('../Admin/adminSchema');

// Find an admin by email
exports.findAdminByEmail = async (email) => {
    return Admin.findOne({ email });
};

// Create a new admin
exports.createAdmin = async (adminData) => {
    const admin = new Admin(adminData);
    return admin.save();
};