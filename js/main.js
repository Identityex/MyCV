$(document).ready(function () {

    const client = new XMLHttpRequest();
    client.open('GET','/codefile.cs');
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

});