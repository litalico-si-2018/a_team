$(".fa .fa-smile").on("click", function(){
  $("#answerHeart").addClass("fa fa-heart");
  $(".fa-heart:before").css("display", "inline-block");
})

$(".fa .fa-tired").on("click", function(){
  $("#answerTint").addClass("fa fa-tint");
  $(".fa-tint:before").css("display", "inline-block");
})
