const KEY = "1bd229957e2f8e7405c3d49715e9562c";
let searchText = "frog";
let nummer = 0;
const input2 = document.querySelector(".input2");
const radio = document.querySelectorAll("input[type=radio]");

//Vi söker endast på 1foto per sida och 1 sida

const btn = document.querySelector("button");

btn.addEventListener("click", function (event) {
  clearImages();

  const input = document.querySelector("input");
  const input2 = document.querySelector(".input2");

  nummer = input2.value;

  searchText = input.value;
  console.log(searchText);
  const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&sort=relevance&text=${searchText}&format=json&nojsoncallback=1&per_page=${nummer}&page=1`;
  fetch(url).then(fetchCallBack).then(handleData).catch(catchError);
});

function fetchCallBack(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    throw "Something went wrong. :(";
  }
}

function handleData(data) {
  let storlek = "";
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked === true) {
      console.log(radio[i].value);
      storlek = radio[i].value;
      break;
    }
  }

  console.log(data);
  console.log(data.photos.photo[0]);
  for (let i = 0; i < nummer; i++) {
    getImageUrl(data.photos.photo[i], storlek);
  }
}

function catchError(error) {
  alert("Du måste fylla i textfältet för att söka");
  console.log(error);
}

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject, s) {
  let photo = photoObject;

  let size = s;

  let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

  console.log(imgUrl);

  displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url) {
  let img = document.createElement("img");
  img.src = url;
  console.log(nummer);

  document.body.appendChild(img);
}
function clearImages() {
  const images = document.querySelectorAll("img");
  for (const img of images) {
    img.remove();
  }
}
