// ? ===================== When Start ====================>>
const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const id = params.get("id");
const mode = document.getElementById("mode");
// console.log(params.get("id"));
let containerDetails = {};


if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme"); // light Or dark

  if (themeData === "light") {
    mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
  } else {
    mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
  }

  document.querySelector("html").setAttribute("data-theme", themeData); // light Or dark
}


(async function () {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "097d9f363cmshacc8e42f33e43f7p1951e9jsn52efddfdc9e6",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
    }
  };
  const api = await fetch(
    ` https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const responsData = await api.json();
  containerDetails = responsData;
  displayDetails();
  // console.log(containerDetails);
})();

function displayDetails() {
  const detailsBox = `
   
   <div class="col-md-4">
   <figure>
      <img src="${containerDetails.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb" class="text-light">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${containerDetails.title}</li>
         </ol>
      </nav>

      <h1>${containerDetails.title}</h1>

      <h3>About ${containerDetails.title}</h3>
      <p>${containerDetails.description}</p>

      
   </div>
</div>

   `;

  document.getElementById("detailsData").innerHTML = detailsBox;

  const backgroundImage = containerDetails.thumbnail.replace(
    "thumbnail",
    "background"
  );

  document.body.style.cssText = `
   background-image:url('${backgroundImage}') ;
   background-size:cover;
   background-position:center; `;
}

mode.addEventListener("click", function (e) {
  if (mode.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

    localStorage.setItem("theme", "light");
  } else {
    mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
    document.querySelector("html").setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});
