// DOM elements for random meal section
let mealName = document.querySelectorAll("#random-meal #meal-name");
let mealThumbnail = document.querySelector("#meal-thumbnail");
let mealIng = document.getElementById("meal-ing");
// Form and search elements
let form = document.querySelector("form");
let searchResult = document.getElementById("search-result");
let searchBar = document.getElementById("search-bar");
let searchTitle = document.getElementById("search-title");
// Modal elements
let modal = document.getElementById("modal");
let allIng = document.getElementById("allingredients");
let closeBtn = document.getElementById("closeBtn");
let modalBtn = document.getElementById("modalBtn");
let modalThumbnail = document.getElementById("image");
// Event listeners for modal
modalBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);

function toggleModal() {
    modal.classList.toggle("pop-up");
}

// Fetch and display a random meal on page load
function getRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            appendRandomMeal(data) 
        })
        .catch((err) => console.log(err))
}

getRandomMeal()
// Display details of a random meal
function appendRandomMeal(data) {
    const meal = data.meals[0]
    mealName.forEach((name) => {
        name.innerHTML = meal.strMeal
    })

    mealThumbnail.src = meal.strMealThumb
    modalThumbnail.src = meal.strMealThumb
    const maxDisplayedIngredients = 2;
    for(let i = 1;i <= maxDisplayedIngredients;i++){
        const ingredient = `strIngredient${i}`
        const measure = `strMeasure${i}`
        if (meal[ingredient] && meal[measure]){
            let li = document.createElement("li")
            li.innerText = `${meal[ingredient]},${meal[measure]}`
            mealIng.append(li)
        } else{
            break 
        }
    }
    if (mealIng.children.length > 2) {
        mealIng.lastChild.innerText += "...";
    }
    

    for(let i = 1;i <= 20;i++) {
        const ingredient = `strIngredient${i}`
        const measure = `strMeasure${i}`
        if (meal[ingredient] && meal[measure]){
            let li = document.createElement("li")
            li.innerText = `${meal[ingredient]},${meal[measure]}`
            allIng.append(li)
        } else{
            break
        }
    } 
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    getResults();
});
// Fetch and display search results based on user input
function getResults() {
    
    searchResult.innerHTML = ""
    let value = searchBar.value
    searchTitle.style.visibility = "visible"
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        appendSearchResults(data)
    })
    .catch((err) => console.log(err))

    const categoryName = document.getElementById("category-name")
    categoryName.innerText = searchBar.value
}
// Display search results in the DOM
function appendSearchResults(data) {
    if(data.meals !== null){  
        const meals = data.meals
        meals.forEach(meal => {
            searchResult.innerHTML  += `<div class="recipe">
            <img class="recipe-thumb" src=${meal.strMealThumb}>
            <p>${meal.strMeal}</p>
        </div>`
        })
    }
}
