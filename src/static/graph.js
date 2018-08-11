// ハードコードでグラフを表示

function make_canvas(canvas,data,label){
    var chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: ["8/1", "8/2", "8/3", "8/4", "8/5", "8/6","8/7","8/8","8/9","8/10"],
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1,
                borderDashOffset:3,
                label:label
                
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
              
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

}

var canvas1 = document.getElementById("stage1").getContext('2d');
var canvas2 = document.getElementById("stage2").getContext('2d');
var canvas3 = document.getElementById("stage3").getContext('2d');

make_canvas(canvas1,[1, 2, 3, 1, 2, 3, 2, 2, 1, 3],"仕事の調子はどう？");
make_canvas(canvas2,[1, 2, 3, 1, 2, 3, 2, 2, 1, 3],"上司との関係性は？");
make_canvas(canvas3,[1, 2, 3, 1, 2, 3, 2, 2, 1, 3],"データ入力に作業はどう");
