// This event listener ensures that the code will only run after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fetch-weather")
    .addEventListener("click", function () {
      // Get the   value from the input
      var favouriteButton = document.getElementById("favorite-button");
      var cityName = document.getElementById("city-input").value;
      var weatherDisplay = document.getElementById("root");
      var searchContainer = document.querySelector(".search-container");
      var weatherContainer = document.querySelector(".main-container");
           // Set up your API key and URL
      var apiKey = "bb8b4e7ce43a4879973194206241301"; // Replace with your actual API key
     /* var url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        cityName
      )}&aqi=no`;*/
      var url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
        cityName
      )}&days=5&aqi=no&alerts=no`;
      

      // Show a loading indicator here, if you have one

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Hide the loading indicator here

          // Extract the data you want to display
          var temp = data.current.temp_c;
          var condition = data.current.condition.text;
          var wind = data.current.wind_kph;
          var humidty = data.current.humidity;
          var felt_temp = data.current.feelslike_c;
          var last_updated = data.current.last_updated;
          var tempTomorrow = data.forecast;

          if (
            data.forecast &&
            data.forecast.forecastday &&
            data.forecast.forecastday.length > 1
          ) {
            // Start loop from index 1 to skip the first element (today's forecast)
            for (let i = 1; i < data.forecast.forecastday.length; i++) {
              let forecastDay = data.forecast.forecastday[i];
              let date = forecastDay.date;
              let maxTemp = forecastDay.day.maxtemp_c;
              let minTemp = forecastDay.day.mintemp_c;
              let cond = forecastDay.day.condition.text;
              // Log the max and min temperature for each upcoming day

              document.querySelector(`.day${i}`).innerHTML = `
                <center  style="margin: 2px;">${date}</center>
                <br>
                <center  style="margin: 2px;">${maxTemp}°C/${minTemp}°C</center>
                <br>
                <center style="margin: 2px;">${cond}</center>
        

                `;
              console.log(
                `Forecast for ${date}: Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C`
              );
              // Here you could also update the DOM or create elements to display the forecast
            }
          } else {
            // Handle case where forecast data may not be available
            console.log("Forecast data is not available");
          }

          document.querySelector(".location").innerHTML = `
                <center><span>Location: ${cityName}</span></center>
                `;
          document.querySelector(".temperature").innerHTML = `
                <center><span>Temperature: ${temp}°C</span>
                <br></br>
                <small>Feels like: ${felt_temp}°C</small></center>
                `;
          document.querySelector(".condition").innerHTML = `
                    <p>Condition: ${condition}</p>
                `;

          document.querySelector(".wind").innerHTML = `
                <p>Wind: ${wind} km/h<p>
                `;
          document.querySelector(".humidity").innerHTML = `
                <p>Humidity: ${humidty} %<p>
                `;
          document.querySelector(".update").innerHTML = `
                <center><span>Last updated: ${last_updated}</span></center>
                `;
 

          searchContainer.classList.add("move-to-top");
          weatherDisplay.classList.add("fade-in");
          weatherContainer.classList.add("fade-in");
          favouriteButton.style.opacity = "1";
          favouriteButton.classList.add("fade-in");
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);

          // Hide the loading indicator here and display error message, if you have a setup for it
        });
    });
});
