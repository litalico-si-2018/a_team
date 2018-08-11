
class Api{
    
// 　　一番最初の質問取得
//    static getLatestQuestion(user_id, callback){
//        const data = {
//            id : 1,
//            comment : "お仕事どうだったわん",
//            level : 10,
//        }
//        callback(data);
//    }
    
    // 質問に答えて、次の質問を取得
    static updateQuestion(q_id, answer, callback){
        const data = {
            status: 1,
            level: 11,
            next_comment: {
                id: 2,
                comment: "それは大変だわん！"
            }
        }
        callback(data);
    }
}

var now_q_id = 0

function answer(e){
    answer_str = e.target.classList[1]
    answer_no = ["good", "normal", "angly"].indexOf(answer_str)
    Api.updateQuestion(now_q_id, answer_no, function(data){
        now_q_id = data.next_comment.id;
        // 描画を更新
        $(".text_area .text").text(data.next_comment.comment)
    })
}

$(".normal").on('click', function(e){
    answer(e);
})

