const jwt=require('jsonwebtoken');
function verifyJWT(req,res,next) {
    const token = req.cookies.name;
    console.log(token)

    if (token) {

       /* jwt.verify(token, "122f332211fgvfe", (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            req.user.role=decoded.role
*
        })*/
        const decoded=jwt.verify(token,'122f332211fgvfe')
        module.exports.ulogaaa=decoded.role;
        module.exports.idzaChat=decoded.id;
        next()


    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})

    }
}
module.exports=verifyJWT;