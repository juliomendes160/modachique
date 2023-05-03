import '../../libs/js/jquery-v3.6.4-development.js';

const path = location.pathname.split(/(^[/]+[a-z]+[/])/);
const root = path[1];
const file = path[2];

$(document).ready(async function(){
    await Search(SetHtml, root);
    await Search(SetMain, file);
    Listen();
});

async function Search(Callback, url){
    let result = await $.ajax(url);
    let html = new DOMParser().parseFromString(result, "text/html").documentElement;
    Callback(url, html);
}

function SetHtml(url, html){
    history.pushState({},"", url);
    $("html").replaceWith(html);
}

function SetMain(url, html){
    $("main").html($(html).find("main").html());
    history.pushState({},"", url);
    if($("html").is(":hidden")) $("html").delay("slow").fadeToggle();
}

function Listen(){
    const navegacao = {
        get menu() {
            if($("[data-navegacao-menu]").is(":hidden")){
                $("[data-navegacao-menu]").fadeIn();
                $("[data-navegacao-menu]").scrollTop(0);
            }
            else{
                $("[data-navegacao-menu]").fadeOut();
            }
            $("[data-navegacao-funcao='menu']").children().toggle();
        },
    }

    $(document).on("click", "[data-navegacao-menu] a", function(event){
        event.preventDefault();
        let url = root + $(this).attr("href");
        Search(SetMain, url);
        navegacao.menu;
    });

    $(document).on("click", "[data-navegacao-funcao] a", async function(event){   
        event.preventDefault();
        navegacao[this.dataset.navegacaoFuncao];
    });
}