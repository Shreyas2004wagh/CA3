
//for random meal

let mealName = document.querySelectorAll("#meal-name")
let mealThumbnail = document.querySelector("#meal-thumbnail")
let mealIng = document.getElementById("meal-ing")

// for navbar and search results

let form = document.getElementsByTagName("form")[0]
let searchResult = document.getElementById("search-result")
let searchBar = document.getElementById("search-bar")
let searchTitle = document.getElementById("search-title")
let message = document.getElementById("title-message")

//for modal

let modal = document.getElementById("modal")
let allIng = document.getElementById("allingredients")
let closeBtn = document.getElementById("closeBtn")
let modalBtn = document.getElementById("modalBtn")
let body = document.getElementsByTagName("body")[0]
let modalThumbnail = document.getElementById("image")

//open modal

modalBtn.addEventListener("click", () => {
    modal.classList.toggle("pop-up")
    
})

//close modal

closeBtn.addEventListener("click", () => {
    modal.classList.toggle("pop-up")
})

function getRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            appendRandomMeal(data) //to append the received data
        })
        .catch((err) => console.log(err))
}

getRandomMeal()

function appendRandomMeal(data) {

    const meal = data.meals[0]

    mealName.forEach((name) => {
        name.innerHTML = meal.strMeal
    })

    mealThumbnail.src = meal.strMealThumb
    modalThumbnail.src = meal.strMealThumb
    
    for(let i = 1;i <= 5;i++){
        const ingredient = `strIngredient${i}`
        const measure = `strMeasure${i}`
        if (meal[ingredient] && meal[measure]){
            let li = document.createElement("li")
            li.innerText = `${meal[ingredient]},${meal[measure]}`
            mealIng.append(li)
        } else{
            break // to stop when there are no more ingredients
        }
    }

    mealIng.lastChild.innerText += "..." // to show there are more ingredients

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


// call the function when user searches

form.addEventListener("submit", (event) => {
    getResults()

    return false;
})



function getResults() {
    
    searchResult.innerHTML = "" // to refresh search content
    const searchItem = searchBar.value
    searchTitle.style.visibility = "visible"
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchItem}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        appendSearchResults(data)
    })
    .catch((err) => console.log(err))

    const categoryName = document.getElementById("category-name")
    categoryName.innerText = searchBar.value
}


function appendSearchResults(data) {
    if(data.meals !== null){  
        const meals = data.meals
        meals.forEach(meal => {
            searchResult.innerHTML  += `<div class="recipe">
            <img class="recipe-thumb" src=${meal.strMealThumb} alt="">
            <p>${meal.strMeal}</p>
        </div>`
        })
    } else { 
        searchResult.innerHTML += `<p id=no-result>Nothing found<p>`
    }
}
