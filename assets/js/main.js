import '../../libs/js/jquery-v3.6.4-development.js';

$(document).ready(function(){

    $(document).on("click", "a", Prevent); // Ouvir: tag <a></a>

    function Prevent(event){ // Impedir: carregamento da página
        event.preventDefault();
        Search($(this).attr("href"));
    }

    function Search(file){ // Buscar: novo HTML
        $.ajax({
            url: file, 
            success: function(result){
            let dom = new DOMParser();
            let html = dom.parseFromString(result,"text/html");
            $("main").html($(html).find("main").html());
            history.pushState({},"",file);
        }});
    }

    // function Search(file){ // Buscar: adiciona conteúdo no HTML
    //     fetch(file)
    //     .then(response=>{
    //         return response.text();
    //     })
    //     .then(promise=>{
    //         let dom = new DOMParser();
    //         let html = dom.parseFromString(promise,"text/html");
    //         // $("main").replaceWith($(html).find("main"));
    //         console.log($(html).find("main"));
    //         document.querySelector("main").outerHTML=html.querySelector("main").outerHTML;
    //         history.pushState({},"",file);
    //     })
    // }

    (function(){ // Redirecionar: página raiz
        if(location.pathname!="/" && location.pathname!="/index.html"){
            localStorage.setItem("page", location.pathname);
            location.href="/";
            return;
        }
        if(localStorage.getItem("page")!=null){
            Search(localStorage.getItem("page"));
            localStorage.clear();
        }
    })()

});