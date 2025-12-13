import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    let token = req.cookies?.token;

    // allow Authorization header
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer ", "");
    }

    if (!token) {
        return res.json({ success: false, message: "Unauthorized Access" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key_123');
        if (decoded.id) {
            req.userId = decoded.id;
            // Ensure req.body exists before assigning
            if (!req.body) req.body = {};
            req.body.userId = decoded.id;
        }
        next();
    } catch (error) {
        return res.json({ success: false, message: "Unauthorized Access" });
    }
};

export default userAuth;
