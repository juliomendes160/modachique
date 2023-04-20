import '../../libs/js/jquery-v3.6.4-development.js';

// http://127.0.0.1:5501/assets/html/start.html

$(document).ready(function(){
    Search("/index.html", SetHtml);
    Search(location.pathname, SetMain);
    $("html").delay("slow").fadeIn();
    $(document).on("click", "a", Load);
})

function Search(file, Callback){
    $.ajax({async: false, url: file, success: function(result){
        Callback(new DOMParser().parseFromString(result, "text/html").documentElement);
    }});
}

function SetHtml(html){
    $("html").replaceWith(html);
}

function SetMain(html){
    $("main").html($(html).find("main").html());
}

function Load(event){
    event.preventDefault();
    Search($(this).attr("href"), SetMain);
    history.pushState({},"",$(this).attr("href"));
}