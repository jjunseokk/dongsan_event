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
    console.log(req.body);

    let query_name = `SELECT * FROM dongsan WHERE name = '${name}'`;
    let query_email = `SELECT * FROM dongsan WHERE email = '${email}'`;
    let query_add = `INSERT INTO dongsan (name, email, password, point, manager, click) VALUES ('${name}', '${email}', '${password}','${point}','${manager}','${date}')`;


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

app.post('/points', (req, res) => {
    const { points, dataArr } = req.body

    let name = dataArr.data.data.name;

    let query_point = `SELECT * FROM dongsan WHERE name = '${name}'`;
    let query_date = `UPDATE dongsan SET click='2020-02-02' WHERE name = '${name}'`;

    connection.query(query_point, (error, result) => {
        if (error) {
            res.status(500).json({ error: '서버 에러가 발생했습니다.' });
        } else {
            connection.query(query_date, (err, result) => {
                if (err) {
                    res.status(500).json({ error: '서버 에러가 발생했습니다.' });
                } else {
                    res.json({success : result});
                }
            })
        }
    });
});

// app.post('/points', (req, res) => {
//     const { points, dataArr, users } = req.body

//     let name = dataArr.data.data.name;

//     let query_point = `SELECT * FROM dongsan WHERE name = '${name}'`;


//     connection.query(query_point, (error, result) => {
//         let currentPoints = points;
//         let newPoints = currentPoints + users.point;
//         let point_update = `UPDATE dongsan SET point=${newPoints} WHERE name = '${name}'`

//         if (error) {
//             res.status(500).json({ error: '서버 에러가 발생했습니다.' });
//         } else {

//             connection.query(point_update, (error, result) => {
//                 if (error) {
//                     res.status(500).json({ error: '서버 에러가 발생했습니다.' });
//                 } else {
//                     connection.query(query_point, (error, result) => {
//                         if (error) {
//                             res.status(500).json({ error: '서버 에러가 발생했습니다.' });
//                         } else {
//                             res.json({ success: result });
//                         }
//                     })
//                 }
//             })
//         };
//     });
// });