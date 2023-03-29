$(document).ready(function(){
    $("[data-navegacao] a").click(function(e){
        e.preventDefault();
        $.ajax({url: this.href, success: function(result, status, xhr){
            let parser = new DOMParser();
            let document = parser.parseFromString(result,"text/html");
            $("title").prop("outerHTML",$(document).find("title").prop("outerHTML"));
            $("main").prop("outerHTML",$(document).find("main").prop("outerHTML"));
        }});
    });
});