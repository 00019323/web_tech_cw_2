const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        // No token provided
        return res.status(401).json({error: 'No token provided'});
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY');
        // Attach the decoded payload to the request object
        req.user = decoded;
        next(); // Call the next middleware or route handler
    } catch (err) {
        // Token is invalid
        return res.status(403).json({error: 'Invalid token'});
    }
};