const dotenv = require("dotenv");
dotenv.config();

const { connectRedis } = require("../config/redis.config");
const app = require("./app");
const PORT = process.env.PORT || 3000;

connectRedis();
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})