var characterLimit = 10000;
var characterCount = 0;
var morningPages = '';
const wrapper = document.querySelector(".input-wrapper"),
    textInput = document.querySelector("input[type='text']");

document.getElementById("characterCount").innerHTML = characterLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

var moveToEnd = function(e) {
    var fieldInput = $('#user-input');
    var fldLength = fieldInput.val().length;
    fieldInput.focus();
    fieldInput[0].setSelectionRange(fldLength, fldLength);
}

function toggle(checked) {
    var elm = document.getElementById('checkbox');
    if (checked != elm.checked) {
        elm.click();
    }
}

var focus = true;
window.onblur = function() { focus = false; }
window.onfocus = function() { focus = true; }
document.onblur = window.onblur;
document.focus = window.focus;

function msg() {
    if (focus) {
        document.title = "Talk";
    } else {
        document.title = "NEW MESSAGE";
    }
}

var input = document.querySelector('#user-input');
var textarea = document.querySelector('textInput');
var body = document.querySelector("body");
var container = document.querySelector(".vertical-center")
var inputWrapper = document.querySelector(".input-wrapper")

// Event listeners to reset cursor to end of input when user clicks away then clicks back in
var reset = function(e) {
    var len = this.value.length;
    this.setSelectionRange(len, len);
};

input.addEventListener('focus', reset, false);
input.addEventListener('click', reset, false);
input.addEventListener('mousedown', moveToEnd, false);
textInput.addEventListener('focus', reset, false);
textInput.addEventListener('click', reset, false);
textInput.addEventListener('mousedown', reset, false);

// TOGGLE THEME
function changeTheme() {
    var x = document.querySelector("#change-theme");
    var theme = document.getElementById('theme');

    if (x.innerHTML == "dark theme") {
        theme.setAttribute("href","css/darktheme.css");
        x.innerHTML = "light theme";
        return;
    } else if (x.innerHTML == "light theme") {
        theme.setAttribute("href","css/lighttheme.css");
        x.innerHTML = "dark theme";
        return;
    }
}


// HIDE PROGRESS BAR
function hideProgressBar() {
    var x = document.querySelector("progress");
    var z = document.getElementById("hideProgressBar");
    if (x.style.visibility == 'hidden') {
        x.style.visibility = 'visible';
        z.innerHTML = 'hide progress bar';
    } else {
        x.style.visibility = 'hidden';
        z.innerHTML = 'show progress bar';
    }
}




// Timer
var formInitializationTime;

$('form input').bind('keypress change click', function() {
    if (!formInitializationTime) formInitializationTime = new Date();
});

var myTime;

$('#done').click(function() {
    myTime = new Date() - formInitializationTime;
});

// TYPING EVENTS

    // IGNORE 'ENTER' KEY
$('html').bind('keypress', function(e) {
    if (e.keyCode == 13) {
        console.log('user clicked \'enter\'');
        return false;
    }
});

textInput.addEventListener("keyup", event => {
    wrapper.setAttribute("data-text", event.target.value);

    var myCount = document.getElementById("characterCount").innerHTML;
    characterCount = document.querySelector(".mp").value.length;

    morningPages = event.target.value;
    console.log("Morning pages: " + morningPages)
    var wordCount = morningPages.trim().split(/\s+/).length;

    if (morningPages.length == 0) {
        wordCount = 0;
    }

// REACH 10k WORDS
    if (characterCount >= characterLimit) {
        document.getElementById("prompt").innerHTML = "Morning pages completed.";
        document.getElementById("done").style.backgroundColor = "gray";
        document.getElementById("done").style.backgroundColor = "white";
        document.getElementById("characterCount").style.color = "white";
    }

    console.log("Word count: " + wordCount)

    document.getElementById("characterCount").innerHTML = (characterLimit - characterCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.querySelector("progress").value = characterCount;

// Sort morning pages by most commonly used words.
    function mode(arr) {
        arr = arr.sort((a, b) =>
            arr.filter(v => v === b).length -
            arr.filter(v => v === a).length
        );
        return arr;
    }
    var boringWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "will", "an", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "when", "me", "make", "can", "like", "time", "no", "just", "him", "know", "take", "person", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"];

    mostCommonWords = morningPages.split(' ').filter(function(item) {
        mostCommonWords = boringWords.indexOf(item) === -1;
        return mostCommonWords;
    })

    var uniqueWords = mostCommonWords.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    });

    uniqueWords = uniqueWords.slice(0, 10);
    mostCommonWords = uniqueWords.join(' ').split();

    console.log(mostCommonWords);
    console.log(" ");

    document.getElementById('finalWordCount').innerHTML = wordCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('finalCharCount').innerHTML = characterCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('mostCommonWords').innerHTML = mostCommonWords;

});


// DONE
var resetButton = function() {
    location.reload();
};

document.getElementById('stats').className = "hide";

var clickDone = function() {
    document.getElementById('stats').className = "show";
    document.getElementById('done').style.display = 'none';
    console.log('clicked');

    function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        if (minutes == 0) {
            return seconds + " seconds"
        }
        return minutes + " minutes, " + seconds + " seconds";
    }

    myTime = msToTime(myTime)
    document.getElementById('timeElapsed').innerHTML = myTime;
    console.log(myTime);
}

document.getElementById('done').addEventListener("click", clickDone);
document.getElementById('resetButton').addEventListener("click", resetButton);

// DOWNLOAD
var wordCount = document.getElementById('finalWordCount').innerHTML;

$("#downloadButton").click(function() {
    var text = $("#user-input").val();
    text = text + "\n \n Word count: " + document.getElementById('finalWordCount').innerHTML +
        "\n Character count: " + document.getElementById('characterCount').innerHTML +
        "\n Time elapsed: " + document.getElementById('timeElapsed').innerHTML +
        "\n Ten most frequently used words: " + document.getElementById('mostCommonWords').innerHTML;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + "-" + dd + "-" + yyyy;
    var filename = today + " Morning pages"
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, filename + ".txt");
});
