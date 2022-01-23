const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalise(str){
    return str[0].toUpperCase() + str.slice(1);
}
//? Fonction asynchrone
async function main(withIP = true){
   

    let ville;

    if(withIP){

        //! 1) Chopper l'IP de la page qui ouvre le lien    
        //? Appel de mon API/ Await attend effectuer la fonction pour faire la suivante
        const ip = await fetch('https://api.ipify.org?format=json') 
        //? transformer le  resultat en json
        .then(resultat => resultat.json())
        //? Recuperation de mon IP
        .then(json => json.ip);
    
    
        //! 2) Chopper la ville grace a l'adresse IP
        //? Appel de mon API avec utilisation de l'ip/ Await attend effectuer la fonction pour faire la suivante
        ville = await fetch('http://ip-api.com/json/' + ip)
        //? transformer le  resultat en json
        .then(resultat => resultat.json())
        .then(json => json.city);
    
    }else {
        ville = document.querySelector('#ville').textContent
    }
    //! 3) Chopper les infos meteo de la ville
    //? Appel de mon API pour voir le temp dans la ville/ Await attend effectuer la fonction pour faire la suivante
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&lang=frunits=metric`)
    //? transformer le  resultat en json
    .then(resultat => resultat.json())
    //? Recuperation de la meteo
    .then(json => json)

     

    //!) Afficher les informations 
    displayWeatherInfos(meteo)
}
//!) Afficher les informations 
function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalise(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
}

//!) Rendre la ville editable
const ville = document.querySelector('#ville');

ville.addEventListener('click', () => {
    ville.contentEditable = true;
})
ville.addEventListener('keydown', (e) => {
    if(e.keyCode === 13 ){
        e.preventDefault();
        ville.contentEditable = false;
        main(false);

    }
})


main();