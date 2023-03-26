$(document).ready(function(){
    $("[data-navegacao] a").click(function(e){
        e.preventDefault();
        $.ajax({url: this.href, success: function(result, status, xhr){
            let parser = new DOMParser();
            let document = parser.parseFromString(result,"text/xml");
            $("title").replaceWith($(document).find("head title"));
            $("main").replaceWith($(document).find("body main"));
        }});
    });
});