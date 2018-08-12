$(".fa-smile").on("click", function(){
  $("#answerHeart").addClass("fa fa-heart");
  $(".fa-heart:before").css("display", "inline-block");
  $('#answerHeart').delay(2000).queue(function() {
    $(this).removeClass('fa-heart').dequeue();
  });
})

$(".fa-tired").on("click", function(){
  $("#answerTint").addClass("fa fa-tint");
  $(".fa-tint:before").css("display", "inline-block");
  $('#answerTint').delay(2000).queue(function() {
    $(this).removeClass('fa-tint').dequeue();
  });
})
