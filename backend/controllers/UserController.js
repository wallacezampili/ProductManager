const User = require('../models/User');
const createToken = require('../token/createToken');
const bcrypt = require('bcrypt');

module.exports = class UserController {
    static userValidations(user, res) {
        if (!user.email) {
            res.status(422).json({ message: 'The user e-mail is needed!' });
            return false;
        }
        if (!user.password) {
            res.status(422).json({ message: 'The user password is needed!' });
            return false;
        }
        

        return true;
    }

    static async checkIfUserExists(email) {
        const user = await User.findOne({ email: email });
        return user;
    }

    static async register(req, res) {
        const { email, password, confirmpassword } = req.body;
        //Validations
        const isUserValid = UserController.userValidations({ email, password, confirmpassword }, res);
        if (!isUserValid) { return }

        //ConfirmPassword Validation
        if (password != confirmpassword)
        {
            res.status(422).json({message: 'The passwords are different!'});
            return false;
        }

        //Check if the email is already in use
        const checkUser = await UserController.checkIfUserExists(email);

        if (checkUser) {
            return res.status(422).json({ message: 'The e-mail is already in use, please try again!' });
        }


        //Hash Password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create Token for authentication
        const token = createToken({ email });


        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: 'User succefully registered, authentication completed!', token });
    };


    static async login(req, res) {
        const { email, password } = req.body;

        //Validations
        const isUserValid = UserController.userValidations({ email, password }, res);
        if (!isUserValid) { return }

        //Check if the email is already in use
        const checkUser = await UserController.checkIfUserExists(email);

        if (!checkUser) {
            return res.status(422).json({ message: 'It was not possible to find your account, please try again!' });
        }

        //Password Check
        const checkPassword = await bcrypt.compare(password, checkUser.password);

        if (!checkPassword) {
            return res.status(422).json({ message: 'It was not possible to find your account, please try again!' });
        }

        //Create Token for authentication
        const token = createToken({ email });

        res.status(200).json({ message: 'User succefully logged in!', token });

    }
    


}

