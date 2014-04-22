$(document).ready(function(){

    var server = io.connect('http://localhost:3000');

    server.on('connect', function(data){
        nickname = prompt("What is your name?");
        server.emit('join',nickname);
    });
   
    server.on('sidebarchat',function(name, clientid){
        $("#usersonline").append('<li class="'+clientid+'">'+name+'</li>');
    });

    server.on('privatechat', function(name, text, clientid){
        if ($('#'+clientid).length>0){
            $('#'+clientid).append('</br>'+text);
        } else{
             $("body").append('<div class="windowchat" id="'+clientid+'"><p>'+name+'</p>'+text+'<input class="text" type="text"><button class="send">Enviar</button></div>');
        }
    });

    $("#usersonline").on("click", "li", function(e){
       var clientid = $(this).attr("class");
       if ($('#'+clientid).length==0){
            $("body").append('<div class="windowchat" id="'+clientid+'"><input class="text" type="text"><button class="send">Enviar</button></div>'); 
       }
    });
 
    $("body").on("click", ".send", function(e){
        var clientid = $(this).closest(".windowchat").attr("id");
        var text = $(this).prev().val();
        $('#'+clientid).append('</br>'+text);
        server.emit('getname');
        server.on('putname', function(name){
            server.emit('privatechat', clientid, name, text);
        });      
    });

 
});