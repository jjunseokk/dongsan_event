const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const path = require("path");

const app = express();
const port = 5000;
app.use(bodyParser.json());

let db;
MongoClient.connect('mongodb+srv://manager:junseok12@dongsan.o1cilpf.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
    if (err) return alert(err);

    db = client.db('event');

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/join", (req, res) => {
    console.log("res", res)
    // user라는 collection에서 사용자가 입력하는 이름과 이메일 중 똑같은 데이터가 있다면 err메세지를 띄우고 DB에 추가하지 않는다.
    db.collection('user').findOne({ name: req.body.name }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: '서버 에러가 발생했습니다.' });
        } else if (result) {
            res.status(409).json({ name: '이미 존재하는 이름입니다.' });
        } else {
            db.collection('user').findOne({ email: req.body.email }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
                } else if (result) {
                    res.status(409).json({ name: '이미 존재하는 이메일입니다.' });
                } else {
                    // DB에 추가하는 코드
                    db.collection('counter').findOne({ name: 'count' }, function (err, result) {
                        let total_id = result.total;
                        db.collection('user').insertOne({
                            _id: total_id + 1,
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            manager: req.body.manager,
                            point: 0
                        }, function (err, result) {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ error: '서버 에러가 발생했습니다.' });
                            } else {
                                db.collection('counter').updateOne({ name: 'count' }, { $inc: { total: 1 } }, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
                                    } else {
                                        res.json({ success: result });
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }
    });
});
let loginName;

app.post("/login", (req, res) => {
    // 입력받은 아이디와 비밀번호
    const { loginName: name, loginPassword: password } = req.body;

    console.log(name, password);
    // DB에서 입력받은 아이디와 비밀번호가 일치하는지 확인합니다.
    db.collection("user").findOne({ name, password }, function (err, result) {
        console.log(result)
        if (err) {
            console.log(err);
            res.status(500).json({ error: "서버 에러가 발생했습니다." });
        } else if (!result) {
            res.status(401).json({ error: "아이디 또는 비밀번호가 일치하지 않습니다." });
        } else {
            loginName = name;
            res.json({ success: result });
        }
    });

});


app.post('/points', (req, res) => {
    db.collection("user").findOne({ name: loginName }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "서버 에러가 발생했습니다." });
        } else{
            let point = req.body.points
            db.collection("user").updateOne({name : `${loginName}`}, {$inc : {point : point}});
            console.log(req.body.points);
            console.log("네임", loginName);
        }
    })
})


// //api로 데이터 받기
// app.get('/api/login', (req, res)=>{
//     db.collection('user').find().toArray(function(err, result) {
//         if (err) throw err;
//         res.json(result);
//     });
// })