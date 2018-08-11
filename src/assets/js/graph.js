// ハードコードでグラフを表示

function make_canvas(canvas,data,label,rgba){
    var chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: ["8/1", "8/2", "8/3", "8/4", "8/5", "8/6","8/7","8/8","8/9","8/10"],
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    rgba
                ],
                borderColor: [
                    rgba
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

var canvas1 = document.getElementById("stage1");
var canvas2 = document.getElementById("stage2");
var canvas3 = document.getElementById("stage3");



make_canvas(canvas1,JSON.parse(graph1.dataset.graph),"仕事の調子はどう？",'#B171F57a');
make_canvas(canvas2,[2, 2, 0, 1, 2, 1, 0, 1, 1, 1],"上司との関係性は？",'#F5BF767a');
make_canvas(canvas3,[0, 2, 1, 1, 2, 0, 2, 2, 1, 0],"データ入力に作業はどう",'#93FAC37a');
