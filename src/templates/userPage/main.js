STORY_DATA = [
    {
        next_comment: "おはようわん！"
    },
    {
        next_comment: "今日は調子どうー？" // good
    },
    {
        next_comment: "それは良かったわん！"
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
        next_comment: "上司とかかわん？" // bad
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
        action_svg: './images/waiting.svg',
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

const ans_set = ["good", "normal", "angly"]
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

// 犬をいじる
$('.avator').on('click', function(e){
    console.log(e);
    playAvator();
});

function playAvator(completion){
    const $avator = $('.avator')
    $avator.attr('src', './images/eating.svg');
    const pre_speech = now_speech
    speech('あ〜それ、気持ちいいわん〜');
    setTimeout(function() {
        speech(pre_speech);
        $avator.attr('src', './images/waiting.svg');
        if(completion){completion();}
    }, 2000);
}


function toggleFadeoutIcons(ans_id){
    // 呼び出す毎に回転してフェードアウト。
    // 1.2secかかる（animation.cssより）。
    const items = $('.choice_area .item')
    for(var i=0,l=items.length;i<l;i++){
        const cl = items[i].classList
        if (i == ans_id){
            cl.toggle("rotaionFadeoutAnim");
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

function answer(ans_str){
    ans_id = ans_set.indexOf(ans_str)
    console.log(ans_str);
    // 思考中
    speech("ふんふん....");
    removeIcons(ans_id, function(){
        // アイコンのリセットが終わった段階で、
        Api.updateQuestion(now_q_id, ans_id, function(data){
            // わんこが話す
            speech(data.next_comment, function(data){
                // 話終わった段階で、
                // アイコンフェードイン
                toggleFadeoutIcons(ans_id);
                fadeinIcons();
            });
        })
    })
}


function speech(text, completion){
    // わんこが話す
    text_sl = '.text_area .text'
    $(text_sl).text("");
    now_speech = text;
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

