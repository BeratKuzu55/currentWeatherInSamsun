const express = require("express");
const https = require("https");

const app = express();
app.get("/" , function(req , res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Samsun&units=metric&appid=82261f6d04f0d346722a336111ea5273";
    https.get(url , function(response){
        console.log(response);

        response.on("data" , function(data){
            console.log(data); // bu kod veriyi hexadecimal olarak yazar
            //biz ise veriyi text formatında istiyoruz 
            // bu yüzden 
            const weatherData = JSON.parse(data);
            console.log(weatherData); // bu şekilde yaparız 

            //json içindeki bir veriye ulaşmak
            const temp = weatherData.main.temp;
            console.log(temp);
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(description);

            //sitemize bu bilgiyi göndermek
            //(res.send('<h1> The temperature in Samsun '+temp+' degrees </h1>')
            res.write("<p> The weather is in Samsun currently " + description + "<p>");
            res.write('<h1> The temperature in Samsun '+temp+' degrees </h1>')
            res.write("<img src='" + imgURL + "'>" );
            res.send();
        })
    })
    
})

app.listen(3000 , function(){
    console.log("server is running on port 3000")
})