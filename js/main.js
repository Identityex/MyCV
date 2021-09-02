$(document).ready(function () {
    let parallax = $('.parallax').first();
    const client = new XMLHttpRequest();
    if(typeof url == "undefined")
    {
        client.open('GET','/codefile.cs');
    }
    else{
        client.open('GET',url + '/codefile.cs');
    }
    client.onreadystatechange = function (){
        let codeArea = $('#code-area');
        if(codeArea.html() !== '')
        {
            return;
        }
        codeArea.append(client.responseText);
        hljs.highlightElement(codeArea[0]);
    }
    client.send();

    const links = document.querySelectorAll("#navbar-head ul a");

    for (const link of links) {
        link.addEventListener("click", clickHandler);
    }

    function clickHandler(e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop;

        parallax.animate({
            scrollTop : offsetTop
        }, 800, 'swing', function (){
            window.location.hash = href;
        });
    }

    let timeout = null;
    let prevPos = parallax[0].offsetTop - (parallax[0].scrollTop + parallax[0].clientTop);
    let navStart = $('#navbar')[0].offsetTop;
    parallax.on('scroll', function () {

        clearTimeout(timeout);

        timeout = setTimeout(function () {

            let curPos =  parallax[0].offsetTop - (parallax[0].scrollTop + parallax[0].clientTop);

            if(curPos < 0){
                $('#top-btn').removeClass('hide-top-btn');
            }
            else{
                $('#top-btn').addClass('hide-top-btn');
            }


            if(curPos < prevPos && curPos * -1 > navStart)
            {
                $('#navbar').addClass('hide-nav');
            }
            else{

                $('#navbar').removeClass('hide-nav');
            }
            prevPos = parallax[0].offsetTop - (parallax[0].scrollTop + parallax[0].clientTop);
        }, 20);
    });

    $('#top-btn').click(function () {
        parallax.animate({
            scrollTop : 0
        }, 800, 'swing', function (){
            window.location.hash = "";
        });
    });

});

