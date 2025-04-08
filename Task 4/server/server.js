const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const { route } = require('./routes/authRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const connectWithRetry=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
            console.error('MongoDB connection error:', err);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000);  // Retry after 5 seconds
        });
}
connectWithRetry();
const routes=[
    {path:'/api/auth',route:require('./routes/authRoute')},
    {path:'/api/vendors',route:require('./routes/vendorRoute')},
    {path:'/api/owners',route:require('./routes/ownerRoute')},
    {path:'/api/products',route:require('./routes/productRoute')},
    {path:'/api/orders',route:require('./routes/orderRoute')},
]
routes.forEach(({ path, route }) => app.use(path, route));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});