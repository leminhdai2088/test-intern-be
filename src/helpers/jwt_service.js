import JWT from 'jsonwebtoken';

const signToken = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };
        const secret = '2e8813660497a3f3e0b6b94106477b57c86064077a46de4fd4bc346fcf4251e3';
        const options = {
            expiresIn: '1h', //10s
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};

export { signToken };
