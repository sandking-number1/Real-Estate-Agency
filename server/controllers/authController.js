const { User, Admin } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });
            const admin = await Admin.findOne({ where: { email: email } });

            console.log('User:', user);
            console.log('Admin:', admin);

            if (!user && !admin) {
                return res.status(401).json({ error: "Authentication failed" });
            }

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return res.status(401).json({ error: "Authentication failed" });
                }

                if(password ===user.password){
                    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
                        expiresIn: "5h",
                    });
    
                    res.status(200).json({ token: token, role: "user" });
                }

                const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });

                res.status(200).json({ token: token, role: "user" });
            } else if (admin){
                const passwordMatch = await bcrypt.compare(password, admin.password);

                if (!passwordMatch) {
                    return res.status(401).json({ error: "Authentication failed" });
                }

                const token = jwt.sign({ adminId: admin.id }, process.env.SECRET_KEY, {
                    expiresIn: "5h",
                });

                res.status(200).json({ token: token, role: "admin" });
            }
        } catch (error) {
            res.status(500).json({ error: "Login failed" });
        }
    }

    async checkEmail(req, res) {
        try {
            const { email } = { ...req.body };

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(200).json({ available: true });
            }

            return res.status(200).json({ available: false });
        } catch (error) {
            res.status(500).json({ error: "Email check failed" });
        }
    }
}

module.exports = new AuthController();