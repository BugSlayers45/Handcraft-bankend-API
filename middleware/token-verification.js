import jwt from "jsonwebtoken"

const tokenVerify = (request, response, next) => {
    let token = request.headers.authorization;

    try {
        if (!token)
            throw new Error()
        token = token.split(" ")[1]
        jwt.verify(token, 'qwertyuio;lkjhgfwertj');
        next();
    } catch (err) {
        return response.status(401).json({ error: "unautorization error", status: false });

    }
}

export default tokenVerify;
