fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
    })


const foodList = document.querySelector(".foodList");


// Create HTML elements
const displayFoodName = (title) => {
    return `<h1>${title}</h1>`
}
const displayFoodType = (title) => {
    return `<section>${title}</section>`
}
const displayFoodEthnicity = (title) => {
    return `<section>${title}</section>`
}


// Function that calls functions above to create entire HTML structure for each food entry
const renderFoodItem = (name, type, ethnicity) => `
    <div class="foodItemContainer">
        ${displayFoodName(name, "name")}
        ${displayFoodType(type, "type")}
        ${displayFoodEthnicity(ethnicity, "ethnicity")}
    </div>
`


fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        // parsedFoods.forEach(food => {
        //     foodList.innerHTML += renderFoodItem(food)
        // });
        for (let i = 0; i < parsedFoods.length; i++) {
            foodList.innerHTML += renderFoodItem(parsedFoods[i].name, parsedFoods[i].type, parsedFoods[i].ethnicity);
        };
    });

    

// Your job is to query the Open Food Facts API for each of your products, and list the following additional information:
// Ingredients
// Country of origin
// Calories per serving
// Fat per serving
// Sugar per serving

fetch("https://world.openfoodfacts.org/api/v0/product/0011150479547.json")
    .then(response => response.json())
    .then(productInfo => {
        // Use it here
    })