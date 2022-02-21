const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/detail', {useNewUrlParser:true});
var conn=mongoose.connection;
const employeeSchema=new mongoose.Schema({
    name: String,
    email : String,
    etype: String,
    hourlyrate: Number,
    totalhour: Number,
    total: Number

});

const employeeModel=mongoose.model('details',employeeSchema);
module.exports=employeeModel;