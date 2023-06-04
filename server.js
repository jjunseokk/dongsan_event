const mysql = require('mysql2');
const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require("http");
const port = 5000;
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
require('dotenv').config();


// const server = http.createServer((req, res) => {
//     // 요청 처리
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, World!');
// });

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: 3306,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'user',
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL에 성공적으로 연결되었습니다!');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});



app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });
    //  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.post('/join', (req, res) => {
    const { name, email, password, point, date, manager } = req.body;
    // console.log(req.body);

    let query_name = `SELECT * FROM dongsan WHERE name = '${name}'`;
    let query_email = `SELECT * FROM dongsan WHERE email = '${email}'`;
    let query_add = `INSERT INTO dongsan (name, email, password, manger) VALUES ('${name}', '${email}', '${password}','${manager}')`;


    connection.query(query_name, [name], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: '서버 에러가 발생했습니다.' });
        }

        if (result.length > 0) {
            console.log("존재하는 아이디");
            return res.status(409).json({ name: '이미 존재하는 이름입니다.' });
        }

        connection.query(query_email, [email], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: '서버 에러가 발생했습니다.' });
            }

            if (result.length > 0) {
                console.log("존재하는 이메일");
                return res.status(409).json({ name: '이미 존재하는 이메일입니다.' });
            }

            connection.query(query_add, [name, email, password, point, manager, date], (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: '서버 에러가 발생했습니다.' });
                }

                return res.json({ success: result });
            });
        });
    });
});



let loginName;

app.post("/login", (req, res) => {

    // 입력받은 아이디와 비밀번호
    const { loginName: name, loginPassword: password } = req.body;
    let query_login = `SELECT * FROM dongsan WHERE name = '${name}' and password = '${password}'`

    connection.query(query_login, (error, result) => {
        if (error) {
            res.status(500).json({ error: '서버 에러가 발생했습니다.' });
        } else {
            res.json({ success: result });
        }


    })

    console.log(name, password);
    // DB에서 입력받은 아이디와 비밀번호가 일치하는지 확인합니다.
});
let total_point = 0;
app.post('/points', (req, res) => {
    const { point, date, reduxData } = req.body;

    console.log("points", point);
    console.log("date", date);
    console.log("reduxData", reduxData);
    total_point += point;
    console.log(total_point);

    let query_checkPoint = `SELECT COUNT(*) num FROM point WHERE reg_date = STR_TO_DATE('${date}', '%Y-%m-%d')`;
    let query_insertPoint = `INSERT INTO point (name, add_point, sub_point, total_point, reg_date)
    VALUES ('${reduxData.name}', ${point}, NULL, ${total_point}, '${date}')`;
    connection.query(query_checkPoint, (error, result) => {
        if (error) {
            res.status(500).json({ error: "서버 오류" })
        } else {
            console.log(result[0]);
            if (result[0].num > 0) {
                res.json("이벤트를 하루에 한번씩만 참여할 수 있습니다.");
            } else {
                connection.query(query_insertPoint, (error, result) => {
                    if (error) {
                        res.status(500).json({ error: "서버 오류" })
                    } else {
                        res.json(`${point}포인트를 획득하였습니다.`)
                    }
                });
            }
        }
    })
});

app.post('/Event', (req, res) => {

    let query_select = `SELECT d.*, IFNULL((SELECT total_point FROM point WHERE name = d.name LIMIT 1), 0) AS point FROM dongsan d`;

    connection.query(query_select, (error, result) => {
        if (error) {
            res.status(500).json({ error: "서버 오류" })
        } else {
            res.json({ data: result })
        }
        let user_point = result
        console.log("user", user_point);
    });
});