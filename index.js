//init all media containers
const videoWindow = document.getElementById("videoWindow");
const friendly = document.getElementById("friendly");
const crosshairView = document.getElementById("crosshairView");
const enemy = document.getElementById("enemy");
const crosshairDotView = document.getElementById("crosshairDotView");
const infoBox = document.getElementById("source");

//bool for is full screen
let isFull = false;

//clear content of all media containers
function clearMedia(){
    videoWindow.setAttribute('src', "");
    friendly.setAttribute('src', "empty.png");
    crosshairView.setAttribute('src', "empty.png");
    crosshairDotView.setAttribute('src', "empty.png");
    enemy.setAttribute('src', "empty.png");
    friendly.style.boxShadow = "";
    enemy.style.boxShadow = "";
    infoBox.innerHTML = "";
}

//fill the index list with all map smoke entries from given array
function populateIndex(list){
    for (let i = 0; i < list.length; i++) {
        let str = toString(i);
        let option = document.createElement("button");
        option.innerHTML += '<img class="indexIcon" src="icons/' + (list[i].side == "t" ? 't.png' : 'ct.png') + '">'; 
            
        option.innerHTML += list[i].start + " : " + list[i].land;
        if(list[i].site == 'a' || list[i].site == 'b'){ 
            option.innerHTML += '<img class="indexIcon" src="icons/' + list[i].site.toUpperCase() +  '.png' + '">';
        }else{
            option.innerHTML += '<img class="indexIcon" src="icons/M.png">';
        }
        option.setAttribute("class", "indexItem");
        option.style.background = list[i].side == "t" ? "rgba(255, 165, 0, 0.329)" : "rgba(0, 0, 255, 0.329)";
        option.addEventListener("click", function() {
            clearMedia();
            if(list[i].side == "t"){
                friendly.style.boxShadow = "rgba(100, 50, 0, 0.56) 0px 22px 70px 4px";
                enemy.style.boxShadow = "rgba(0, 0, 50, 0.56) 0px 22px 70px 4px";
            }else{
                friendly.style.boxShadow = "rgba(0, 0, 50, 0.56) 0px 22px 70px 4px";
                enemy.style.boxShadow = "rgba(100, 50, 0, 0.56) 0px 22px 70px 4px";
            }
            if(document.getElementById("selected") != null){
                document.getElementById("selected").removeAttribute('style');
                document.getElementById("selected").style.animation = "shrinkT 1s";
                document.getElementById("selected").style.height = "2vw";
                document.getElementById("selected").style.background = previousSide == "t" ? "rgba(255, 165, 0, 0.329)" : "rgba(0, 0, 255, 0.329)";
                document.getElementById("selected").removeAttribute('id');
            }
            if(list[i].info != null){
                infoBox.innerHTML = list[i].info;
            }
    
            videoWindow.setAttribute('src', list[i].videoURL);
            friendly.setAttribute('src', list[i].friendly);
            crosshairView.setAttribute('src', list[i].crosshair);
            crosshairDotView.setAttribute('src', list[i].crosshairDot);
            enemy.setAttribute('src', list[i].enemy);
            option.style.animation = list[i].side == "t" ? "growT "+ "1s" : "growCT " + "1s";
            option.style.height = "4vw";
            option.style.background = "rgba(255, 255, 255, 0.329);";
            previousSide = list[i].side;
            option.setAttribute('id', "selected");
        }); 
        document.getElementById("index").appendChild(option);
    }
}

function fullScreenToggle() {
    if(isFull == true){
        videoWindow.style.width = "48vw";
        videoWindow.style.left = "16vw";
        videoWindow.style.top = "1vw";
        document.getElementById("full").style.backgroundImage = "URL(icons/full.png)";
        document.getElementById("full").style.left = "48vw";
        document.getElementById("home").style.left = "44vw";
        isFull = false;
    }else{
        videoWindow.style.width = "80vw";
        videoWindow.style.left = "0vw";
        videoWindow.style.top = "0vw";
        document.getElementById("full").style.backgroundImage = "URL(icons/mini.png)";
        document.getElementById("full").style.left = "76vw";
        document.getElementById("home").style.left = "1vw";
        isFull = true;
    }
}document.getElementById("full").addEventListener("click", fullScreenToggle);
