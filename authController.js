const UserModel = require('./Models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const refreshTokens = []

module.exports = {
    hashPassword:  async (req, res, next) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
       next()
    },
    comparePassword: async (req, res, next) => {
        const user = req.user
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
            //    req.user = user
               return next()
            } else {
                res.status(403).json({ message: 'password incorrect' })
            }
        } catch (err) {
            res.json({ message: err.message })
        }
    },
    /**
     * 
     * @param {objet} req //need to use req.user
     * @param {objet} res 
     */
    generateTokens : (req, res, next) => {
        const user = req.user
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})

        const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)

        console.log('refresh token from generateToken ==>> ',refreshTokens)
        res.cookie('access_token', accessToken)
        .status(200)
        .redirect('/auth/admin')
       
    },
    authenticateToken: async (req, res, next) => {
        // const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1]; 
        const token = req.headers.cookie.split('=')[1]  
        console.log('authenticateToken token ===>', token)
        if(!token) return res.sendStatus(403).redirect('/login') 
        try {
             jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) =>{
                if(err) return res.status(403).json(err) 
                const user =  await UserModel.findOne({_id: payload.id})
                req.user = user
                
                return next()
            })
        } catch (err){
            res.json(err)
        }
        
    },
    refreshToken :  (req, res, next) => {
        if(refreshTokens.includes(req.body.token)) {
            jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err)return res.sendStatus(403)
                console.log('user from refreshToken ==>',user)
                req.user = user
                next()
            })
        }

    },
    isAuth : async (req, res, next) => {
        const token = req.headers.cookie && req.headers.cookie.split('=')[1] 
        if(!token) return next() 
        console.log('isAuth middleware ===>', token)
        res.redirect('/auth/admin')        
    }   

}