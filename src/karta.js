const searchEl = document.getElementById("search");
const buttonEl = document.getElementById("knapp");
const formEl = document.getElementById("sökformulär");

let marker;

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = L.map("karta").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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
    }
    console.log(data);

    return data;
  }
  catch(error){
    console.log("Något gick fel " + error)
  }
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  await getData();
});