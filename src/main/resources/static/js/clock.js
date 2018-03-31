var datetime = null,
date = null;
var dateUpdateId;

var update = function () {
    date = moment(new Date())
    var html = '<div>' + date.format('dddd, MMMM Do') + '</div>';
    html += '<div id="time">' + date.format('hh:mm A') + '</div>';
    datetime.html(html);
};

function startAndShowDate(){
    if ($("#date").hasClass("hidden")){
        $("#date").removeClass("hidden");
        datetime = $('#date');
        update();
        dateUpdateId = setInterval(update, 15000);
    }
}

function stopAndHideDate(){
   if (!$("#date").hasClass("hidden")){
      $("#date").addClass("hidden");
      clearInterval(dateUpdateId);
   }
}
