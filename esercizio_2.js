/* La funzione aggiornaPrezzi, aggiorna l'array di azioni randomicamente grazie all'utilizzo del forEach in un intervallo di tempo di 2 secondi. L'intervallo è
programmato per interrompersi dopo 10 secondi grazie ad un timer che si incrementa nell'intervallo stesso. Dopo che si esegue il forEach, stampo i risultati in 
console e chiamo la callback, ovvero filtraAzioni, con 1 secondo di delay */
function aggiornaPrezzi(callback) {
  // Array di azioni
  const stocks = [
    { stockName: "Acea", price: 1 },
    { stockName: "Banca Mediolanum", price: 2 },
    { stockName: "Caterpillar", price: 5 },
    { stockName: "Salvatore Ferragamo", price: 3 },
    { stockName: "Tesla", price: 8 },
    { stockName: "Zalando", price: 6 },
    { stockName: "Renault", price: 7 },
    { stockName: "Philips", price: 4 },
  ];

  let timer = 0;

  const updateStock = setInterval(() => {
    stocks.forEach((stock) => {
      const variation = Math.random() * 4.5 + 0.5; //intervallo 0.5 - 5.0
      const isIncrease = Math.random() >= 0.5 ? 1 : -1; //scelta raondmica se in crescita o in diminuzione

      stock.price += variation * isIncrease;
      stock.price = Math.round(stock.price * 100) / 100; //per mantenere i 2 decimali
    });

    timer++;

    console.log("Le azioni aggiornate sono:");
    console.log(stocks);

    setTimeout(() => callback(stocks), 1000);

    if (timer == 10) {
      clearInterval(updateStock);
    }
  }, 2000);
}

/* La funzione filtraAzioni viene richiamata ad ogni aggiornamento dell'intervallo, e viene passata l'array aggiornato con i nuovi valori. La funzione ha al suo 
interno un metodo degli array (metodo filter) per filtrare solo le azioni che hanno un price maggiore o uguale di 6. Successivamente se sono presenti oggetti, 
ovvero le azioni, nell'array stocksFilter le stampa in cosole e chiama la callback calcolaValoreTotale con 1 secondo di delay, altrimenti stampa a schermo 
"Non ci sono azioni uguali o superiori alla soglia" */
function filtraAzioni(stocks, callback) {
  const stocksFilter = stocks.filter((stock) => stock.price >= 6);

  if (stocksFilter.length > 0) {
    console.log("Le azioni superiori o uguali alla soglia del 6 sono:");
    stocksFilter.forEach((stockFilter) => {
      console.log(stockFilter);
    });

    setTimeout(() => callback(stocksFilter), 1000);
  } else {
    console.log("Non ci sono azioni uguali o superiori alla soglia");
  }
}

/* La funzione calcolaValoreTotale prende l'array filtrato nella funzione filtraAzioni e tramite il metodo degli array reduce calcola il valore totale del price
degli oggetti presenti in quell'array, e con un secondo di delay chiama la callback che stampa nella console il totale */
function calcolaValoreTotale(stocksFilter, callback) {
  console.log("Calcolo valore totale delle azioni filtrate in corso...");

  const totalValueStocks = stocksFilter.reduce(
    (acc, stockFilter) => (acc += stockFilter.price),
    0
  );

  setTimeout(() => callback(totalValueStocks), 1000);
}

aggiornaPrezzi((stocks) =>
  filtraAzioni(stocks, (stocksFilter) =>
    calcolaValoreTotale(stocksFilter, (totalValueStocks) => {
      console.log(
        `Il valore totale delle azioni filtrate è: €${totalValueStocks}`
      );
    })
  )
);
