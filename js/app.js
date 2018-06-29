const upcomingLaunchUrl = `https://api.spacexdata.com/v2/launches/upcoming`;
const latestLaunchUrl = `https://api.spacexdata.com/v2/launches/latest`;
const pastLaunchUrl = `https://api.spacexdata.com/v2/launches`;
let upcomingLaunchData;
let latestLaunchData;
let pastLaunchData;
let type;

let MissionLogo;
let MissionNoLogo = 'https://media.wired.com/photos/5a7cb68fa2d3835392e1b469/1:1/w_1000,c_limit/spacexrocketreturn.jpg'
let Details;
let FlightNumber;
let MissionName;
let RocketName;
let LaunchDate;
let LaunchLoc;
let LandSuccess;
let Success;
let VideoLink;
let Presskit;
let PayloadType;
let PayloadCustomer;
let PayloadOrbit;
let PayloadKG;       

//Set the basic structure for the HTML
const rootDiv = document.getElementById('root');
const logo = document.createElement('img');
logo.className = 'spacex-logo';
logo.src = 'images/SpaceX-Logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'grid');

root.appendChild(logo);
root.appendChild(container);
   
const card = document.createElement('div');
card.setAttribute('class', 'card');

//Invoke the data from the spacexdata api and print to the DOM.
loadingIcon();
upcomingLaunchRequest();
latestLaunchRequest();
pastLaunchRequest();

/**** 
    Upcoming mission data
****/

//Request Upcoming Space X Launch Data
function upcomingLaunchRequest() {
    let upcomingLaunchrequest = new XMLHttpRequest();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', upcomingLaunchUrl);
    xhr.onload = function() {
        if (xhr.status === 200) {
            //Save the data to this variable
            upcomingLaunchData = JSON.parse(xhr.responseText)
            //Log to console just to test and see the data.
            // console.log(upcomingLaunchData);

            return upcomingLaunchData;
        }
        else {
            // Errors display an animated marquee (not in use anymore).
            console.log('Request failed.' + xhr.status);
        }
    };
    xhr.send();
};
// Load upcomingLaunch 1 second after we have recieved the data from the API
setTimeout(upcomingLaunch, 800);

function upcomingLaunch() {
    
    //Upcoming data entries
        //Assign the data into variables
        if (upcomingLaunchData !== undefined) {
            MissionLogo = upcomingLaunchData[0]['links']['mission_patch'];
            MissionNoLogo = 'https://media.wired.com/photos/5a7cb68fa2d3835392e1b469/1:1/w_1000,c_limit/spacexrocketreturn.jpg'
            Details =  upcomingLaunchData[0]['details'];
            FlightNumber = upcomingLaunchData[0]['flight_number'];
            MissionName = upcomingLaunchData[0]['mission_name'];
            RocketName = upcomingLaunchData[0]['rocket']['rocket_name'];
            LaunchDate = upcomingLaunchData[0]['launch_date_unix'];
            LaunchLoc = upcomingLaunchData[0]['launch_site']['site_name_long'];
            LandSuccess = upcomingLaunchData[0]['rocket']['first_stage']['cores'][0]['land_success'];
            Success = upcomingLaunchData[0]['launch_success'];
            VideoLink = upcomingLaunchData[0]['links']['video_link'];
            Presskit = upcomingLaunchData[0]['links']['presskit'];
            PayloadType = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['payload_type'];
            PayloadCustomer = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['customers'];
            PayloadOrbit = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['orbit'];
            PayloadKG = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['payload_mass_kg'];         
        
            // Time Converter
            gbTime = timeConverter(LaunchDate);
            
            //Generate HTML Card
            type = 'Upcoming';
            generateHtmlCard(type);

        } else {
            generateHtmlCardError();
        }
};   

/**** 
    Latest mission data
****/

//Request Latest Space X Launch Data
function latestLaunchRequest() {
    let latestLaunchrequest = new XMLHttpRequest();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', latestLaunchUrl);
    xhr.onload = function() {
        if (xhr.status === 200) {
            //Save the data to this variable
            latestLaunchData = JSON.parse(xhr.responseText)
            //Log to console just to test and see the data.
            // console.log(latestLaunchData);

            return latestLaunchData;
        }
        else {
            // Errors display an animated marquee (not in use anymore).
            console.log('Request failed.' + xhr.status);
        }
    };
    xhr.send();
};
// Load latestLaunch 1 second after we have recieved the data from the API
setTimeout(latestLaunch, 800);

function latestLaunch() {
    
    //latest data entries
        //Assign the data into variables
        if (latestLaunchData !== undefined) {
            MissionLogo = latestLaunchData['links']['mission_patch'];  
            Details = latestLaunchData['details'];;
            FlightNumber = latestLaunchData['flight_number'];
            MissionName = latestLaunchData['mission_name'];
            RocketName = latestLaunchData['rocket']['rocket_name'];
            LaunchDate = latestLaunchData['launch_date_unix'];
            LaunchLoc = latestLaunchData['launch_site']['site_name_long'];
            LandSuccess = latestLaunchData['rocket']['first_stage']['cores'][0]['land_success'];
            Success = latestLaunchData['launch_success'];
            VideoLink = latestLaunchData['links']['video_link'];
            Presskit = latestLaunchData['links']['presskit'];
            PayloadType = latestLaunchData['rocket']['second_stage']['payloads'][0]['payload_type'];
            PayloadCustomer = latestLaunchData['rocket']['second_stage']['payloads'][0]['customers'];
            PayloadOrbit = latestLaunchData['rocket']['second_stage']['payloads'][0]['orbit'];
            PayloadKG = latestLaunchData['rocket']['second_stage']['payloads'][0]['payload_mass_kg'];
                  
            // Time Converter
            gbTime = timeConverter(LaunchDate);
            
            // Generate the HTML box
            type = 'Latest';
             generateHtmlCard(type);

        } else {
              generateHtmlCardError();
        }
    
};  
/**** 
    past mission data
****/

//Request past Space X Launch Data
function pastLaunchRequest() {
    let pastLaunchrequest = new XMLHttpRequest();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', pastLaunchUrl);
    xhr.onload = function() {
        if (xhr.status === 200) {
            //Save the data to this variable
            pastLaunchData = JSON.parse(xhr.responseText)
            //Log to console just to test and see the data.
            // console.log(pastLaunchData);

            return pastLaunchData;
        }
        else {
            // Errors display an animated marquee (not in use anymore).
            console.log('Request failed.' + xhr.status);
        }
    };
    xhr.send();
};
// Load pastLaunch 1 second after we have recieved the data from the API
setTimeout(pastLaunch, 800);

function pastLaunch() {
    // Loop through the past data in reverse and skip the latest mission.
    if (pastLaunchData !== undefined) {
        for(let i = pastLaunchData.length -2; i >= 0; i--) {
            MissionLogo = pastLaunchData[i]['links']['mission_patch_small'];  
            Details = pastLaunchData[i]['details'];;
            FlightNumber = pastLaunchData[i]['flight_number'];
            MissionName = pastLaunchData[i]['mission_name'];
            RocketName = pastLaunchData[i]['rocket']['rocket_name'];
            LaunchDate = pastLaunchData[i]['launch_date_unix'];
            LaunchLoc = pastLaunchData[i]['launch_site']['site_name_long'];
            LandSuccess = pastLaunchData[i]['rocket']['first_stage']['cores'][0]['land_success'];
            Success = pastLaunchData[i]['launch_success'];
            VideoLink = pastLaunchData[i]['links']['video_link'];
            Presskit = pastLaunchData[i]['links']['presskit'];
            PayloadType = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['payload_type'];
            PayloadCustomer = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['customers'];
            PayloadOrbit = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['orbit'];
            PayloadKG = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['payload_mass_kg'];
            
            // Time Converter
            gbTime = timeConverter(LaunchDate);
         
            // Generate the HTML box
               type = 'Past';
               generateHtmlCard(type);
        }
            
    } else {
        generateHtmlCardError();
    }
}; 

function timeConverter(apiData){
    // Time Converter
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let newDate = new Date();
    newDate.setTime(apiData * 1000);
    dateStringGB = newDate.toLocaleDateString('en-GB', options);
    time12Hour = newDate.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
    let timeGB = `${dateStringGB} - ${time12Hour}`;
    return timeGB;
}

function generateHtmlCard(type){
        const card = document.createElement('div');
        card.setAttribute('class', 'grid-item');

        const h3 = document.createElement('h3');
        h3.textContent = ` ${type} - ${MissionName}`;

        const img = document.createElement('img');
        if (MissionLogo !== null) {
            img.src = `${MissionLogo}`;
            img.className = `mission-badge`;
        } else {
            img.src = `${MissionNoLogo}`;
            img.className = `no-mission-badge`
        }

        const h4 = document.createElement('h4');
        h4.className = `next-launch`;
    
        //Check the kind of card. If it's past or latest and has the details show details, else show the upcoming time and date.
        if(type === 'Latest' || type === 'Past'){
            if(Details !== null){
                h4.textContent = `${Details}`;
                } else {
                    h4.innerHTML = `Flight No: ${FlightNumber} launched the ${RocketName} on <strong>${dateStringGB}</strong> at <strong>${time12Hour}</strong>`;
                }
        } else {
            h4.innerHTML += `<strong>${MissionName}</strong> will use the <strong>${RocketName}</strong> and launch on <strong>${dateStringGB}</strong> at <strong>${time12Hour}</strong>`;
        }
    
        const ul = document.createElement('ul');
        
        const li = document.createElement('ul');
        ul.innerHTML += `<li><strong>Rocket:</strong> ${RocketName}</li>`;
        ul.innerHTML += `<li><strong>Flight Number:</strong> ${FlightNumber}</li>`;
        ul.innerHTML += `<li><strong>Launch Date:</strong> ${gbTime}</li>`;
        ul.innerHTML += `<li><strong>Location:</strong> ${LaunchLoc}</li>`;
        ul.innerHTML += `<li><strong>Payload Type:</strong> ${PayloadType}</li>`;
        ul.innerHTML += `<li><strong>Customer:</strong> ${PayloadCustomer}</li>`;
        ul.innerHTML += `<li><strong>Orbit:</strong> ${PayloadOrbit}</li>`;
        if(PayloadKG !== null){ 
         ul.innerHTML += `<li><strong>Payload Mass:</strong> ${PayloadKG} kg</li>`;
        }
        
        if(LandSuccess !== null) {    
            ul.innerHTML += `<li><strong>Land Success:</strong> ${LandSuccess}</li>`;
        };
        
        if(Success !== null) { 
            ul.innerHTML += `<li><strong>Launch Success:</strong> ${Success}</li>`;

        };
        
        if(VideoLink !== null) { 
        ul.innerHTML += `<li><a class="btn" href="${VideoLink}" target="_blank"><button>WATCH STREAM</button></a></li>`;
        } else {
            ul.innerHTML += `<li><a class="btn"><button>More soon...</button></a></li>`;

        }

        if (Presskit !== null) {
            ul.innerHTML += `<li><a class="btn" href="${Presskit}" target="_blank"><button>READ PDF</button></a></li>`;
    }

    container.appendChild(card);
    card.appendChild(h3);
    card.appendChild(img);
    card.appendChild(h4);
    card.appendChild(ul);

};

function generateHtmlCardError() {
    const card = document.createElement('div');
    card.setAttribute('class', 'grid-item');

    const h3 = document.createElement('h3');
    h3.textContent = `No data`;

    const img = document.createElement('img');
        img.src = `images/geostationary_orbit.png`;
        img.className = `mission-badge`;


    const h4 = document.createElement('h4');
    h4.className = `next-launch`;
    h4.innerHTML += `<strong>Try later or refresh the page.</strong>`;


container.appendChild(card);
card.appendChild(h3);
card.appendChild(img);
card.appendChild(h4);
}

function loadingIcon() {
    const iconImg = document.createElement('img');
    iconImg.className = 'iconImg';
    iconImg.src = 'images/load_arrow.png';
    root.appendChild(iconImg);

    setTimeout(function(){
        iconImg.style.display = 'none';
    }, 850);
}

setTimeout(gridMasonry, 1200);
    function gridMasonry(){
    return msnry = new Masonry( '.grid', {
        itemSelector: '.grid-item',
        horizontalOrder: true,
        gutter: 20,
        fitWidth: true
    });   
};
