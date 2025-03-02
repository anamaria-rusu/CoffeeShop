const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const produsSchema=new Schema({
    nume:{
        type:String,
        required:true
    },
    pret:{
        type:Number,
        required:true
    },
    
});

module.exports=mongoose.model('Produs',produsSchema);