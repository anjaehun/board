const mongoose = require("mongoose");

const boardsSchema = mongoose.Schema({
    // 게시판 번호 
    boardsId:{ 
       type : Number, 
       required : true, 
       unique : true,
    },
    // 작성자 명 
    name: {
        type : String,
        required : true, 
    },
    //내용 
    comment: {
        type : String,
        required : true, 
    },
    // 게시글 비밀번호
    password: {
        type : String, 
        required : true,
    },
    // 작성날짜
    wtDate: {
        type: Date, 
        default: Date.now,
    },
    // 수정날짜
    udDate: {
        type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model("Boards", boardsSchema);

 