const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});


userSchema.statics.deleteUserById = async function(userId) {
    try {
        const result = await this.findByIdAndDelete(userId);
        if (!result) {
            throw new Error('Utilizatorul nu a fost găsit.');
        }
        return result;
    } catch (error) {
        throw new Error('Eroare la ștergerea utilizatorului: ' + error.message);
    }
};


module.exports=mongoose.model('User',userSchema);