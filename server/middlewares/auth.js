const jwt = require("jsonwebtoken");
const AUTHENTICATED_SIGNATURE = process.env.AUTH_SIGN;

const fetchUser = async (req, res, next) => {
    // Verifying the authtoken and decoding the user details
    // Support both "token" header (legacy) and "Authorization: Bearer <token>" (standard)
    let authtoken = req.header("Authorization");

    if (authtoken && authtoken.startsWith("Bearer ")) {
        authtoken = authtoken.slice(7); // Remove "Bearer " prefix
    } else {
        // Fallback to "token" header for backward compatibility
        authtoken = req.header("token");
    }

    if(!authtoken) {
        res.status(401).send({flag: "invalid" , msg: "Oopps... You are not eligible to proceed."});
    }
    try {
        const data = await jwt.verify(authtoken, AUTHENTICATED_SIGNATURE);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({flag: "invalid", msg: "Oopps... You are not eligible to proceed."});
    }

}

module.exports = fetchUser;