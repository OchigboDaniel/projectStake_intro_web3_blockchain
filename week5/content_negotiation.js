
const url = "https://eloquentjavascript.net/author"

// function to fetch with accept type
async function callURL(url, acceptType) {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": acceptType
        }
    });
    let text = await response.text();
    console.log(response.status);
    console.log(text);
}

// call for the text/plain
callURL(url, "text/plain");
// call for the text/html
callURL(url, "text/html");
// call for the application/json
callURL(url, "application/json")
// call for the application/rainbows+unicorns
callURL(url, "application/rainbows+unicorns");
