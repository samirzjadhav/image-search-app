const AccessKey = "BZkd-SZtw-p0WMue-uXh3g4v_Gpl1xBGIK1u6Li83zo";

const formEL = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results"); // Fix: use querySelector
const showMoreBtn = document.querySelector(".show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const Url = `https://api.unsplash.com/search/photos?query=${inputData}&client_id=${AccessKey}&page=${page}`;
  const response = await fetch(Url);
  const data = await response.json();

  const results = data.results;
  console.log(results);

  if (page === 1) {
    searchResults.innerHTML = ""; // Clear previous results for new search
  }

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image-wrapper");

    const image = document.createElement("img");
    image.src = result.urls.regular; // Ensure the image URL is correct
    image.alt = result.alt_description || "Image"; // Add fallback alt text

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description || "View Image";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper); // Append imageWrapper to the searchResults container
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block"; // Show 'Show More' button after the first page
  }
}

formEL.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", searchImages);
