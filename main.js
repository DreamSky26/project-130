solojennie="";
switchphoneskylie="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_solojennie = "";
song_switchphoneskylie = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function preload(){
    solojennie = loadSound("JENNIE (BLACKPINK) - SOLO.mp3");
    switchphoneskylie = loadSound("Kylie Cantrall - Switch Phones.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_solojennie = solojennie.isPlaying();
    console.log(song_solojennie);

    song_switchphoneskylie = switchphoneskylie.isPlaying();
    console.log(song_switchphoneskylie);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        switchphoneskylie.stop();
        if(song_solojennie == false){
            solojennie.play();
        }
        else{
            console.log("Song Name: Jennie BLACKPINK - SOLO");
            document.getElementById("song_id").innerHTML = "Song Name: Jennie BLACKPINK - SOLO";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        solojennie.stop();
        if(song_switchphoneskylie == false){
            switchphoneskylie.play();
        }
        else{
            console.log("Song Name: Kylie Cantrall - Switch Phones");
            document.getElementById("song_id").innerHTML = "Song Name: Kylie Cantrall - Switch Phones";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}