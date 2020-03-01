var imageIdx = []
var possibleWords = ["dogs", "cats", "mice", "birds", "horses", "boats", "sky", "food"]
let randIdx = Math.floor(Math.random() * 100 % 8);

function getRandoms(){
  imageIdx = [];
  var holder;
  for(var i = 0; i < 4; i++){
    holder = Math.floor((Math.random() * 100) % 20);
    while(true){
      if(!imageIdx.includes(holder)){
        imageIdx.push(holder);
        break;
      }
      holder++;
    }
  }
}

function addImages(info){
  getRandoms();
  $("#warningMes").hide();
  try{
    $(".imgLocations").html(`<div class="singleImg"><p>Likes: ${info.hits[imageIdx[0]].likes}</p><img src="${info.hits[imageIdx[0]].webformatURL}" alt="Image 1"/></div>`)
    for(var i = 1; i < 4; i++){
      $(".imgLocations").append(`<div class="singleImg"><p>Likes: ${info.hits[imageIdx[i]].likes}</p><img src="${info.hits[imageIdx[i]].webformatURL}" alt="Image ${i + 1}"/></div>`)
    }
  }
  catch{
    $("#warningMes").show();
  }
}

$.ajax({
  method: "GET",
  url: "https://pixabay.com/api/",
  dataType: "json",
  data: {
    "key" : "15429610-7c7e67a62a906a936656b0a75",
    "q" : possibleWords[randIdx],
    "orientation" : "horizontal",
    "safesearch" : "true"
  },
  success: function(data){-
    addImages(data);
  },
  error: function(error){
    console.log(error);
  }
})

function getPics() {
  $.ajax({
    method: "GET",
    url: "https://pixabay.com/api/",
    dataType: "json",
    data: {
      "key" : "15429610-7c7e67a62a906a936656b0a75",
      "q" : $("#searchTerms").val().replace(/ /g, "+"),
      "orientation" : $("#chosenOrientation").val(),
      "safesearch" : "true"
    },
    success: function(data){
      console.log($("#searchTerms").val().replace(/ /g, "+"));
      addImages(data);
    },
    error: function(error){
      console.log(error);
    }
  })
}
