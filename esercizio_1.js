// Array di prodotti dell' e-commerce
const products = [
  {
    id: 1,
    brand: "Razer",
    productName: "Mouse Viper Ultimate",
    price: 80,
    instock: null,
  },

  {
    id: 2,
    brand: "Razer",
    productName: "Mouse Viper",
    price: 60,
    instock: null,
  },

  {
    id: 3,
    brand: "Drevo",
    productName: "Keyboard tyrfing v2",
    price: 35,
    instock: null,
  },

  {
    id: 4,
    brand: "Deep Cool",
    productName: "PC Case Matrexx 55",
    price: 80,
    instock: null,
  },

  {
    id: 5,
    brand: "AOC",
    productName: 'Monitor 24" 1920x1080 144Hz',
    price: 159,
    instock: null,
  },
];

// Sconto da applicare
const discount = 10 / 100;

/* La funzione applicaSconto, come da consegna prende un array, un valore percentuale di sconto e richiama con una callback verificaStock con un secondo di delay. La funzione utilizza il metodo degli array map per 
applicare lo sconto a price degli oggetti presenti all'interno dell'array che rappresentano il prodotto */
function applicaSconto(products, discount, callback) {
  const productsDiscount = products.map((product) => ({
    ...product,
    price: product.price - product.price * discount,
  }));

  console.log("Ai seguenti prodotti è stato applicato un 10% di sconto: ");
  productsDiscount.forEach((product) =>
    console.log(
      `${product.brand} ${product.productName}, prezzo: ${product.price}`
    )
  );

  setTimeout(() => callback(productsDiscount), 1000);
}

/* La funzione verificaStock è la callback di applicaSconto che prende l'array con i prezzi scontati e, tramite la funzione nextProduct, simulo la disponibilità di ogni prodotto singolarmente con un
delay di 1 secondo tramite un valore random. Quando la funzione nextProduct ha terminato gli elementi presenti nell'array, tramite l'utilizzo del metodo filter, carico nella costante productsInStock tutti gli oggetti
con disponibilità true */
function verificaStock(productsDiscount, callback) {
  let i = 0;

  function nextProduct() {
    if (i < productsDiscount.length) {
      setTimeout(() => {
        let randomValue = Math.random();
        let isInStock = randomValue >= 0.5;
        if (isInStock) {
          productsDiscount[i].instock = true;
        } else {
          productsDiscount[i].instock = false;
        }

        i++;
        nextProduct();
      }, 1000);
    } else {
      const productsInStock = productsDiscount.filter(
        (product) => product.instock === true
      );

      console.log("I prodotti disponibili sono:");
      productsInStock.forEach((product) =>
        console.log(
          `${product.brand} ${product.productName}, Disponibile: ${product.instock}`
        )
      );

      console.log("Calcolo della somma dei prodotti disponibili in corso...");

      callback(productsInStock);
    }
  }

  nextProduct();
}

/* La funzione calcolaTotale è la callback di verificaStock a cui viene passao l'array "filtrato" productsInStock e calcola il totale di price tra tutti gli oggetti tramite l'uilizzo del metodo reduce e utilizza
la callback per mostrare il risultato riardando di 1 secondo la chiamata */
function calcolaTotale(productsInStock, callback) {
  const TotalPriceProduct = productsInStock.reduce(
    (acc, product) => (acc += product.price),
    0
  );

  setTimeout(() => callback(TotalPriceProduct), 1000);
}

applicaSconto(products, discount, (productsDiscount) =>
  verificaStock(productsDiscount, (productsInStock) =>
    calcolaTotale(productsInStock, (TotalPriceProduct) => {
      console.log(
        `La somma dei prodotti scontati e disponibili nel carrello è: €${TotalPriceProduct} `
      );
    })
  )
);
