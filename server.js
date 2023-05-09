const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;



const app = express();
const port = 3000;

app.use(bodyParser.json());

let db;
MongoClient.connect('mongodb+srv://manager:junseok12@dongsan.o1cilpf.mongodb.net/?retryWrites=true&w=majority', function (err, client) {
    if (err) return alert(err);

    db = client.db('event');

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.post("/event", (req, res) => {
    // user라는 collection에서 사용자가 입력하는 이름과 이메일 중 똑같은 데이터가 있다면 err메세지를 띄우고 DB에 추가하지 않는다.
    db.collection('user').findOne({ name: req.body.name, email: req.body.email }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: '서버 에러가 발생했습니다.' });
        } else if (result) {
            res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
        } else {
            db.collection('counter').findOne({ name: 'count' }, function (err, result) {
                let total_id = result.total;
                db.collection('user').insertOne({ _id: total_id + 1, name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
                    } else {
                        db.collection('counter').updateOne({ name: 'count' }, { $inc: { total: 1 } }, function (err, result) {
                            if (err) {
                                console.log(err);
                                res.status(500).json({ error: '서버 에러가 발생했습니다.' });
                            } else {
                                res.json({ success: true });
                            }
                        })
                    }
                })
            })
        }
    })
});


