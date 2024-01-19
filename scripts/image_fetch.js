// This event listener ensures that the code will only run after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fetch-weather")
    .addEventListener("click", function () {
        var cityName = document.getElementById("city-input").value; 
      const apiKey = "FxMfyKdXQ2NE4E1dTt0rjCapbSLXwK0zqFiaCtEafXX84iQeGOWcyEOY";
      const url = `https://api.pexels.com/v1/search?query=${cityName}+query&per_page=1`;


      fetch(url, {
        headers: {
          Authorization: `${apiKey}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {

          const imageUrl = data.photos[0].src.original;

          //document.body.style.backgroundImage = `url(${imageUrl})`;
          document.querySelector('.weather-panel').style.backgroundImage = `url(${imageUrl})`;

        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });


    });
});
