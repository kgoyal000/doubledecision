var randRoute = 1;
var randCar = 1;

var carCheck = false;
var checkRoute = false;

var score = 0;

var rightCarHit = 0;
var rightRouteHit = 0;

var wrongRouteHit = 0;
var wrongCarHit = 0;

var seconds = 0;

var handle;


$('#Instructions').modal('show')

function play(){
    setTimeout(()=>{
        $('.start').css('display','none');
    },200);
   handle = setInterval(function () {
        seconds++;
      }, 1000);
    randomRoute();
    showRandomCar();
    showHiddenTimeout(2000)
}

function showHiddenTimeout(time){
    $('.my-container').css('pointer-events','none')
    setTimeout(()=>{
        showHidden()
     },time)
}

function randomRoute(){
    randRoute = Math.floor(Math.random() * 8) + 1;
    $('#g'+randRoute).append('<img class="route-icon vcenter" id="route" src="./images/out.png" alt="">');
}

function removeRoute(){
    $('#route').remove()
}

function showRandomCar(){
    randCar = Math.floor(Math.random() * 2) + 1;
    $('#car'+randCar).css('display','block')
}

function showHidden(){
    $('.my-container').css('pointer-events','all')
    if(randCar == 1){
        $('#car2').css('display','block')
    }else{
        $('#car1').css('display','block')
    }
    $('img.hidden-icon,.route-icon').css('display','none')

}

function hideHidden(){
        $('#car2').css('display','none')
        $('#car1').css('display','none')
        $('img.hidden-icon').css('display','none')
        $('.col-4').removeClass('nohover')
}

function checkCar(id){
    $('img.hidden-icon,.route-icon').css('display','block')
    $('.route-icon').css('display','none')
    $('.col-4').addClass('nohover')
    $('#car2').css('display','none')
    $('#car1').css('display','none')
    if(randCar == 1 && id == 'car1'){
        carCheck = true;
        rightCarHit++;
    }else if(randCar == 2 && id == 'car2'){
        rightCarHit++;
        carCheck = true;
    }else{
        carCheck = false;
        wrongCarHit++;
    }
    console.log('car check '+carCheck)
}

function routeCheck(id){
    console.log('#'+id)
    if($('#'+id).children().length == 2){
        checkRoute = true;
        rightRouteHit++
    }else{
        checkRoute = false;
        wrongRouteHit++;
    }
    console.log('routeCheck '+ checkRoute)
    checkScore()
}

function checkScore(){
    if(checkRoute && carCheck){
        score++;
        checkRoute = false;
        carCheck = false;
        hideHidden();
        removeRoute()
        nextLevel();
    }else{
        clearInterval(handle);
        var r = 'OOPS! You got it wrong<br>Entered Middle Player is '+carCheck+ ' and Outfielder Position is '+checkRoute
        $('#message').html(r)
        $('#score').html('Your total score is : '+score);
        $('#rightCar').html('Right Middle Player Clicked : '+rightCarHit);
        $('#rightRoute').html('Right Outfielder Clicked : '+rightRouteHit)
        $('#wrongCar').html('Wrong Middle Player Clicked : '+wrongCarHit);
        $('#wrongRoute').html('Wrong Outfielder Clicked : '+wrongRouteHit);
        $('#totalTime').html('Total time elapsed : '+seconds+' Seconds');
        hideHidden();
        $('#myModal').modal('show')
    }
}

function nextLevel(){
    randomRoute();
    showRandomCar()
    showHiddenTimeout(1500-score*50)
  /*  if(score == 5){
        $('.my-container').css('background-image','url("./images/2.jpg")')
    }
    if(score == 8){
        $('#car2').attr('src','./images/car3.svg')
    }
    if(score == 12){
        $('.my-container').css('background-image','url("./images/3.jpg")')
    }
    */
}

//Events
$('#myModal').on('hidden.bs.modal', function (e) {
    window.location.reload();
  })

  $('#Instructions').on('hidden.bs.modal', function (e) {
    play()
  })
