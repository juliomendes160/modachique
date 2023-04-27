import '../../libs/js/jquery-v3.6.4-development.js';

let path = location.pathname.split(/(^[/]+[a-z]+[/])/);
let root = path[1];
let file = path[2];

$(document).ready(async function(){
    await Search(SetHtml, root);
    await Search(SetMain, file);
    $("html").delay("slow").fadeIn();
    $(document).on("click", "a", Load);
});

async function Search(Callback, url){
    let result = await $.ajax(url);
    let html = new DOMParser().parseFromString(result, "text/html").documentElement;
    Callback(url, html);
}

function SetHtml(url, html){
    SetUrl(url);
    $("html").replaceWith(html);
}

function SetMain(url, html){
    $("main").html($(html).find("main").html());
    SetUrl(url);
}

function SetUrl(url){
    history.pushState({},"", url);
}

function Load(event){
    event.preventDefault();
    path = root + $(this).attr("href");
    Search(SetMain, path);
}