const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const resetSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
},{
    timestamps: true
});

//bcrypt password

resetSchema.pre('save',async function(next){
    if(this.isModified('token')){
        const hash = await bcrypt.hash(this.token, 8)
        this.token = hash;
    }
    next();
})

//decrypting password
resetSchema.methods.compareToken = async function(token){
    return await bcrypt.compareSync(token , this.token)
}

const ResetToken = mongoose.model('ResetToken',resetSchema);

module.exports = ResetToken;

