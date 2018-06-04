//declare variables and select elements
var ROOT_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
var API_KEY = 'b340bd58fb0de3c76557c03df1121089'
//grab the cityTitle, zip input bar, weather div, img with class
// icon,span with class temp,span 

var title = document.querySelector('.cityTitle')
var zip = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var icon = document.querySelector('.icon')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var deg = document.querySelector('.deg')
var convertbtn = document.querySelector('.convert')
var fc

var icons = {
    "Clouds": "img/cloudy.png",
    "Rain" : "img/rain.png",
    "Snow" : "img/snow.png",
    "Clear": "img/sun.png",
    "Thunderstorm" : "img/thunderstorm.png", //30009
    
}


// define functions
function iconSelector(weather){
    return icons[weather]
    //icons[Clouds]
}

function celsiusToFaren(celsius){
    return Math.round((celsius * 9/5) + 32)
}

function farenToCelsius(faren){
    return Math.round((faren - 32) * (5/9))
}

function kelvinToFaren(kelvin){
    return Math.round(kelvin * 9/5 - 459.67)
}

function getWeather(zipCode){
    console.log(zipCode)
    $.ajax({
        type: 'GET',
        url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,//THE PLACE THAT YOUR ARE TRAIN TO SEND THIS OBJECT
        dataType: 'json',
        success: function(data){
            console.log(data)
            title.textContent = data.name
            weather.textContent = data.weather[0].main
            icon.src = iconSelector(data.weather[0].main)
            temp.textContent = kelvinToFaren(data.main.temp)
            humid.textContent = data.main.humidity
            fc = "f"
        },
        error: function(error){
            console.log("There was an error")
        }
    })
}

getWeather('33166')

//call fucntion and/or add event listeners
zip.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        getWeather(zip.value)
    }
})

convertbtn.addEventListener('click',function(event){
    if(fc === "f"){
        temp.textContent = farenToCelsius(temp.textContent)
        deg.innerHTML = "&deg; C"
        convertbtn.textContent = "Convert to &deg; F"
        fc = "c"
        
    }else{
        temp.textContent = celsiusToFaren(temp.textContent)
        deg.innerHTML = "&deg; F"
        convertbtn.textContent = "Convert to &deg; C"
        fc = "f"
    }
})