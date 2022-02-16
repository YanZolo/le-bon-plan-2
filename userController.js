const UserModel = require('./Models/userModel');


module.exports = {
    getUser: async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.body.username })
        if (user == null) return res.status(401).json({ message: 'Username does not exit' })
        req.user = user
        next()
    }, 
    getAllUsers: async (req, res, next) => {
        const users = await UserModel.find()
        try {
            if(!users)return res.status(500).send('an error occured')
            req.users = users;
            next()
        } catch (error) {
            res.json(error.message)
        }
    }
    ,
    registerUser: async (req, res) => {
        const user = new UserModel(req.body)
        console.log('req.body :>> ', req.body);
        try {
            const newUser = await user.save()
            console.log('newUser is saved :>> ', newUser);
            res.status(201).redirect('/auth/login')
        } catch (err) {
            res.json({ message: err.message })
        }
    },
    getLogout : (req, res) => {
       res.cookie('access_token', '').status(200).redirect('/auth/login')
    }
    

}