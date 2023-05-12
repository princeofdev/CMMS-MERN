const  jsonwebtoken =require('jsonwebtoken');
const Config =require('../../config/config');

const { secretKey } = Config;

const authenticate = (req, res, next) => {
	const token = req.headers.authorization || '';
	jsonwebtoken.verify(token, secretKey, (error, decoded) => {		
		if (error) {
			res.status(401).json({ msg: "Your authentication invalid.", data:null});
			// next({ error: 'token varified failed' });JWT token varified failed!
		} else {
			const { expiredAt, id, email, strFullName} = decoded;
			if (expiredAt > new Date().getTime()) {
				req.userId = id;
				req.userEmail = email;
				req.strFullName = strFullName;
				next();
			} else {
				res.status(401).json({ msg: "Login Expired!. Please log back into the platform.", data:null});
				// next({ error: 'token expired' });
			}
		}
	});
};

const authError = (err, req, res, next) => {
	res.json(err);
};
module.exports={ authenticate, authError };
