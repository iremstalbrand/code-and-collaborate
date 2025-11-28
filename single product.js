// Get the product index from URL: example → single-product.html?id=3
const urlParams = new URLSearchParams(window.location.search);
const productIndex = urlParams.get("id");

// Load products.json
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const product = products[productIndex];

    if (!product) {
      document.getElementById("product-details").innerHTML = "<h2>Product not found!</h2>";
      return;
    }

    document.getElementById("product-details").innerHTML = `
      <div class="product-container">
        <img src="${product.picture}" alt="${product.title}">

        <div>
          <div class="product-title">${product.title}</div>
          <div class="product-price">$${product.price}</div>

          <p>Lorem ipsum dolor sit amet, product description goes here.</p>

          <a class="back" href="index.html">← Back to Products</a>
        </div>
      </div>
    `;
  })
  .catch(err => {
    document.getElementById("product-details").innerHTML = "<h2>Error loading product.</h2>";
    console.error(err);
  });
