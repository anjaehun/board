const { groupCollapsed } = require("console");
const express = require("express");
const Boards =require("../schemas/board");
const router = express.Router(); 

router.get("/",(req, res) =>{
    res.send("this is root Page");
});

const boards = [
      {
        boardsId: 1,
        name: "test1",
        password: "1234",
        writeDate : Date.now, 
        uploadDate : ""
      },
      {
        boardsId: 2,
        name: "test2",
        password: "1234",
        wtDate : Date.now, 
        uploadDate : ""
      },
    ];


// 데이터 넣기 (CRUD 중 C(create))
// 게시판에 글을 개시할 수 있다. 
router.post("/boards", async (req, res) => {
     const { boardsId,name,comment,password,wtDate,udDate } = req.body; 

     const boards = await Boards.find({ boardsId });
     if(boards.length){
         return res.json({success : false, errorMessage:"이미 있는 데이터 입니다 "}); // 데이터가 있는지 없는지 체크 
     }
     
     const createdBoards = await Boards.create({ boardsId,name,comment,password,wtDate,udDate })

     res.json({ boards: createdBoards });
});

// 데이터 목록 보기 (CRUD 중 R(read))
// 데이터 전체를 볼 수 있다. 
router.get("/boards", async (req, res) => {
    const boards = await Boards.find({}, {boardsId:1,name:1,comment:1,wtDate:1,udDate:1 }).sort({wtDate:-1});
    res.json({ boards });
});

// 데이터 목록 중 1개 보기 (CRUD 중 R(read))  
// boardsId 번호를 조회해 같은 게시글을 찾아내는 기능 
router.get("/boards/:boardsId", async (req, res) => {
    const { boardsId } = req.params;
    const boardsfind = await Boards.findOne({ boardsId });
    res.json({ boardsfind });
  });

// 업데이트 
//  UPDATE users SET a=1 WHERE b='q' 참고한 sql 구문 
//db.users.updateOne(("zip":"12534"),{"$set":{"pop":17630,"다른 고칠것":17630}})
  router.put("/boards/:boardsId/update/:password", async (req, res) => {
    const { boardsId } = req.params;
    const { password } = req.params;
    const { name,comment,udDate } = req.body;
    //console.log(password);
                                  
    const boardOne = await Boards.find({boardsId:Number(boardsId),password:password});
    console.log(boardOne.length);
    if (boardOne.length > 0) {
      await Boards.updateOne({boardsId:Number(boardsId)} // 조건문 수정하고자 하는 번호가 같을 때 
                             ,{"$set":{name:name,comment:comment,udDate:udDate}});  // 밑에 조건들을 충족 하는 것을 수정함                                    
    }
   
    res.json({success:true});
  });
   
  // 삭제 
  router.delete("/boards/:boardsId/delete/:password", async (req, res) => {   
    const { boardsId } = req.params;

    const boardOne = await Boards.find({boardsId:Number(boardsId),password:password})
    console.log(boardOne.length);
    if (boardOne.length > 0) { 
       await Boards.remove({boardsId:Number(boardsId)});
    } 
    res.json({success:true});
  });

module.exports = router;
