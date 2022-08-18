const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send( { id: 1, title: "Blog title", description: "Blog description" });
})

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
})
