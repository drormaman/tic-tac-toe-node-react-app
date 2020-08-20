const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static(path.join(__dirname,"..","Client","tic-tac-toe","build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"..","Client","tic-tac-toe","build","index.html"));
});

app.get("/api/v1/records", (req, res) => {
    fs.readFile("./records.json", (err, data) => {
        if (err) {
            throw err;
        }
        console.log(JSON.parse(data));
        res.send(JSON.parse(data));
    });
});

app.post("/api/v1/records", (req, res) => {
    fs.readFile("./records.json", (err, data) => {
        if (err) {
            throw err;
        }
        const dataArr = JSON.parse(data);
        dataArr.push(req.body);
        console.log(dataArr);
        fs.writeFile("./records.json", JSON.stringify(dataArr), (err) => {
            if (err) {
                throw err;
            }
            res.send("user was added successfully");
        });
    });
});

app.listen(8080);
