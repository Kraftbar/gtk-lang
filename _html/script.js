var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);


// globals 

var words = new Array(1000);
var words_empt=words;
var words_length=0;
correct_flag=0;

// -----------------------
// file/ txts handeling 
// -----------------------

function pros(csv){
    //reset
    k=0;
    words=words_empt;

    var rows = csv.split('\n');
    rows.pop(); // last one is null
    for (var i = 0; i < rows.length; i++) {
      cols = rows[i].split('\t');
      words[i] = new Array(3);
      for (var j = 0; j < cols.length; j++) {
        var value = cols[j];
        console.log(value)
        words[i][j] = value;
      }
      words_length=i;
    }

//    document.getElementById('output').innerHTML = "text read inn, ready to start^^".bold();
    document.getElementById('output').innerHTML = words[k].join(" ");
    
}


function processFile(){
    var file = document.querySelector('#myFile').files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      var csv = event.target.result;
      pros(csv)

    }
  }

  function processText(){
    var x = document.getElementById("myTextarea").value;
    pros(x)
}


// -----------------------
// display array 
// -----------------------



function nextItem() {
    document.getElementById('feedback').innerHTML="<br/>";
    
    k = k + 1; 
    k = k % words_length; 

    return words[k].join(" "); 
}
function prevItem() {
    document.getElementById('feedback').innerHTML="<br/>";


    if (k === 0) { // i would become 0
        k = words_length; // so put it at the other end of the array
    }
    k = k - 1; // decrease by one
    return words[k].join(" "); // give us back the item of where we are now
}
function checkItem() {

    var inputVal = document.getElementById("typed_word").value;
    if(inputVal==words[k][2]){              

        return "✓";
         correct_flag=1;

    }else{
        return  "☓";
    }


}


// button input
window.addEventListener('load', function () {

    document.getElementById('prev_button').addEventListener(
        'click', // we want to listen for a click
        function (e) { // the e here is the event itself
            document.getElementById('output').textContent = prevItem();
        }
    );
    
    document.getElementById('next_button').addEventListener(
        'click', // we want to listen for a click
        function (e) { // the e here is the event itself
            document.getElementById('output').textContent = nextItem();
        }
    );
    document.getElementById('check_button').addEventListener(
        'click', // we want to listen for a click
        function (e) { // the e here is the event itself
            document.getElementById('feedback').textContent=checkItem();
        }
    );



});


// enter input
var typed_word = document.getElementById("typed_word");

typed_word.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('feedback').textContent=checkItem();
    }
    
});