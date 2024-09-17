const bcrypt = require('bcrypt');
const adminRepository = require('../Admin/adminRepository');

exports.seedAdmin = async () => {
    try {
        // Check if the admin already exists
        const adminExists = await adminRepository.findAdminByEmail('admin@gmail.com');
        if (adminExists) {
            console.log('Admin already exists');
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create the admin
        const adminData = {
            username: 'admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
        };

        await adminRepository.createAdmin(adminData);
        console.log('Admin user seeded successfully!');
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};