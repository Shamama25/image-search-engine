const accessKey = "_eSN_ct7DsOdsyvRQjmMY-8l5MBoelWvuTxjn5bHXiM"
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.querySelector(".search-result");
const showMoreBtn = document.getElementById("show-more-btn");
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        console.log("API response", data);

        const results = data.results;

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
