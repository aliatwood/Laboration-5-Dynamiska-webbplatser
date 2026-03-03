/**
 * @file diagram.js
 * @description skapar stapel och cirkeldiagram på antal sökande till kurser/program ht25
 */

import './styles/styles.scss'

/**
 * element för kursknapp
 * @type {HTMLButtonElement}
 */
const button = document.getElementById("visakurserknapp");

/**
 * element för kursdiagram
 * @type {HTMLCanvasElement}
 */
const sDiagram = document.getElementById("kursdiagram");

/**
 * element för programknapp
 * @type {HTMLButtonElement}
 */
const buttonProgram = document.getElementById("visaprogramknapp");

/**
 * element för programdiagram
 * @type {HTMLCanvasElement}
 */
const cDiagram = document.getElementById("programdiagram");

/**
 * @type {Chart|undefined}
 */
let kursChart;

/**
 * @type {Chart|undefined}
 */
let programChart;

/**
 * @type {Array<Object>}
 */
let adata = [];

/**
 * hämtar data från ett externt api o sparar den i adata arrayen
 * @async
 * @function
 * @returns {promise<void>}
 */
async function getData() {
    try{
        let res = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
        if (!res.ok) {
            throw new Error("Något gick fel");
        }
        let data = await res.json();
        console.log(data);
        adata = data;
    }
    catch(error){
        console.log("something went wrong: " + error)

    }
}

    /**
     * visar ett stapeldiagram med 6 kurser som ansökts mest
     * förstör tidigare program(om de finns)
     */
    getData();

    button.addEventListener("click", () => {
        const top6 = adata.sort((a,b) => Number(b.applicantsTotal.trim()) - Number(a.applicantsTotal.trim())).slice(0,6);

        if (kursChart) {
            kursChart.destroy();
        }
        kursChart = new Chart(sDiagram, {
            type: "bar",
            data: {
                labels: top6.map(c => c.name),
                datasets: [{
                    label: "Antal sökande:",
                    data: top6.map(c => Number(c.applicantsTotal.trim())),
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    })

    /**
     * visar ett cirkeldiagram med de 5 program som ansökts mest
     * filtrerar på type === program och förstör tidiagre program om de finns 
     */

    buttonProgram.addEventListener("click", () => {
        const top5Program = adata.filter(item => item.type === "Program").sort((a,b) => Number(b.applicantsTotal.trim()) - Number(a.applicantsTotal.trim()))
        .slice(0,5);

        if (programChart) {
            programChart.destroy();
        }

        programChart = new Chart(cDiagram, {
            type: "pie",
            data: {
                labels: top5Program.map(p => p.name),
                datasets: [{
                    label: "Antal sökande",
                    data: top5Program.map(p => Number(p.applicantsTotal.trim()))
                }]
            },
            options: {
                responsive: true,
            }
        })
    })