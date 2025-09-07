const loadAllTrees = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((response) => response.json())
    .then((data) => {
      displayAllTrees(data.plants);
    });
};

const displayAllTrees = (trees) => {
  const cardContainer = document.getElementById("card_container");
  cardContainer.innerHTML = "";
  trees.forEach((tree) => {
    const containerDiv = document.createElement('div');
    containerDiv.innerHTML = `
     <div class="card bg-white p-3">
                <div class="w-full">
                    <img class="w-full h-48 object-cover rounded-md"  src=${tree.image} alt="" />
                </div>
              <h2 class="font-bold my-2">${tree.name}</h2>
              <p class="text-gray-500  line-clamp-3">
                 ${tree.description}
              </p>
              <div class="flex justify-between items-center mt-3">
                <h3 class="bg-[#DCFCE7] text-[#15803D] rounded-xl px-3">${tree.category}</h3>
                <p class="font-bold">${tree.price}</p>
              </div>
              <button class="bg-[#15803D] border text-white rounded-2xl  px-4 py-1 mt-3">Add to Cart</button>
            </div>
    `;
    cardContainer.appendChild(containerDiv);
  });
};

loadAllTrees();
