const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());               
app.use(express.json());     

const courseRoutes = require('./routes/courseRoutes');
const user = require('./routes/userRoutes')

app.use('/api', courseRoutes)

app.use('/api/user', user)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
