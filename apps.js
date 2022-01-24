

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
    const meteo = await fetch(`http://api.weatherstack.com/current?access_key=710a5ea8d04a151e67f1208874f1992a&query=${ville}`)
    //? transformer le  resultat en json
    .then(resultat => resultat.json())
    //? Recuperation de la meteo
    .then(json => json);

     

    //!) Afficher les informations 
    displayWeatherInfos(meteo)
}
//!) Afficher les informations 
function displayWeatherInfos(data){
    // console.log(data);
    const name = data.location.name;
    const temperature = data.current.temperature;
    const conditions = data.current.weather_icons[0];
    const description = data.current.weather_descriptions[0];
    // console.log(conditions);

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalise(description);
    document.querySelector('#image').src = conditions;

    document.body.className = description.toLowerCase();
    console.log(description);
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