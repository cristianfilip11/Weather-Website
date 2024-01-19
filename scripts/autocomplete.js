const apiKey = '3851c9eea70f4bc988c0f22c136c26c6';
const cityInput = document.getElementById('city-input');
const cityList = document.getElementById('city-list');

cityInput.addEventListener('input', debounce(searchCities, 300));

function debounce(func, delay) {
    let timeoutId;
    return function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}
//https://api.openweathermap.org/data/2.5/find?q=${inputValue}&type=like&sort=population&cnt=10&appid=${apiKey}
//
/*async function searchCities() {
    const inputValue = cityInput.value.trim();
    if (inputValue.length >= 3) {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=3851c9eea70f4bc988c0f22c136c26c6`);
        const data = await response.json(); 
        displayCities(data.list);
    } else {
        hideCityList();
    }   
}*/

/*async function searchCities() {
    const inputValue = cityInput.value.trim();
    if (inputValue.length >= 3) {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=3851c9eea70f4bc988c0f22c136c26c6`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const data = await response.json();
            displayCities(data.list);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
            hideCityList();
        }
    } else {
        hideCityList();const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=3851c9eea70f4bc988c0f22c136c26c6`);
    }
}*/


async function searchCities() {
    const inputValue = cityInput.value.trim();
    if (inputValue.length >= 3) {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const data = await response.json();
            displayCities(data);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
            hideCityList();
        }
    } else {
        hideCityList();
    }
}

function displayCities(data) {
    cityList.innerHTML = '';

    if (data && data.features && data.features.length > 0) {
        const filteredCities = data.features.filter(city => !/\d/.test(city.properties.formatted));

        filteredCities.forEach(city => {
            const cityName = city.properties.formatted;
            const li = document.createElement('li');
            li.textContent = cityName;
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

function debounce(func, delay) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}