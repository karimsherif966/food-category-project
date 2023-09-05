

$(document).ready(() => {
     getRandomlyMeals().then(() => {
        $(".loading").fadeOut(2000)
        $("body").css("overflow", "visible")

     })
})



//////////   Functions to display data  //////////


// to display the meals
function displayMeals(responce){
    
    let cartoona=``;
    if(responce.meals===null){
        $(".random").html(``)
    }
    for(var i=0;i<(responce.meals.length>20?20:responce.meals.length);i++){
        cartoona+=`
        <div class="col-md-3 item" id="${responce.meals[i].idMeal}">
        <div class="position-relative overflow-hidden ">
            <div>
                <img src='${responce.meals[i].strMealThumb}'class="w-100 rounded-2">
            </div>
            <div class="position-absolute top-100 h-100 w-100 rounded-2 layer d-flex align-items-center fs-4
             fw-semibold ps-2">
                <p>${responce.meals[i].strMeal}</p>

            </div>
        </div>
    </div>
        
        `
    }
    $(".random").html(cartoona);
    
}

// to display search bar
$(".search").click(()=>{
    $(".random").html(`
     <div>
    <div class="d-flex justify-content-center gap-3 search-content">
        <input type="text" class="form-control text-white searchByName" placeholder="Search by name">
        <input type="text" class="form-control searchByLetter text-white " placeholder="Search by first letter" maxlength="1" >
    </div>
    <div class="row gy-4 search-data pt-4
    ">
           
       
        </div>
    </div>
    `)
    
})

//to display search data
function displaySearchData(){
    let cartoona=``;
    if(responce.meals===null){
        $(".search-data").html(``)
    }
    for(var i=0;i<(responce.meals.length>20?20:responce.meals.length);i++){
        cartoona+=`
        <div class="col-md-3 item" id="${responce.meals[i].idMeal}">
        <div class="position-relative overflow-hidden ">
            <div>
                <img src='${responce.meals[i].strMealThumb}'class="w-100 rounded-2">
            </div>
            <div class="position-absolute top-100 h-100 w-100 rounded-2 layer d-flex align-items-center fs-4
             fw-semibold ps-2">
                <p>${responce.meals[i].strMeal}</p>

            </div>
        </div>
    </div>
        
        `
    }
    $(".search-data").html(cartoona);
}

// function to display the meal details
function displayMealDetails(responce){

    // to get the tags according to it's number in the api
    function getTags(tags){
        if(tags===null){
            return ` `
        }
        else{
        let text= tags;
        let tagsArr= text.split(",");
        let tagsTxt=``;
        for(let i=0;i<tagsArr.length;i++){
            tagsTxt+=`
            <button class="bg-warning rounded-3 border-0 mb-3 me-2">${tagsArr[i]}</button>
            `
        }
       
        return tagsTxt;
    }
    }

    // to get the Recipes according to it's number in the api
    function getRecipes(meal){
        let cartoona=``
       
     for(let i=1;i<21;i++){
        let recipeAmount= meal['strMeasure' + i];
       
        if(recipeAmount===""||recipeAmount===" "){
            break;
        }
        
        let recipeIngerdient= meal['strIngredient'+i];
        let recipe=recipeAmount+" "+recipeIngerdient;
        
        cartoona+=` <button class="bg-info rounded-3 border-0 mb-3 me-2">${recipe}</button> `
     }
     
     return cartoona;
     
     
    }


   
    
let cartoona = ` 
<div class="col-md-4">
            <div>
                <img src="${responce.meals[0].strMealThumb}" class="w-100 rounded-3">
            </div>
            <p class="text-white fs-3 fw-semibold">${responce.meals[0].strMeal}</p>
            </div>
            <div class="col-md-8 text-white meal-details">
                <h3>Instructions</h3>
                <p class="instructions">${responce.meals[0].strInstructions}</p>
                <h4>Area : ${responce.meals[0].strArea} </h4>
                <h4>Category : ${responce.meals[0].strCategory} </h4>
                <h5>Recipes :</h5>
                ${getRecipes(responce.meals[0])}
                 
                <h5>Tags :</h5>
                ${getTags(responce.meals[0].strTags)}
                
                
                <div class="mt-3">
                    <button class=" rounded-3 border-0 mb-3 me-2 source-btn text-white p-2"><a href="${responce.meals[0].strSource}" target="_blank" class="text-white text-decoration-none">Source</a></button>
                    <button class=" rounded-3 border-0 mb-3 me-2 youtube-btn  p-2"><a href="${responce.meals[0].strYoutube}" target="_blank" class="text-white text-decoration-none">Youtube</a></button>

                </div>

            </div>
           `
           $(".random").html(cartoona)
}
// function to display meal categories
function displayMealCategories(responce){
    let cartoona=``;
    function getCategoryDescription(CategoryDescription){
        if(CategoryDescription.indexOf(".")<200){
        return CategoryDescription.slice(0,CategoryDescription.indexOf("."))
        }
        else{
            return CategoryDescription.slice(0,200)
        }

    }

    
    for(var i=0;i<responce.categories.length;i++){
        cartoona+=`
        <div class="col-md-3 category-item" id="${responce.categories[i].strCategory}">
        <div class="position-relative overflow-hidden ">
            <div>
                <img src='${responce.categories[i].strCategoryThumb}'class="w-100 rounded-2">
            </div>
            <div class="position-absolute top-100 h-100 w-100 rounded-2 layer text-center fw-semibold ps-2">
                <p class="fs-5 mb-0">${responce.categories[i].strCategory}</p>
                <p class=" fs-6 mt-0 categories-text">${getCategoryDescription(responce.categories[i].strCategoryDescription)}</p>

            </div>
        </div>
    </div>
        
        `
    }
    $(".random").html(cartoona);


}

//function to display meal area
function displayMealArea(responce){
    let cartoona=``;
    for(let i=0;i<responce.meals.length;i++){
      cartoona+= `
      <div class="col-md-3 area-item" id="${responce.meals[i].strArea}">
                  <div class="text-center text-white area-content cursor">
                      <i class="fa-solid fa-house-laptop"></i>
                      <p>${responce.meals[i].strArea}</p>
  
                  </div>
              </div>
      
      `
    }
    $(".random").html(cartoona);
  
  }

//function to display meal ingredients
function displayMealIngredients(responce){
    
    function getIngredientDescription(ingredientDescription){
            return ingredientDescription.slice(0,ingredientDescription.indexOf("."))
    }
    let cartoona=``;

    for(let i=0;i<25;i++){
        cartoona+=` 
        <div class="col-md-3 ingredient-content cursor" id="${responce.meals[i].strIngredient}">
        <div class="text-center text-white">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h4>${responce.meals[i].strIngredient}</h4>
            <p>${getIngredientDescription(responce.meals[i].strDescription)}</p>

        </div>
    </div>
        `
    }
   $(".random").html(cartoona)
   
}

//function to display inputs
function displayInputs(){
    $(".random").html(` 
    <div class="inputs-row"></div> 
    <div class="col-md-6">
    <input type="text" class="form-control" placeholder="Enter your name" id="name">
        <div class=" error rounded-3 text-center d-none" id="name-alert">
            <p>Special characters and numbers not allowed</p>
        </div>
        </div>

   <div class="col-md-6">
    <input type="email" class="form-control" placeholder="Enter your email" id="email">
        <div class=" error rounded-3 text-center  d-none" id="email-alert">
            <p>Email not valid *exemple@yyy.zzz</p>
        </div>
   </div>
   <div class="col-md-6">
    <input type="text" class="form-control" placeholder="Enter your phone" id="phone">
    <div class=" error rounded-3 text-center d-none" id="phone-alert">
        <p>Enter valid Phone Number</p>
    </div>
   </div>
   <div class="col-md-6">
    <input type="number" class="form-control" placeholder="Enter your age" id="age">
    <div class=" error rounded-3 text-center  d-none" id="age-alert">
        <p>Enter valid age</p>
    </div>
   </div>
   <div class="col-md-6">
    <input type="password" class="form-control" placeholder="Enter your password" id="password">
    <div class=" error rounded-3 text-center  d-none" id="password-alert" >
        <p>Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
    </div>
   </div>
   <div class="col-md-6">
    <input type="password" class="form-control" placeholder="Repassword" id="repassword">
    <div class=" error rounded-3 text-center  d-none" id="repassword-alert">
        <p>Enter valid repassword</p>
    </div>
   </div>
   <button class="btn btn-outline-danger d-block m-auto mt-3 w-10" id="submit-btn">Submit</button>
            
    ` ) 
    let name=document.getElementById("name");
    let email= document.getElementById("email");
    let phone= document.getElementById("phone");
    let age= document.getElementById("age");
    let password = document.getElementById("password");
    let repassword = document.getElementById("repassword")
    let submitBtn = document.getElementById("submit-btn")
    
    function validateName(){
        let nameRGEX=/^[a-zA-Z ]{3,}$/;
        if(nameRGEX.test(name.value)==true){
            document.getElementById("name-alert").classList.replace("d-block","d-none");
            return true;
        }
        else{
            document.getElementById("name-alert").classList.replace("d-none","d-block")
            return false;
        }


    }
    function validateEmail(){
        let emailRGEX= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(emailRGEX.test(email.value)==true){
            document.getElementById("email-alert").classList.replace("d-block","d-none")
            return true;
        }
        else{
            document.getElementById("email-alert").classList.replace("d-none","d-block")
            return false;
        }


    }

    function validatePhone(){
        let phoneRGEX=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if(phoneRGEX.test(phone.value)==true){
            document.getElementById("phone-alert").classList.replace("d-block","d-none")
            return true;
        }
        else{
            document.getElementById("phone-alert").classList.replace("d-none","d-block")
            return false
        }

    }

    function validateAge(){
        let ageRGEX=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/ ;
        if(ageRGEX.test(age.value)==true){
            document.getElementById("age-alert").classList.replace("d-block","d-none")
            return true;
        }
        else{
            document.getElementById("age-alert").classList.replace("d-none","d-block")
            return false;
        }

    }
    function validatePassword(){
        let passwordRGEX=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
        if(passwordRGEX.test(password.value)==true){
            document.getElementById("password-alert").classList.replace("d-block","d-none")
            return true;
        }
        else{
            document.getElementById("password-alert").classList.replace("d-none","d-block")
            return false
        }

    }

    function validateRepassword(){
        if(repassword.value===password.value){
            document.getElementById("repassword-alert").classList.replace("d-block","d-none")
            return true
        }
        else{
            document.getElementById("repassword-alert").classList.replace("d-none","d-block")
            return false
        }
    }


    name.addEventListener("keyup",validateName)
    email.addEventListener("keyup",validateEmail)
    phone.addEventListener("keyup",validatePhone)
    age.addEventListener("keyup",validateAge)
    password.addEventListener("keyup",validatePassword)
    repassword.addEventListener("keyup",validateRepassword)

    
   

      








    
}
$(".contact").click(displayInputs)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////   Nav bar   //////////

// determine nav bar width
let navWidth = $(".nav-content").outerWidth(true);

// function to close nav bar
function closeNavbar(){
    $("nav").animate({left: -navWidth});
    $(".close").addClass("fa-bars");
    $(".close").removeClass("fa-xmark");
}

//calling the function to close the nav bar when the user open the website
closeNavbar()

// to close and open the nav bar when the user click on it
$(".close").click( ()=> { 
    if (  $("nav").css("left")=='0px'  ){
      //close
      closeNavbar()
      
    }
    else{
        //open
        $("nav").animate({left: '0px'});
        $(".close").addClass("fa-xmark");
        $(".close").removeClass("fa-bars");
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////   Home   //////////

//function to get randomly meals at the start of the website 
async function getRandomlyMeals (){
    responce = await fetch ('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    responce = await responce.json();
    displayMeals(responce);
    
}
// to call the search api at the start of the website
// getRandomlyMeals ()
$("main").on("click",".item",getMealDetails)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////   Search  //////////

//function to search meal by name
async function searchByName(){
    const searchValue = $(this).val();
     responce = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
     responce = await responce.json();
     displaySearchData(responce); 
}
$('main').on("keyup",".searchByName",searchByName)

//function to search meal by first letter
async function searchByLetter(){
    const searchValue = $(this).val();
     responce = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
     responce = await responce.json();
     displaySearchData(responce); 
}
$('main').on("keyup",".searchByLetter",searchByLetter)

// function to get meal details when click on it
async function getMealDetails(){
    let id = $(this).attr("id");
    responce = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    responce = await responce.json();
    displayMealDetails(responce)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////   Categories  //////////

//function to get meal categories
async function getMealsCategories(){
    responce = await fetch ("https://www.themealdb.com/api/json/v1/1/categories.php");
    responce = await responce.json();
    console.log (responce);
    displayMealCategories(responce);
}
$(".categories").click(getMealsCategories)

//function to get all meals of the selected category
async function getCategoryMeals(){
    let id = $(this).attr("id");
    responce = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
    responce = await responce.json();
    displayMeals(responce)
    console.log(responce)
    
}
$("main").on("click",".category-item",getCategoryMeals)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////   Area  //////////
//function to get meal area
async function getMealsArea(){
    responce = await fetch ("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    responce = await responce.json();
    displayMealArea(responce)
}
$(".area").click(getMealsArea)

//function to get all meals of the selected area
async function getAreaMeals(){
    let id = $(this).attr("id");
    responce = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
    responce = await responce.json();
    displayMeals(responce)
    
    
}
$("main").on("click",".area-item",getAreaMeals)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////   Ingredients  //////////

//function to get meal ingredients
async function getMealsIngredients(){
    responce = await fetch ("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    responce = await responce.json();
    displayMealIngredients(responce)
    
}
$(".ingredients").click(getMealsIngredients)

//function to get all meals of the selected ingredient
async function getIngredientMeals(){
    let id = $(this).attr("id");
    responce = await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`)
    responce = await responce.json();
    displayMeals(responce)
    console.log(responce)
}
$("main").on("click",".ingredient-content",getIngredientMeals)
//////////////////////////////////////////////////////////////////////////////////

//////////   Validation  //////////

//function to validate name
function nameValidation(){

}












































  
  







