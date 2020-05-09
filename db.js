var mongoose = require('mongoose');
const dataBase_Connection =process.env.DataBase_Connection
mongoose.connect(dataBase_Connection, {useNewUrlParser: true}).then(()=>{
    console.log("connect to mongoDB successfully")
})
.catch((error)=>{
    console.error(error);
});




