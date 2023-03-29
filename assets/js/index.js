$(document).ready(function(){
    $(document).on("click", "[data-pagina] a, [data-navegacao] a", function(e) {
        e.preventDefault();
        $.ajax({url: this.href, success: function(result, status, xhr){
            let parser = new DOMParser();
            let document = parser.parseFromString(result,"text/html");
            $("main").prop("outerHTML", $(document).find("main").prop("outerHTML"));
        }});
    });
});