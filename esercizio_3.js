// Array contenenti tutte le vendite
const sales = [
  { category: "Utilitarie", amount: 14000, number: 1 },
  { category: "Sportive", amount: 50000, number: 1 },
  { category: "SUV", amount: 60000, number: 2 },
  { category: "Utilitarie", amount: 42000, number: 3 },
  { category: "SUV", amount: 30000, number: 1 },
  { category: "Sportive", amount: 100000, number: 2 },
];

/* La funzione raggruppaVendite utilizza il  reduce e il destructuring per operare sull'array sales per raggruppare  le vendite in base alla categoria di apprtenenza.
Nello specifico inserisce in un oggetto vuoto (groupedSales), suddividendo in array in base alla categoria, le varie vendite che sono presenti nell'array di partenza
sales e poi, dopo un 1 secondo, chiama la callback calcolaStatistiche*/
function raggruppaVendite(sales, callback) {
  const groupedSales = {};
  sales.forEach(({ category, amount, number }) => {
    if (!groupedSales[category]) {
      groupedSales[category] = [];
    }
    groupedSales[category].push({ amount, number });
  });

  console.log("Dati raggruppati per categoria:", groupedSales);
  setTimeout(() => callback(groupedSales), 1000);
}

/* La funzione calcolaStatistiche itera grazie al for in sull'oggetto groupedSales e popola l'array vuoto salesStatistics con la somma dei guadagni e delle quantità
delle varie vendite suddivise in categorie grazie al metodo reduce e il metodo push. Dopo un secondo chiama la callback filtraCategorie */
function calcolaStatistiche(groupedSales, callback) {
  const salesStatistics = [];
  for (const category in groupedSales) {
    const totalAmount = groupedSales[category].reduce(
      (sum, { amount }) => sum + amount,
      0
    );
    const totalNumber = groupedSales[category].reduce(
      (sum, { number }) => sum + number,
      0
    );
    salesStatistics.push({
      categoria: category,
      guadagni: totalAmount,
      quantita: totalNumber,
    });
  }

  console.log("Statistiche delle vendite per categoria:", salesStatistics);
  setTimeout(() => callback(salesStatistics), 1000);
}

/* La funzione filtraCategorie utilizza il metodo filter per filtrare i guadagni delle categorie salvando il tutto nella variabile salesFilter. A sua volta chiama una
callback dopo un secondo che stampa nel terminale salesFilter */
function filtraCategorie(salesStatistics, callback) {
  const salesFilter = salesStatistics.filter((sale) => sale.guadagni >= 80000);

  setTimeout(() => callback(salesFilter), 1000);
}

raggruppaVendite(sales, (groupedSales) => {
  calcolaStatistiche(groupedSales, (salesStatistics) => {
    filtraCategorie(salesStatistics, (salesFilter) => {
      console.log(
        "Categorie con vendite superiori alla soglia di 80000:",
        salesFilter
      );
    });
  });
});
