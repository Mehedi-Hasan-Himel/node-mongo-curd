const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000

app.use(cors())

app.get('/', (req, res) => {
   res.send('running my node curd server')
});

app.listen(port, () => {
   console.log('CURD Server is running');
})