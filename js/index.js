
$("document").ready(function(){
  
  var $start = $("#start-button"),
      $sessionLength = $("#session-length"),
      $breakLength = $("#break-length"),
      $clock = $("#clock"),
      $restart = $("#restart"),
      $timerStatus = $("#timer-status"),
      $progressBar = $("#progress-bar");
  
  
  var sessionLength = $sessionLength.text(),
      breakLength = $breakLength.text(),
      clock = sessionLength;
  
  var started = false;
  var paused=false;
  var isBreak = false;
  var totalSeconds =1;
  var timerLength =1;
  
  $clock.text(clock);
  
  updateScreen();
  
  $('button').on("click",function(){
    
    var value = $(this).val();
    
    if(value=="restart"){
      started = false;
      paused = false;
      isBreak = false;
      timerLength =1;
      totalSeconds=1;
      clock = sessionLength;
    }
    
    
    if(!started||paused){
      if(!paused){  
      if(value=="minus-session"&&sessionLength>1){
        sessionLength--;
        clock--;
      }
      if(value=="plus-session"){
        sessionLength++;
        clock++;
      }
      if(value=="minus-break"&&breakLength>1){
        breakLength--;
      }
      if(value=="plus-break"){
        breakLength++;
      }
      }
      if(value=="start"&&!isBreak){
        if(!started){
          started = true;
          console.log("timer started");
          startTimer(sessionLength);
          //start timer
        }
        if(paused){
          resumeTimer();
          console.log("timer resumed");
          //resume timer
        }        
      }
    }else{
      if(value=="start"&&!isBreak){
        console.log("timer paused");
        paused=true;
      }
    }
    updateScreen();
  });
  
  
  function updateScreen(){
    $sessionLength.text(sessionLength);
    $breakLength.text(breakLength);
    $clock.text(clock);
    var progress = Math.floor(totalSeconds/timerLength*100);
    $progressBar.attr("style","width:"+progress+"%");
    $progressBar.attr("aria-valuenow",progress);
    //BUTTON STYLING
    
    if(!isBreak){
    if(!started||paused){
      if(!paused){
       $timerStatus.text("Start session");
      }else{
        $timerStatus.text("Resume session");
      }
      $start.html("<i class=\"fas fa-play-circle fa-2x\"></i>");
        $start.css("color","#448253");
        $start.hover(function(){
         $start.css("color","#78c98c");
        },function(){
          $start.css("color","#448253");
        })
    }else{
      $timerStatus.text("Work Time!");
      $start.html("<i class=\"fas fa-pause-circle fa-2x\"></i>");
        $start.css("color","#c14330");
        $start.hover(function(){
         $start.css("color","#ea7c6b");
        },function(){
          $start.css("color","#c14330");
        })
    }
  }else{
    $timerStatus.text("Break Time!")
    $start.html("<i class=\"fas fa-coffee fa-2x\"></i>");
    $start.css("color","#5179ba");
    $start.hover(function(){
    $start.css("color","#809dce");
     },function(){
      $start.css("color","#5179ba");
   })
  }
    
  }
  
  
  var timerId= 0;
  
  
  function resumeTimer(){
    paused=false;
    
    timerId = setInterval(function(){
      if(!started){
        clearInterval(timerId);
        return;
      }
      
      if(paused){
        clearInterval(timerId);
        return;
      }
      totalSeconds--;
      
      var minutes = Math.floor(totalSeconds/60);
      var seconds = totalSeconds%60;
      
      clock = minutes+":"+seconds;
      
      if(totalSeconds==0){
        if(isBreak){
          isBreak = false;
          clearInterval(timerId);
          startTimer(sessionLength);
        }else{
          isBreak=true;
          clearInterval(timerId);
          startTimer(breakLength); 
        }
      }      
      
      updateScreen();
      
    },1000);
    
  }
  
  function startTimer(totalMinutes){
    
    totalSeconds = totalMinutes*60;
    
    timerLength = totalSeconds;
    var minutes = Math.floor(totalSeconds/60);
    var seconds = totalSeconds%60;
    if(seconds<10){
        seconds = "0"+seconds;
      }
    clock=minutes+":"+seconds;
    updateScreen();
    
    timerId = setInterval(function(){
      
      if(paused){
        clearInterval(timerId);
        return;
      }
      
      if(!started){
        clearInterval(timerId);
        return;
      }
      
      
      totalSeconds--;    
      minutes = Math.floor(totalSeconds/60);
      seconds = totalSeconds%60;
    
      if(seconds<10){
        seconds = "0"+seconds;
      }
      
      clock=minutes+":"+seconds;
      
      if(totalSeconds==0){
        if(isBreak){
          isBreak = false;
          clearInterval(timerId);
          startTimer(sessionLength);
        }else{
          isBreak=true;
          clearInterval(timerId);
          startTimer(breakLength); 
        }
      }
      
      
      updateScreen();
      
    },1000);  
  }
  
})