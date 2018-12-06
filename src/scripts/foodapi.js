const foodList = document.querySelector(".foodList");

// Create HTML elements
const displayFoodName = (title) => {
    return `<h1>${title}</h1>`;
};
const displayFoodType = (title) => {
    return `<section><strong>Type:</strong> ${title}</section>`;
};
const displayFoodEthnicity = (title) => {
    return `<section><strong>Ethnicity:</strong> ${title}</section>`;
};
const displayFoodIngredients = (title) => {
    return `<section><strong>Ingredients:</strong> ${title}</section>`;
};
const displayCountry = (title) => {
    return `<section><strong>Country of Origin:</strong> ${title}</section>`;
};
const displayCalories= (title) => {
    return `<section><strong>Calories:</strong> ${title}</section>`;
};
const displayFat = (title) => {
    return `<section><strong>Fat:</strong> ${title}</section>`;
};
const displaySugar= (title) => {
    return `<section><strong>Sugar:</strong> ${title}</section>`;
};


// Function that calls functions above to create entire HTML structure for each food entry
const renderFoodItem = (name, type, ethnicity, ingredients, country, calories, fat, sugar) => `
    <div class="foodItemContainer">
        ${displayFoodName(name)}
        ${displayFoodType(type)}
        ${displayFoodEthnicity(ethnicity)}
        ${displayCountry(country, "country")}
        ${displayFoodIngredients(ingredients)}  
        ${displayCalories(calories)}  
        ${displayFat(fat)}    
        ${displaySugar(sugar)}  
    </div>
`;

// Your job is to query the Open Food Facts API for each of your products, and list the following additional information:

// Ingredients - "ingredients_text" or "ingredients_text_debug" or "ingredients_original_tags"
// Country of origin - "countries_hierarchy" or "countries_tags"
// Calories per serving 
// Fat per serving - "nutriments" > "fat"
// Sugar per serving - "nutriments" > "sugars"

// fetch("https://world.openfoodfacts.org/api/v0/product/0011150479547.json")
//     .then(response => response.json())
//     .then(productInfo => {
//         // Use it here
//     }

// fetch("https://world.openfoodfacts.org/api/v0/product/0011150479547.json")
//     .then(response => response.json())
//     .then(productInfo => console.log(productInfo));
//     }

// .then(function(response){
//     response.json();
// })

// Grab barcode to insert into fetch URL > "https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    // Will need to loop through first fetch to grab each barcode and insert into URL
// Grab data 
// Use data in function - e.g. functionName(productInfo);
    // Need to loop through, pull values, and add values to original array.
// Run "renderFoodItem" to add updated arrays to DOM.

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            let barcodeArray = food.barcode;
            fetch(`https://world.openfoodfacts.org/api/v0/product/${barcodeArray}.json`)
                .then(foodDetails => foodDetails.json())
                .then(parsedFoodItem => {
                    // console.log(barcodeArray);
                    // console.table(parsedFoodItem);
                    let ingredients = parsedFoodItem.product.ingredients_text;
                    let country = parsedFoodItem.product.countries;
                    let calories = parsedFoodItem.product.nutriments.energy_serving;
                    let fat = parsedFoodItem.product.nutriments.fat;
                    let sugar = parsedFoodItem.product.nutriments.sugars_serving;
                    foodList.innerHTML += renderFoodItem(food.name, food.type, food.ethnicity, ingredients, country, calories, fat, sugar);
                });
        });
    });




/***************************************** Emily's Method *****************************************/

const foodFactory = (foodObject) => {
    let HTMLfoodSection = `
    <section class="foodItemContainer">
        <h2>${foodObject.name}</h2>
        <p>${foodObject.type}</p>
        <p>${foodObject.ethnicity}</p>
        <p>${foodObject.country}</p>
        <p>${foodObject.ingredients}</p>
        <p>${foodObject.calories}</p>
        <p>${foodObject.sugar}</p>
        <p>${foodObject.fat}</p>
    </section>
    `
    return HTMLfoodSection;
}

const articleContainer = document.querySelector(".foodList2");

const addFoodToDom = (foodHTML) => {
    articleContainer.innerHTML += foodHTML;
};


fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(foodObj => {

            fetch(`https://world.openfoodfacts.org/api/v0/product/${foodObj.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    foodObj.ingredients = productInfo.product.ingredients_text;
                    foodObj.country = productInfo.product.countries;
                    foodObj.sugar = productInfo.product.nutriments.sugars_serving;
                    foodObj.fat = productInfo.product.nutriments.fat;
                    foodObj.calories = productInfo.product.nutriments.energy_serving;
                    const foodAsHTML = foodFactory(foodObj);
                    addFoodToDom(foodAsHTML);
                })
        });
    });




