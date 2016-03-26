function loadGreeting(){
    $.get("http://localhost:8080/mirrormirror/service/greeting", function(response) {
        $("#greeting").text(response);
    });
}

function showGreeting(){
    if ($("#greeting").hasClass("hidden")){
        $("#greeting").removeClass("hidden");
    }
}

function hideGreeting(){
   if (!$("#greeting").hasClass("hidden")){
      $("#greeting").addClass("hidden");
   }
}