import '../../libs/js/jquery-v3.6.4-development.js';

$(document).ready(function(){
    Search("/index.html", SetHtml);
    $(document).on("click", "a", Load);
})

function Search(file, Callback){
    $.ajax({url: file, success: function(result){
        Callback(new DOMParser().parseFromString(result, "text/html").documentElement);
    }});
}

function SetHtml(html){
    $("html").replaceWith(html);
    Search(location.pathname, SetMain);
    $("html").delay("slow").fadeIn();
}

function SetMain(html){
    $("main").html($(html).find("main").html());
}

function Load(event){
    event.preventDefault();
    Search($(this).attr("href"), SetMain);
    history.pushState({},"",$(this).attr("href"));
}