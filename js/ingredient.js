
export class Ingredient {
  constructor(){
    this.getIngredientFromAPI();
    this.runSection();
  }
  // ! ====  HIDE OTHER SECTIONS AND SHOW THIS  ==== ! \\
  runSection(){
    $("#ingredient").siblings().fadeOut(100);
    $("#ingredient").fadeIn(400);
}
  // ! ====  CALL API FOR GET INGREDIENTS  ==== ! \\
  async getIngredientFromAPI(){
    $(".loading-page").removeClass("d-none");
    const requestIng = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    this.responseIng = await requestIng.json();
    this.displayIngredient(this.responseIng.meals);


  }
  // ! ====== DISPLAY INGREDIENTS ======= ! \\
  displayIngredient(data){
      let Ing = '';
      for (let i = 0; i < data.length; i++) {
        if (i < 25) {
          Ing += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 cur-pointer boxIng">
          <div class="px-10 text-white text-center">
          <i class="fas fa-drumstick-bite fs-6rem"></i>
          <div class="infoIng p-2">
            <h3>${data[i].strIngredient}</h3>
            <p>${data[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
          </div>
          </div>
        </div>
          `
          $("#ingredients .row").html(Ing)
        };
    };
    $(".loading-page").addClass("d-none");
    document.querySelectorAll(".boxIng").forEach(box=>{
      box.addEventListener("click",()=>{
        let IngVal = box.querySelector("h3").innerHTML.toLocaleLowerCase();
        this.getDataOfIngredient(IngVal);
        $("#ingredients").fadeOut(100);
        $("#ingredientsData").fadeIn(400);
        $(".backIng").fadeIn(400);
    });

    });

    
  }
  // ! ====  TAKE A INGREDIENT TO CALL API FOR GET DATA BY INGREDIENTS  ==== ! \\
  async getDataOfIngredient(Ing){
    $(".loading-page").removeClass("d-none");
    const requestIngVal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ing}`);
    this.responseIngVal = await requestIngVal.json();
    this.displayIngredientValues(this.responseIngVal.meals);

  }
  // ! ====  DISPLAY MEALS OF INGREDIENT  ==== ! \\
  displayIngredientValues(data){
    let box = '';
    for (let i = 0; i < data.length; i++) {
      box += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 cur-pointer IngBox box" data-id="${data[i].idMeal}">
      <div class="px-10 text-white text-center">
        <img src="${data[i].strMealThumb}" class="rounded">
        <div class="info px-2 text-black rounded">
          <h3>${data[i].strMeal}</h3>
        </div>
      </div>
      </div>
      `;
    };

    $("#ingredientsData .row").html(box);
    $(".loading-page").addClass("d-none");
        document.querySelectorAll("#ingredientsData .row .IngBox").forEach((box)=>{
        box.addEventListener("click",()=>{
          $("#ingredientsData").fadeOut(100);
          $("#ingredientDetails").fadeIn(400);
          this.getIngDetails(box.dataset.id);
        })
    })
    $(".backIng").click(()=>{
      $("#ingredientsData").fadeOut(100);
      $("#ingredients").fadeIn(400);
    })
    $("#Ingredients").click(()=>{
      $("#ingredientDetails").fadeOut(100);
      $("#ingredientsData").fadeOut(100);
      $("#ingredients").fadeIn(400);
    })
  }
  // ! ====  GET DETAILS OF MEALS  ==== ! \\
  async getIngDetails(id){
    $(".loading-page").removeClass("d-none");
    const requestIngDetails = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    this.responseIngDetails = await requestIngDetails.json();
    this.displayIngDetails(this.responseIngDetails.meals);

  }
  // ! ====  DISPLAY DETAILS OF MEALS  ==== ! \\
  displayIngDetails(data){
    let tags = [];
    let tagsStr = '';
    let details = '';
    for (let i = 0; i < data.length; i++) {
      tags.push(data[i].strTags?.split(","));
      for (let index = 0; index < tags.length; index++) {
          if (tags.length == 0 || tags[index] == undefined) {

          }
          else {
            tags[index].map((tag)=>{
              tagsStr += `<div class="alert alert-danger px- py-1">${tag}</div>`;
            });
          };
      };
      details += `
      <div class="d-flex justify-content-end">
        <i class="fas fa-xmark fs-3 btn btn-dark justify-content-end" id="closeIng"></i>
      </div>
      <div class="col-12 col-lg-4">
      <div class="img text-white">
      <img src="${data[i].strMealThumb}" class="rounded img-fluid" alt="">
      <div class="name fs-3">${data[i].strMeal}</div>
      </div>
      </div>
      <div class="col-12 col-lg-8">
      <div class="info text-white">
      <p class="title fw-bold fs-3">Instrauctions</p>
      <p class="instrauctions">${data[i].strInstructions}}</p>
      <p class="fw-bold fs-3">Area: <span class="area fw-normal">${data[i].strArea}</span></p>
      <p class="fw-bold fs-3">Category: <span class="category fw-normal">${data[i].strCategory}</span></p>
      <div><p class="fw-bold fs-3 d-block">Recipes: </p>
      <div class="recipes d-flex flex-wrap mb-4">
      <div class="recipes d-flex flex-wrap mb-4">
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient1}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient2}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient3}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient4}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient5}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient6}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient7}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient8}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient9}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient10}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient11}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient12}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient13}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient14}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient15}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient16}</div>
      <div class="mt-3 alert py-1 px-3 alert-info me-3 rounded">${data[i].strIngredient17}</div>
      </div>
      </div>
      </div>
      <div><p class="fs-3 fw-bold d-block">Tags: </p><div class="d-flex gap-3 flex-wrap">${tagsStr}</div><div class="d-flex gap-1">
      <div class="d-flex gap-2 flex-wrap">
      <a href="${data[i].strSource}" target="_blanck" class="btn btn-success">Source</a>
      <a href="${data[i].strYoutube}" target="_blanck" class="btn btn-danger">Youtube</a>
      </div>
      </div></div>
    </div>      
      </div>
      `;
    };
    $("#ingredientDetails .row").html(details);
    let alert = document.querySelectorAll(".alert");
    for (let i = 0; i < alert.length ;i++) {
      if (alert[i].innerHTML.length == 0 || alert[i].innerHTML == "null") {
        alert[i].classList.add("d-none");
      };
    };
    $(".loading-page").addClass("d-none");
      $("#closeIng").click(()=>{
        $("#ingredientDetails").fadeOut(100);
        $("#ingredientsData").fadeIn(400);
      });
      
  };
}