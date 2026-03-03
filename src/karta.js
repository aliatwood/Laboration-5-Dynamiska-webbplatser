/**
 * @file karta.js
 * @description En dynamisk karta med leaflet och nominatim api.
 */

import './styles/styles.scss'
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/**
 * element för sökfält
 * @type {HTMLInputElement}
 */
const searchEl = document.getElementById("search");

/**
 * element för lattitude
 * @type {HTMLInputElement}
 */
const latEl = document.getElementById("lat");

/**
 * element för longitude
 * @type {HTMLInputElement}
 */
const lonEl = document.getElementById("lon");

/**
 * element för knapp
 * @type {HTMLInputElement}
 */
const buttonEl = document.getElementById("knapp");

/**
 * element för sökformulär
 * @type {HTMLInputElement}
 */
const formEl = document.getElementById("sökformulär");

/**
 * markör på sidan som tar bort tidigare markör(om den finns) innan en ny sätts
 * @type {L.marker|undefined}
 */
let marker;

/**
 * leaflet kartan
 * @type {L.map}
 */
const map = L.map("karta").setView([0, 0], 2);

/**
 * OpenStreetMap tile layer
 * @type {L.tileLayer}
 */
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

/**
 * Hämtar koordinater från en plats från nominatim api och uppdaterar markören
 * @async
 * @function
 * @returns {Promise<Array>|undefined} JSON-data från nominatim api eller undefined vid erroor
 */
async function getData() {
  try{
    let query = encodeURIComponent(searchEl.value);

    let res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
    if (!res.ok) {
      throw new Error("Något gick fel")
    }
    let data = await res.json();
    if (data.length > 0) {
      let lat = data[0].lat;
      let lon = data[0].lon;
      
      map.setView([lat, lon], 13);

      if(marker) map.removeLayer(marker);

      marker = L.marker([lat, lon]).addTo(map).bindPopup(searchEl.value).openPopup();

      latEl.textContent = lat;
      lonEl.textContent = lon;
    }
    console.log(data);

    return data;
  }
  catch(error){
    console.log("Något gick fel " + error)
  }
}

/**
 * La till ett submitevent istället för en klick
 * stoppar standarbeteendet och kallar till slut getdata funktionen
 * @param {SubmitEvent} e
 */
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  await getData();
});