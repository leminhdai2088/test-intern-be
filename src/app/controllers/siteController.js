import bcrypt from 'bcrypt';
import sequelize from '../../config/database/index.js';
import transporter from '../../config/mailer_account.js';
import otpGenerator from 'otp-generator';
import { isCheckedPassword } from '../../helpers/multiFunc.js';
import { signToken } from '../../helpers/jwt_service.js';

class siteController {
    // POST /site/sign-up
    async SignUp(req, res) {
        try {
            const phone = req.body.phone;
            const email = req.body.email;
            const queryEmail = 'SELECT * FROM users WHERE email = :email';
            const queryPhone = 'SELECT * FROM users WHERE phone = :phone';

            const [dataQueryEmail] = await sequelize.query(queryEmail, {
                replacements: { email },
                type: sequelize.QueryTypes.SELECT,
            });
            const [dataQueryPhone] = await sequelize.query(queryPhone, {
                replacements: { phone },
                type: sequelize.QueryTypes.SELECT,
            });
            if (dataQueryEmail) {
                return res.json({
                    status: 401,
                    message: 'Email is registered!',
                });
            } else if (dataQueryPhone) {
                return res.json({
                    status: 401,
                    message: 'Phone is registered!',
                });
            } else {
                const name = req.body.name;
                const password = req.body.password;
                const birthday = req.body.birthday;
                const avatar = req.body.avatar;
                const gender = req.body.gender;
                const address = req.body.address;
                const role = false;
                const verified = false;

                const hashedPassword = await bcrypt.hash(password, 10);

                // Tạo mã OTP
                const otp = otpGenerator.generate(6, {
                    digits: true,
                    alphabets: false,
                    upperCase: false,
                    specialChars: false,
                });

                // Gửi mã OTP đến email
                const mailOptions = {
                    from: 'your-email@gmail.com',
                    to: email,
                    subject: 'Xác thực email',
                    text: `Mã OTP của bạn là: ${otp}`,
                };

                const queryInsertUser =
                    'INSERT INTO users (name, phone, email, password, birthday, avatar, gender, address, role, verified, otp) values (:name, :phone, :email, :hashedPassword, :birthday, :avatar, :gender, :address, :role, :verified, :otp)';
                const [result] = await sequelize.query(queryInsertUser, {
                    replacements: {
                        name,
                        phone,
                        email,
                        hashedPassword,
                        birthday,
                        avatar,
                        gender,
                        address,
                        role,
                        verified,
                        otp,
                    },
                });

                console.log(result);

                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        return res.json({
                            status: 500,
                            message: 'Send OTP code failed!',
                        });
                    }
                    return res.json({
                        status: 200,
                        message: 'Send OTP code successfully!',
                    });
                });
            }
        } catch (err) {
            console.log(err);
            return res.json({
                status: 500,
                message: 'User created failure!',
            });
        }
    }

    // PATCH /site/verify-email
    async VerifyEmail(req, res) {
        try {
            const { email, otp } = req.body;

            const queryEmail = `SELECT * FROM users WHERE email = '${email}'`;
            const [row] = await sequelize.query(queryEmail);
            if (row.length > 0) {
                if (row[0].verified) {
                    return res.json({
                        status: 409,
                        message: 'Email is verified!',
                    });
                } else {
                    if (row[0].otp == otp) {
                        const isVerified = `update users set verified = true where email = '${email}'`;
                        await sequelize.query(isVerified);
                        return res.json({
                            status: 200,
                            message: 'Verify email successfully!',
                        });
                    } else {
                        return res.json({
                            status: 401,
                            message: 'Email verification failed!',
                        });
                    }
                }
            } else {
                return res.json({
                    status: 401,
                    message: 'Email is not exists!',
                });
            }
        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message: 'Server error!',
            });
        }
    }

    //POST /site/login
    async Login(req, res, next) {
        try {
            // check username
            const userName = req.body.userName;
            const queryUserName = `SELECT * FROM users WHERE email = '${userName}' OR phone = '${userName}'`;
            const [row] = await sequelize.query(queryUserName);
            if (row.length == 0) {
                return res.json({
                    status: 401,
                    message: `${userName} is not registered!`,
                });
            }

            // check password
            const password = req.body.password;
            const passwordInDb = row[0].password;
            const isValidPassword = await isCheckedPassword(password, passwordInDb);
            if (!isValidPassword) {
                return res.json({
                    status: 401,
                    message: 'Incorrect password!',
                });
            } else {
                const token = await signToken(row[0].id);
                return res.json({ token });
            }
        } catch (error) {
            console.log(err);
            return res.json({
                status: 500,
                message: 'Cannot login!',
            });
        }
    }
}

export default new siteController();
