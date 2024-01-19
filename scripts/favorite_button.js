// This event listener ensures that the code will only run after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    
    const cityInput = document.getElementById('city-input');
    const favoriteButton = document.getElementById('favorite-button');
 
    document
      .getElementById("favorite-button")
      .addEventListener("click", function () {
        //console.log("test");
        const cityName = cityInput.value.trim();
        if (cityName ) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.includes(cityName)) {
                favorites.push(cityName);
                localStorage.setItem('favorites', JSON.stringify(favorites));
               
            }
            favoriteButton.style.color = 'red'; // Visual feedback
        }
        
  
      });
      cityInput.addEventListener('input', function () {
        const inputValue = cityInput.value.trim();
        if (inputValue < 3) {
          // Trigger display of favorites if input is empty
          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          displayCities({ features: favorites.map(city => ({ properties: { formatted: city } })) });
          console.log(favorites);
          displayCities(favorites);
        }
      });

      function displayCities(favorites) {
        cityList.innerHTML = '';
    
        if (favorites && favorites.length > 0) {
            //const filteredCities = data.features.filter(city => !/\d/.test(city.properties.formatted));
    
            favorites.forEach(city => {
                //const cityName = city.properties.formatted;
                const li = document.createElement('li');
                li.textContent = city; //Name;
                li.addEventListener('click', () => {
                    cityInput.value = cityName;
                    hideCityList();
                });
                cityList.appendChild(li);
            });
    
            showCityList();
        } else {
            hideCityList();
        }
    }
    
    function showCityList() {
        cityList.style.display = 'block';
    }
    
    function hideCityList() {
        cityList.style.display = 'none';
    }
      
  });
  