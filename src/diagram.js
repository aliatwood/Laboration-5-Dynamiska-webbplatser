const button = document.getElementById("visakurserknapp");
const sDiagram = document.getElementById("kursdiagram");

let adata = [];

async function getData() {
    try{
        let res = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
        if (!res.ok) {
            throw new Error("Något gick fel");
        }
        let data = await res.json();
        console.log(data);
        adata = data.filter(item => item.type === "Kurs");
    }
    catch(error){
        console.log("something went wrong: " + error)

    }
}

    getData();


    button.addEventListener("click", () => {
        const top6 = adata.sort((a,b) => Number(b.applicantsTotal.trim()) - Number(a.applicantsTotal.trim())).slice(0,6);

        new Chart(sDiagram, {
            type: "bar",
            data: {
                labels: top6.map(c => c.name),
                datasets: [{
                    label: "Antal sökande:",
                    data: top6.map(c => Number(c.applicantsTotal.trim())),
                }]
            }
        })
    })