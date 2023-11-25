const addButton = document.getElementById("addButton");
const download = document.getElementById("download");
const newJoke = document.getElementById("newJoke");
const upload = document.getElementById("upload");
const jokeContainer = document.getElementById("container");

upload.onchange = uploadJokes;
addButton.onclick = saveNewJoke;
download.onclick = downloadJokes;

const JOKE_API_END_POINT = "/joke";

async function saveNewJoke(e) {
    if (newJoke.value != "") {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: newJoke.value,
        };

        let result = await fetch(JOKE_API_END_POINT, options)

        if (result.status === 200) {
            jokeContainer.innerText = newJoke;
            newJoke.value = "";
        } else {
            alert("Kunne ikke lagre vits");
        }

    }
}



async function getJoke() {

    let raw = await fetch(JOKE_API_END_POINT);
    if (raw.status >= 200 && raw.status < 400) {
        let joke = await raw.text();
        if (joke) {
            jokeContainer.innerText = joke;
        }
    }
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

await getJoke();