/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */

const FRESH_PRINCE_URL = "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
const CURB_POSTER_URL = "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL = "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
let titles = [
    "Fresh Prince of Bel Air",
    "Curb Your Enthusiasm",
    "East Los High"
];
// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.
// This function adds cards the page to display the data in the array

function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    for (let i = 0; i < titles.length; i++) {
        let title = titles[i];

        // This part of the code doesn't scale very well! After you add your
        // own data, you'll need to do something totally different here.
        let imageURL = "";
        if (i == 0) {
            imageURL = FRESH_PRINCE_URL;
        } else if (i == 1) {
            imageURL = CURB_POSTER_URL;
        } else if (i == 2) {
            imageURL = EAST_LOS_HIGH_POSTER_URL;
        }

        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, title, imageURL); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, newTitle, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";

    // You can use console.log to help you debug!
    // View the output by right clicking on your website,
    // select "Inspect", then click on the "Console" tab
    console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
    console.log("Button Clicked!")
    alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
}

function removeLastCard() {
    titles.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}

// Binary Search Tree
// Tree node

// import { results } from "./TreeRes.json"     //failed import

let mainNode; // declared globally so restart button works
let results;
// while fetching the data from the JSON file, loading data asynchronously
fetch('./TreeRes.json')
    .then(response => response.json())
    .then(data => {
        constructTree(data);
    })
.catch(error => console.error('Error loading TreeRes.json', error));

class TreeNode {
    constructor(val, leftN = null, rightN = null) {
        this.value = val;
        this.left = leftN;
        this.right = rightN;
    }
}
function constructTree(data) {
    results = data;
    // lvl 4 tree nodes (leaf nodes)
    let NE1 = new TreeNode( results.NE1res);
    let NW1 = new TreeNode( results.NW1res);
    let NE6 = new TreeNode( results.NE6res);
    let NW6 = new TreeNode( results.NW6res);
    let SE1 = new TreeNode( results.SE1res);
    let SW1 = new TreeNode( results.SW1res);
    let SE6 = new TreeNode( results.SE6res);
    let SW6 = new TreeNode( results.SW6res);
    // lvl 3 tree nodes
    let NENode = new TreeNode("NorthEast it is!\nFor the hotel ratings, do you prefer the more famous locations (option 1) or the lesser popular spots (option 2)?", NE6, NE1);
    let NWNode = new TreeNode("NorthWest it is!\nFor the hotel ratings, do you prefer the more famous locations (option 1) or the lesser popular spots (option 2)?", NW6, NW1);
    let SENode = new TreeNode("SouthEast it is!\nFor the hotel ratings, do you prefer the more famous locations (option 1) or the lesser popular spots (option 2)?", SE6, SE1);
    let SWNode = new TreeNode("SouthWest it is!\nFor the hotel ratings, do you prefer the more famous locations (option 1) or the lesser popular spots (option 2)?", SW6, SW1);
    // lvl 2 tree nodes
    let EastNode = new TreeNode("East it is!\nDo you prefer Northeast (option 1) or Southeast (option 2)?", NENode, SENode);
    let WestNode = new TreeNode("West it is!\nDo you prefer Northwest (option 1) or Southwest (option 2)?", NWNode, SWNode);
    // root node
    mainNode = new TreeNode("Do you prefer a vacation spot in the East Coast (option 1) or the West Coast (option 2)?", EastNode, WestNode);

    displayResponse(mainNode);
}

function displayResponse (node) {
    if (!node) return;

    //  if we reach a leaf node
    if(!node.left && !node.right) {
        // display recommendation w images
        
        const container = document.getElementById("question");
        container.innerHTML = '';
        node.value.forEach(recommendation => {
            const cityElement = document.createElement("p");
            cityElement.textContent = recommendation.city;
            container.appendChild(cityElement);

            const imageElement = document.createElement("img");
            imageElement.src = recommendation.image;
            imageElement.alt = `Image of ${recommendation.city}`;
            container.appendChild(imageElement);
        });
        
        // document.getElementById("question").textContent = node.value; // failed attempt #13
        
        // hides buttons
        document.getElementById("opt1").style.display = 'none';
        document.getElementById("opt2").style.display = 'none';
        return;
    }

    //  updates the question
    document.getElementById("question").textContent = node.value;

    //  if user chooses opt1, trigger left node
    document.getElementById("opt1").onclick = () => displayResponse(node.left);
    //  if user chooses opt2, trigger right node
    document.getElementById("opt2").onclick = () => displayResponse(node.right);
}

// restart button functionality
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("restart").onclick = () => {
        console.log("restart clicked", results);
        if (results) {
            constructTree(results);
            // makes buttons visible again
            document.getElementById("opt1").style.display = '';
            document.getElementById("opt2").style.display = '';
        }
    };
});

/*
Data set from https://travel.usnews.com/rankings/best-cities-usa/
Data set from https://travel.usnews.com/rankings/best-weekend-getaways-in-the-south/

*/