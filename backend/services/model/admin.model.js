import mongoose from 'mongoose';

const adminSchema =  new mongoose.Schema({
    adminUser: {
        type: String,
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    adminProfile: {
        type: String,
        
    }

})

const adminModel =  mongoose.model("Admin", adminSchema);
export default adminModel;

