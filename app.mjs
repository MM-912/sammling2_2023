
const data = ["Har du hørt om han som ikke likte kaffe? – Han syntes ikke det var noe å trakte etter…", "Vet du hva moren til Pinocchio var? – Trebarnsmor…", "Man kan si mye rart om Sveits, men en ting er i hvert fall sikkert. – Flagget er et stort pluss…"];

displayJoke();

const addButton = document.getElementById("addButton");
const download = document.getElementById("download");
const newJoke = document.getElementById("newJoke");
const upload = document.getElementById("upload");

upload.onchange = uploadJokes;

addButton.onclick = function (e) {
    if (newJoke.nodeValue != "") {
        data.push(newJoke.value);
        displayJoke(data.length - 1);
        newJoke.value = "";
    }
}

download.onclick = downloadJokes;

function displayJoke(index = -1) {
    let jokeIndex = index;
    if (jokeIndex < 0) {
        jokeIndex = Math.floor(Math.random() * (data.length - 0 + 1) + 0);
    }
    const joke = data[jokeIndex];

    document.getElementById("container").innerText = joke;
}

function downloadJokes(e) {

    let a = document.createElement("a");

    let output = "";
    for (let i = 0; i < data.length; i++) {
        output = output + data[i] + "\n\n";
    }


    let blob = new Blob([output], { 'type': "text/plain" });
    a.href = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.download = "JokesAreUS.txt";
    a.click();
    document.body.removeChild(a);

}

function uploadJokes(e) {

    const file = e.target.files[0];
    console.log(file);

    let reader = new FileReader();
    reader.onload = (e) => {
        parseJokes(e.target.result);
    }
    reader.readAsText(file, "UTF-8");
}

function parseJokes(raw) {

    let newJokes = raw.split("\n");
    for (const joke of newJokes) {
        if (joke != "") {
            data.push(joke);
        }
    }

    displayJoke();

}

