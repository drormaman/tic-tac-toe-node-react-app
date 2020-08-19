  
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v1/records", (req, res) => {

});

app.post("/api/v1/records", (req, res) => {
    
});

app.listen(8080);