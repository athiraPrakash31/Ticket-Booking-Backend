// const roleMiddleware = (roles) => (req, res, next) => {
//     try {
//         const token = req.headers['authorization']?.split(' ')[1];
//         if (!token) return res.status(401).json({ message: 'No token provided' });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (roles.includes(decoded.role)) {
//             next();
//         } else {
//             res.status(403).json({ message: 'Access denied' });
//         }
//     } catch (error) {
//         res.status(401).json({ message: error.message });
//     }
// };

// module.exports = roleMiddleware;