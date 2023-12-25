const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 1235;

let youtuber1 = {
  channelName: "십오야",
  sub: "12만",
  videoNum: "991개",
};

let youtuber2 = {
  channelName: "상하tv",
  sub: "120만",
  videoNum: "300개",
};

let youtuber3 = {
  channelName: "상하먹방",
  sub: "511만",
  videoNum: "777개",
};

let db = new Map();
db.set(1, youtuber1);
db.set(2, youtuber2);
db.set(3, youtuber3);

app.use(express.json()); //http 모듈외에 미들웨어 설정:json설정
app.get("/youtuber/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // youtuber가 없으면
  if (db.get(id) === undefined) {
    res.json({
      message: "존재하지 않는 유투버입니다.",
    });
  } else {
    res.json(db.get(id));
  }
});

app.post("/youtuber", (req, res) => {
  console.log(req.body);
  db.set(4, req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`good working on port ${port}`);
});
