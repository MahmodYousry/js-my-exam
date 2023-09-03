import { Category } from "./category.js";
import { Area } from "./area.js";
import { Ingredient } from "./ingredient.js";
import { Search } from "./search.js";
import { Contact } from "./contact.js";

export class Home {
  constructor(){
    this.slideNav();
    this.instanceOtherClasses();
    this.getDataFromAPI();
    this.runSection();
  }
  // ! ====  IF CLICK ON LOGO RETURN TO HOME PAGE ==== ! \\
  runSection(){
    $(".mainImg").click(()=>{
      $("#home").siblings('section').fadeOut(100);
      $("#home").fadeIn(400);
    })
}
  // ! ====  NAV BAR ANIMATIONS  ==== ! \\
    slideNav(){
    $(".bars").click(()=>{
      $("nav").animate({left: "0"},700);
      $(".bars").addClass("d-none");
      $(".close").removeClass("d-none");
      let LIs = document.querySelectorAll("#sliding li")
      $(LIs).eq(0).delay(600).animate({top:'0px'}, 150,()=>{
        $(LIs).eq(1).animate({top:'40px'}, 120,()=>{
          $(LIs).eq(2).animate({top:'80px'}, 90,()=>{
            $(LIs).eq(3).animate({top:'120px'},60,()=>{
              $(LIs).eq(4).animate({top:'160px'}, 30);
            });
          });
        });
      });
    });

    $(".close").click(()=>{
      this.closeNav();
    });

    $('nav a').click(()=>{
      this.closeNav();
    });

    }
    closeNav(){
      const width = $("nav").innerWidth();
      $("nav").animate({left: `-=${width}`},700);
      $(".close").addClass("d-none");
      $(".bars").removeClass("d-none");
      let LIs = document.querySelectorAll("#sliding li");
      $(LIs).eq(4).delay(50).animate({top:'100%'}, 100,()=>{
        $(LIs).eq(3).delay(50).animate({top:'100%'}, 100,()=>{
          $(LIs).eq(2).delay(50).animate({top:'100%'}, 100,()=>{
            $(LIs).eq(1).delay(50).animate({top:'100%'}, 100,()=>{
              $(LIs).eq(0).delay(50).animate({top:'100%'}, 100)
            });
          });
        });
      });
    }
  // ! ====   INSTANCE OTHER CLASSES   ==== ! \\
    instanceOtherClasses(){
      $("#Categorys").click(()=>{
        new Category();
      });
      $("#Area").click(()=>{
        new Area();
      });
      $("#Ingredients").click(()=>{
        new Ingredient();
      });
      $("#Search").click (()=>{
        new Search();
      });
      $("#Contact").click (()=>{
        new Contact();
      });

    }
  // ! ====  CALL API FOR GET HOME DATA  ==== ! \\
    async getDataFromAPI(){
    $(".loading-page").removeClass("d-none");
      const request = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=`);
      this.response = await request.json();
      this.displayData(this.response.meals);
    }
  // ! ====  DISPLAY DATA OF HOME  ==== ! \\
    displayData(data){
      let box = '';
      for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 cur-pointer homeBox box" data-id="${data[i].idMeal}">
        <div class="px-10 text-white text-center">
          <img src="${data[i].strMealThumb}" class="rounded">
          <div class="info px-2 text-black rounded">
            <h3>${data[i].strMeal}</h3>
          </div>
        </div>
        </div>
        `;
      };
      $("#homeData").html(box);
      document.querySelectorAll("#homeData .homeBox").forEach(box=>{
        box.addEventListener("click",()=>{
          $("#homeData").fadeOut(100);
          $("#homeDetails").fadeIn(400);
          this.getHomeDetails(box.dataset.id);
        });
      });
      $(".loading-page").addClass("d-none");
    }
  // ! ====  CALL API FOR GET MEALS HOME DETAILS  ==== ! \\
    async getHomeDetails(id){
      $(".loading-page").removeClass("d-none");
      let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      this.Request = await response.json();
      this.displayHomeDetails(this.Request.meals);
    }
  // ! ====  DISPLAY MEALS HOME DETAILS  ==== ! \\
    displayHomeDetails (data) {
      let tags = [];
      let tagsStr = '';
      let details = '';
      for (let i = 0; i < data.length; i++) {
        tags.push(data[i].strTags?.split(","))
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
          <i class="fas fa-xmark fs-3 btn btn-dark justify-content-end" id="closeHome"></i>
        </div>
        <div class="img text-white col-12 col-lg-4">
  
          <img src="${data[i].strMealThumb}" class="rounded img-fluid" alt="">
          <div class="name fs-3">${data[i].strMeal}</div>
  
        </div>
        <div class="col-12 col-lg-8">
        <div class="info text-white ">
  
  
          <p class="title fw-bold fs-3">Instrauctions</p>
  
          <p class="instrauctions">${data[i].strInstructions}}</p>
  
          <p class="fw-bold fs-3">Area: <span class="area fw-normal">${data[i].strArea}</span></p>
  
          <p class="fw-bold fs-3">Category: <span class="category fw-normal">${data[i].strCategory}</span></p>
  
          <p class="fw-bold fs-3 d-block">Recipes: </p>
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
          <div><p class="fs-3 fw-bold d-block">Tags: </p><div class="d-flex gap-3 flex-wrap">${tagsStr}</div><div class="d-flex gap-1">
          <div class="d-flex gap-2 flex-wrap">
          <a href="${data[i].strSource}" target="_blanck" class="btn btn-success">Source</a>
          <a href="${data[i].strYoutube}" target="_blanck" class="btn btn-danger">Youtube</a>
          </div>
          </div></div>
        </div>
        </div>`;
      };
      $("#homeDetails").html(details);
      let alert = document.querySelectorAll(".alert");
      for (let i = 0; i < alert.length ;i++) {
        if (alert[i].innerHTML.length == 0 || alert[i].innerHTML == "null") {
          alert[i].classList.add("d-none");
        };
      };
    $('#closeHome').click(()=>{
      $('#homeDetails').fadeOut(100);
      $("#homeData").fadeIn(400);
    });
    $(".loading-page").addClass("d-none");
    }
}
