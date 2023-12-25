const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 1234;

let youtuber1 = {
  channelTitle: "십오야",
  sub: "12만",
  videoNum: "991개",
};

let youtuber2 = {
  channelTitle: "상하tv",
  sub: "120만",
  videoNum: "300개",
};

let youtuber3 = {
  channelTitle: "상하먹방",
  sub: "511만",
  videoNum: "777개",
};

let db = new Map();
let id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

app.use(express.json()); //http 모듈외에 미들웨어 설정:json설정
app.get("/youtubers", function (req, res) {
  let youtubers = {};
  db.forEach((value, key) => {
    youtubers[key] = value;
  });
  res.json(youtubers);
});
app.get("/youtubers/:id", (req, res) => {
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

app.post("/youtubers", (req, res) => {
  console.log(req.body);
  db.set(id++, req.body);
  res.json({
    message: `${db.get(id - 1).channelTitle} 유투버가 되신것을 환영합니다.`,
  });
});
app.delete("/youtubers", (req, res) => {
  let msg = "";
  if (db.size === 0) {
    msg = "삭제할 유투버가 없습니다.";
  } else {
    db.clear();
    msg = "전체 유투버가 삭제되었습니다.";
  }
  res.json({
    message: msg,
  });
});

app.delete("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  var youtuber = db.get(id);
  if (youtuber == undefined) {
    res.json({
      message: "요청하신 유투버는 가입된 유투버가 아닙니다.",
    });
  } else {
    let deleter = youtuber.channelTitle;
    db.delete(id);
    res.json({
      message: `${deleter}님 , 아쉽지만 우리 인연은 여기까지 인가요...`,
    });
  }
});

app.put("/youtubers/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  var youtuber = db.get(id);
  var oldTitle = youtuber.channelTitle;
  if (youtuber == undefined) {
    res.json({
      message: "요청하신 유투버는 가입된 유투버가 아닙니다.",
    });
  } else {
    let newTitle = req.body.channelTitle;
    youtuber.channelTitle = newTitle;
    db.set(id, youtuber);
    res.json({
      message: `${oldTitle}이 ${newTitle}로 수정되었습니다.`,
    });
  }
});
app.listen(port, () => {
  console.log(`good working on port ${port}`);
});
