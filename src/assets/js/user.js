STORY_DATA = [
    {
        next_comment: "おはようわん！"
    },
    {
        next_comment: "今日は調子どうー？" // good
    },
    {
        next_comment: "それは良かったわん！",
    },
    {
        next_comment: "実習Aはどうだったわん？" // bad
    },
    {
        next_comment: "あれれ、そうなのかわん..."
    },
    {
        next_comment: "お仕事がうまく行かなかったわん？" // good
    },
    {
        next_comment: "そかそか！山田くんは最近優秀って聞いてるわん!"
    },
    {
        next_comment: "それだったら..人間関係がきついわん？" // bad
    },
    {
        next_comment: "上司とか..わん？" // bad
    },
    {
        next_comment: "まあ気に病むなって！人生色々あるわん！"
    },
    {
        next_comment: "ちなみにからだの調子はどうわん？" // 
    },
    {
        next_comment: "いいわん〜、ぼくも最近調子いいんだわん！"
    },
    {
        next_comment: "うまいわん！ありがとわん！",
        action_svg: './assets/image/eating.svg',
    },
]

class Api{
    // 質問に答えて、次の質問を取得
    static updateQuestion(q_id, answer, callback){
        const data = STORY_DATA[story_id];
        story_id = story_id >= STORY_DATA.length - 1  ? 0 : story_id + 1;
        callback(data);
    }
}

var now_q_id = 0
var story_id = 0
var now_speech = ""
const ans_set = ["good", "normal", "angry"]
var I_SEE = "ふんふん...."

function setup(){
    for (ans of ans_set){
        $(`.${ans}`).on('click', function(e){
            const ans_str = e.target.classList[1]
            answer(ans_str);
        })
    }
    init_answer();
}
setup();

function animateAvator(svg_path, comment, completion, is_last){
    const $avator = $('.avator')
    $avator.attr('src', svg_path);
    
    var pre_speech;
    if (comment){
        pre_speech = now_speech
        speech(comment);
    }

    if (!is_last){
        setTimeout(function() {
            if (comment){speech(pre_speech);}
            $avator.attr('src', './assets/image/waiting.svg');
            if(completion){completion();}
        }, 2000);
    }
 }



function toggleFadeoutIcons(ans_id){
    // 呼び出す毎に回転してフェードアウト。
    // 1.2secかかる（animation.cssより）。
    const items = $('.choice_area .item')
    for(var i=0,l=items.length;i<l;i++){
        const cl = items[i].classList
        if (i == ans_id){
            cl.toggle("rotaionFadeoutAnim");

            if (ans_id == 0){
                $("#answerHeart").addClass("fa fa-heart");
                $(".fa-heart:before").css("display", "inline-block");
                $('#answerHeart').delay(3000).queue(function() {
                    $(this).removeClass('fa-heart').dequeue();
                });
            } else if (ans_id == 2) {
                $("#answerTint").addClass("fa fa-tint");
                $(".fa-tint:before").css("display", "inline-block");
                $('#answerTint').delay(3000).queue(function() {
                  $(this).removeClass('fa-tint').dequeue();
                }); 
            }


        } else {
            cl.toggle("fadeoutAnim");
        }
    }
}

function toggleFadeinIcons(){
    // アイコン出現css 付加/除去
    const items = $('.choice_area')[0];
    items.classList.toggle('fadeinAnim');
}

function removeIcons(ans_id, completion){
    // アイコンアニメーション付きRemove→出現
    toggleFadeoutIcons(ans_id);
    setTimeout(function() {
        $('.choice_area').hide()
        if(completion){completion();}
    }, 1200);
}

function fadeinIcons(completion){
    $('.choice_area').show();
    toggleFadeinIcons();
    setTimeout(function() {
        toggleFadeinIcons();
        if(completion){completion();}
    }, 600);
}

function init_answer(){
    Api.updateQuestion(0, 0, function(data){
        // わんこが話す
        speech(data.next_comment)
    })
}

function answer(ans_str, completion){
    ans_id = ans_set.indexOf(ans_str)
    console.log(ans_str);
    // 思考中
    speech("ふんふん....");
    removeIcons(ans_id, function(){
        // アイコンのリセットが終わった段階で、
        Api.updateQuestion(now_q_id, ans_id, function(data){
            // わんこが話す
            console.log(data);
            if (data.action_svg){
                // アニメーションが入る
                animateAvator(data.action_svg, data.next_comment , function(){
                    answer("", function(){
                        flash_classes();
                        fadeinIcons();
                    });
                    console.log("done");
                }, true);
            } else {
                speech(data.next_comment, function(data){
                    // 話終わった段階で、
                    // アイコンフェードイン
                    toggleFadeoutIcons(ans_id);
                    fadeinIcons();
                });
            }
            if(completion){completion();}
        })
    })
}


function speech(text, completion){
    // わんこが話す
    text_sl = '.text_area .text'
    $(text_sl).text("");
    if (now_speech != I_SEE){
        now_speech = text;
    }
    $.when(typing(text, text_sl)).done(function() {
        if(completion){completion();}
    });
}


function typing(text, selector, speed=50){
    // タイピングアニメーション
    var spans = '<span>' + text.split('').join('</span><span>') + '</span>';
    return $(spans).hide().appendTo(selector).each(function (i) {
        $(this).delay(speed * i).css({
            display: 'inline',
            opacity: 0
        }).animate({
            opacity: 1
        }, speed);
    });
}

$("#avatorNormal").on("click", function(){
    $("#avatorPleased").remove();
    $(this).css("display", "block");

    $(this).parent(".avator_area").append('<img class="avator" id="avatorPleased" src="./assets/image/lying.svg" />')
    $(this).css("display", "none");

    $("#avatorPleased").delay(1000).queue(function() {
        $(this).remove();
        $("#avatorNormal").css("display", "block");
    }); 
})
