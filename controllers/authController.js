const jwt = require('jsonwebtoken')

module.exports = {
    decode: async(headers) => {
        try {
               //grab the authorizon header
            const { authorization } = headers;
               //decode the token
            const token = authorization.split(' ')[1];
               //find the user based on the email inside of the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
               //send the user inside of the client 
            return decoded.email;
        } catch (error) {
            console.log(error.message)
        }
    }
}
