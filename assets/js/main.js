import '../../libs/js/jquery-v3.6.4-development.js';

$(document).ready(function(){
    $(document).on("click", "a", Impedir);
    
    (function(){
        if(location.pathname!="/" && location.pathname!="/index.html"){
            localStorage.setItem("page", location.pathname);
            location.href="/";
            return;
        }
    
        if(localStorage.getItem("page")!=null){
            Buscar(localStorage.getItem("page"));
            localStorage.clear();
        }
    })()
    
    function Impedir(event){
        event.preventDefault();
        Buscar($(this).attr("href"));
    }

    function Buscar(file){
        fetch(file)
        .then(response=>{
            return response.text();
        })
        .then(promise=>{
            let dom = new DOMParser();
            let html = dom.parseFromString(promise,"text/html");
            document.querySelector("main").outerHTML=html.querySelector("main").outerHTML;
            history.pushState({},"",file);
        })
    }
});