const upcomingLaunchUrl = `https://api.spacexdata.com/v2/launches/upcoming`;
const latestLaunchUrl = `https://api.spacexdata.com/v2/launches/latest`;
const pastLaunchUrl = `https://api.spacexdata.com/v2/launches`;
let upcomingLaunchData;

//Set the basic structure for the HTML flexbox
const rootDiv = document.getElementById('root');
const logo = document.createElement('img');
logo.className = 'spacex-logo';
logo.src = 'https://image.ibb.co/c3S5ho/Space_XMission_Data.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

root.appendChild(logo);
root.appendChild(container);

    
const card = document.createElement('div');
card.setAttribute('class', 'card');

//Invoke the data from the spacexdata api and print to the DOM.
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
            // Errors display an animated marquee.
            // console.log('Request failed.' + xhr.status);
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `No signal from the Satellite! Try later.`;
            root.appendChild(errorMessage);
        }
    };
    xhr.send();
};
// Load upcomingLaunch 1 second after we have recieved the data from the API
setTimeout(upcomingLaunch, 1000);

function upcomingLaunch() {
    
    //Upcoming data entries
        //Assign the data into variables
        let upcomingMissionLogo = upcomingLaunchData[0]['links']['mission_patch'];
        let upcomingMissionNoLogo = 'https://media.wired.com/photos/5a7cb68fa2d3835392e1b469/1:1/w_1000,c_limit/spacexrocketreturn.jpg'
        let upcomingDetails =  upcomingLaunchData[0]['details'];
        let upcomingFlightNumber = upcomingLaunchData[0]['flight_number'];
        let upcomingMissionName = upcomingLaunchData[0]['mission_name'];
        let upcomingRocketName = upcomingLaunchData[0]['rocket']['rocket_name'];
        let upcomingLaunchDate = upcomingLaunchData[0]['launch_date_unix'];
        let upcomingLaunchLoc = upcomingLaunchData[0]['launch_site']['site_name_long'];
        let upcomingLandSuccess = upcomingLaunchData[0]['rocket']['first_stage']['cores'][0]['land_success'];
        let upcomingSuccess = upcomingLaunchData[0]['launch_success'];
        let upcomingVideoLink = upcomingLaunchData[0]['links']['video_link'];
        let upcomingPresskit = upcomingLaunchData[0]['links']['presskit'];
        let upcomingPayloadType = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['payload_type'];
        let upcomingPayloadCustomer = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['customers'];
        let upcomingPayloadOrbit = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['orbit'];
        let upcomingPayloadKG = upcomingLaunchData[0]['rocket']['second_stage']['payloads'][0]['payload_mass_kg'];
        
    
        // Time Converter
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let newDate = new Date();
                newDate.setTime(upcomingLaunchDate * 1000);
                dateStringGB = newDate.toLocaleDateString('en-GB', options);
                time12Hour = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });;
              
    
        // Generate the HTML box
    
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
    
            const h3 = document.createElement('h3');
            h3.textContent = ` Upcoming - ${upcomingMissionName}`;

            const img = document.createElement('img');
            if (upcomingMissionLogo !== null) {
                img.src = `${upcomingMissionLogo}`;
                img.className = `mission-badge`;
            } else {
                img.src = `${upcomingMissionNoLogo}`;
                img.className = `no-mission-badge`
            }

            const h4 = document.createElement('h4');
            h4.className = `next-launch`;
            h4.innerHTML += `<strong>${upcomingMissionName}</strong> will use the <strong>${upcomingRocketName}</strong> and launch on <strong>${dateStringGB}</strong> at <strong>${time12Hour}</strong>`;

            const ul = document.createElement('ul');
            
            const li = document.createElement('ul');
            li.innerHTML += `<li><strong>Rocket:</strong> ${upcomingRocketName}</li>`;
            li.innerHTML += `<li><strong>Flight Number:</strong> ${upcomingFlightNumber}</li>`;
            li.innerHTML += `<li><strong>Launch Date:</strong> ${dateStringGB} - ${time12Hour}</li>`;
            li.innerHTML += `<li><strong>Location:</strong> ${upcomingLaunchLoc}</li>`;
            li.innerHTML += `<li><strong>Payload Type:</strong> ${upcomingPayloadType}</li>`;
            li.innerHTML += `<li><strong>Customer:</strong> ${upcomingPayloadCustomer}</li>`;
            li.innerHTML += `<li><strong>Orbit:</strong> ${upcomingPayloadOrbit}</li>`;
            li.innerHTML += `<li><strong>Payload Mass:</strong> ${upcomingPayloadKG} kg</li>`;

            if( upcomingLandSuccess !== null) {    
                li.innerHTML += `<li><strong>Land Success:</strong> ${upcomingLandSuccess}</li>`;
            };
              
            if( upcomingSuccess !== null) { 
                li.innerHTML += `<li><strong>Launch Success:</strong> ${upcomingSuccess}</li>`;

            };
             
            if( upcomingVideoLink !== null) { 
              li.innerHTML += `<li><strong>Video Link:</strong> <a href='${upcomingVideoLink}' target="_blank">Watch Stream.</a></li>`;
            }
        
            if (upcomingPresskit !== null) {
                $(".upcomingRow1Data").append('<p><strong>PDF Information:</strong>' + ' <a href=' + upcomingPresskit + ' target="_blank">Open me...</a>' + '</p>');
                li.innerHTML += `<li><strong>PDF Information:</strong> <a href='${upcomingPresskit}' target="_blank">Read PDF.</a></li>`;
            }

            container.appendChild(card);
            card.appendChild(h3);
            card.appendChild(img);
            card.appendChild(h4);
            card.appendChild(ul);
            ul.appendChild(li);
            // card.appendChild(p);
            
            //Test name.
            // console.log(upcomingMissionName);
    
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
            // Errors display an animated marquee.
            console.log('Request failed.' + xhr.status);
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `No signal from the Satellite! Try later.`;
            root.appendChild(errorMessage);
        }
    };
    xhr.send();
};
// Load latestLaunch 1 second after we have recieved the data from the API
setTimeout(latestLaunch, 1000);

function latestLaunch() {
    
    //latest data entries
        //Assign the data into variables
        let latestMissionLogo = latestLaunchData['links']['mission_patch'];  
        let latestDetails = latestLaunchData['details'];;
        let latestFlightNumber = latestLaunchData['flight_number'];
        let latestMissionName = latestLaunchData['mission_name'];
        let latestRocketName = latestLaunchData['rocket']['rocket_name'];
        let latestLaunchDate = latestLaunchData['launch_date_unix'];
        let latestLaunchLoc = latestLaunchData['launch_site']['site_name_long'];
        let latestLandSuccess = latestLaunchData['rocket']['first_stage']['cores'][0]['land_success'];
        let latestSuccess = latestLaunchData['launch_success'];
        let latestVideoLink = latestLaunchData['links']['video_link'];
        let latestPresskit = latestLaunchData['links']['presskit'];
        let latestPayloadType = latestLaunchData['rocket']['second_stage']['payloads'][0]['payload_type'];
        let latestPayloadCustomer = latestLaunchData['rocket']['second_stage']['payloads'][0]['customers'];
        let latestPayloadOrbit = latestLaunchData['rocket']['second_stage']['payloads'][0]['orbit'];
        let latestPayloadKG = latestLaunchData['rocket']['second_stage']['payloads'][0]['payload_mass_kg'];
        
    
        // Time Converter
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let newDate = new Date();
                newDate.setTime(latestLaunchDate * 1000);
                dateStringGB = newDate.toLocaleDateString('en-GB', options);
                time12Hour = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });;
              
    
        // Generate the HTML box
    
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
    
            const h3 = document.createElement('h3');
            h3.textContent = ` latest - ${latestMissionName}`;

            const h4 = document.createElement('h4');
            if(latestDetails !== null){
                 h4.textContent = `${latestDetails}`;
            } else {
                h4.textContent = `Flight No: ${latestFlightNumber} launched the ${latestRocketName} on ${dateStringGB} at ${time12Hour} +`;
            }

            const img = document.createElement('img');
            if (latestMissionLogo !== null) {
                img.src = `${latestMissionLogo}`;
                img.className = `mission-badge`;
            } else {
                img.src = `${latestMissionNoLogo}`;
                img.className = `no-mission-badge`
            }

            const p = document.createElement('p');
            p.className = `next-launch`;

            const ul = document.createElement('ul');
            
            const li = document.createElement('ul');
            li.innerHTML += `<li><strong>Rocket:</strong> ${latestRocketName}</li>`;
            li.innerHTML += `<li><strong>Flight Number:</strong> ${latestFlightNumber}</li>`;
            li.innerHTML += `<li><strong>Launch Date:</strong> ${dateStringGB} - ${time12Hour}</li>`;
            li.innerHTML += `<li><strong>Location:</strong> ${latestLaunchLoc}</li>`;
            li.innerHTML += `<li><strong>Payload Type:</strong> ${latestPayloadType}</li>`;
            li.innerHTML += `<li><strong>Customer:</strong> ${latestPayloadCustomer}</li>`;
            li.innerHTML += `<li><strong>Orbit:</strong> ${latestPayloadOrbit}</li>`;
            li.innerHTML += `<li><strong>Payload Mass:</strong> ${latestPayloadKG} kg</li>`;

            if( latestLandSuccess !== null) {    
                li.innerHTML += `<li><strong>Land Success:</strong> ${latestLandSuccess}</li>`;
            };
              
            if( latestSuccess !== null) { 
                li.innerHTML += `<li><strong>Launch Success:</strong> ${latestSuccess}</li>`;
            };
             
            if( latestVideoLink !== null) { 
              li.innerHTML += `<li><strong>Video Link:</strong> <a href='${latestVideoLink}' target="_blank">Watch Stream.</a></li>`;
            }
        
            if (latestPresskit !== null) {
                li.innerHTML += `<li><strong>PDF Information:</strong> <a href='${latestPresskit}' target="_blank">Read PDF.</a></li>`;
            }

            container.appendChild(card);
            card.appendChild(h3);
            card.appendChild(img);
            card.appendChild(h4);
            card.appendChild(p);
            card.appendChild(ul);
            ul.appendChild(li);
            // card.appendChild(p);
            
            //Test name.
            // console.log(latestMissionName);
    
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
            // Errors display an animated marquee.
            console.log('Request failed.' + xhr.status);
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `No signal from the Satellite! Try later.`;
            root.appendChild(errorMessage);
        }
    };
    xhr.send();
};
// Load pastLaunch 1 second after we have recieved the data from the API
setTimeout(pastLaunch, 1000);

function pastLaunch() {
    // Loop through the past data in reverse and skip the latest mission.
    for(let i = pastLaunchData.length -2; i >= 0; i--) {
    //past data entries
        //Assign the data into variables
        let pastMissionLogo = pastLaunchData[i]['links']['mission_patch_small'];  
        let pastDetails = pastLaunchData[i]['details'];;
        let pastFlightNumber = pastLaunchData[i]['flight_number'];
        let pastMissionName = pastLaunchData[i]['mission_name'];
        let pastRocketName = pastLaunchData[i]['rocket']['rocket_name'];
        let pastLaunchDate = pastLaunchData[i]['launch_date_unix'];
        let pastLaunchLoc = pastLaunchData[i]['launch_site']['site_name_long'];
        let pastLandSuccess = pastLaunchData[i]['rocket']['first_stage']['cores'][0]['land_success'];
        let pastSuccess = pastLaunchData[i]['launch_success'];
        let pastVideoLink = pastLaunchData[i]['links']['video_link'];
        let pastPresskit = pastLaunchData[i]['links']['presskit'];
        let pastPayloadType = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['payload_type'];
        let pastPayloadCustomer = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['customers'];
        let pastPayloadOrbit = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['orbit'];
        let pastPayloadKG = pastLaunchData[i]['rocket']['second_stage']['payloads'][0]['payload_mass_kg'];
        
    
        // Time Converter
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let newDate = new Date();
                newDate.setTime(pastLaunchDate * 1000);
                dateStringGB = newDate.toLocaleDateString('en-GB', options);
                time12Hour = newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });;
              
    
        // Generate the HTML box
    
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
    
            const h3 = document.createElement('h3');
            h3.textContent = ` Past - ${pastMissionName}`;

            const h4 = document.createElement('h4');
            if(pastDetails !== null){
            h4.textContent = `${pastDetails}`;
            } else {
                h4.textContent = `Flight No: ${pastFlightNumber} launched the ${pastRocketName} on ${dateStringGB} at ${time12Hour} +`;
            }

            const img = document.createElement('img');
            if (pastMissionLogo !== null) {
                img.src = `${pastMissionLogo}`;
                img.className = `mission-badge`;
            } else {
                img.src = `${pastMissionNoLogo}`;
                img.className = `no-mission-badge`
            }
            const p = document.createElement('p');
            const ul = document.createElement('ul');
            
            const li = document.createElement('ul');
            li.innerHTML += `<li><strong>Rocket:</strong> ${pastRocketName}</li>`;
            li.innerHTML += `<li><strong>Flight Number:</strong> ${pastFlightNumber}</li>`;
            li.innerHTML += `<li><strong>Launch Date:</strong> ${dateStringGB} - ${time12Hour}</li>`;
            li.innerHTML += `<li><strong>Location:</strong> ${pastLaunchLoc}</li>`;
            li.innerHTML += `<li><strong>Payload Type:</strong> ${pastPayloadType}</li>`;
            li.innerHTML += `<li><strong>Customer:</strong> ${pastPayloadCustomer}</li>`;
            li.innerHTML += `<li><strong>Orbit:</strong> ${pastPayloadOrbit}</li>`;
            if (pastPayloadKG !== null) {
                li.innerHTML += `<li><strong>Payload Mass:</strong> ${pastPayloadKG} kg</li>`;
            }
            if( pastLandSuccess !== null) {    
                li.innerHTML += `<li><strong>Land Success:</strong> ${pastLandSuccess}</li>`;
            };
              
            if( pastSuccess !== null) { 
                li.innerHTML += `<li><strong>Launch Success:</strong> ${pastSuccess}</li>`;

            };
             
            if( pastVideoLink !== null) { 
              li.innerHTML += `<li><strong>Video Link:</strong> <a href='${pastVideoLink}' target="_blank">Watch Stream.</a></li>`;
            }
        
            if (pastPresskit !== null) {
                li.innerHTML += `<li><strong>PDF Information:</strong> <a href='${pastPresskit}' target="_blank">Read PDF.</a></li>`;
            }

            container.appendChild(card);
            card.appendChild(h3);
            card.appendChild(img);
            card.append(h4);
            card.appendChild(p);
            card.appendChild(ul);
            ul.appendChild(li);
            // card.appendChild(p);
            
            //Test name.
            // console.log(pastMissionName);
        }
    
};  


