const series = [
  {
    name: "Solo Leveling",
    thumbnail: "https://i.postimg.cc/N0vrWV2F/1696342675788-VKzxw.webp",
    seasons: [
      {
        name: "Staffel 1",
        episodes: [
          { title: "Ep | 1", stream: "https://streamtape.com/v/BaOWq6Mx7lUy1J6/Solo-Leveling-Ger-Dub-E01.mp4" },
          { title: "Ep | 2", stream: "https://streamtape.com/v/dqLzAZwyPLfQoA/Solo-Leveling-Ger-Dub-E02.mp4" },
          { title: "Ep | 3", stream: "https://streamtape.com/v/wyLDJZQAGyHoex/Solo-Leveling-Ger-Dub-E03.mp4" },
          { title: "Ep | 4", stream: "https://streamtape.com/v/GQM4k8yrqPs174v/Solo-Leveling-Ger-Dub-E04.mp4" },
          { title: "Ep | 5", stream: "https://streamtape.com/v/7zwdovpbv4fJM2/Solo-Leveling-Ger-Dub-E05.mp4" },
          { title: "Ep | 6", stream: "https://streamtape.com/v/kvj7GPeAXesOGRO/Solo-Leveling-Ger-Dub-E06.mp4" },
          { title: "Ep | 7", stream: "https://streamtape.com/v/zXjkaYzMObHX9P/Solo-Leveling-Ger-Dub-E07.mp4" },
          { title: "Ep | 8", stream: "https://streamtape.com/v/jlGpLOZxyrSzXKl/Solo-Leveling-Ger-Dub-E08.mp4" },
          { title: "Ep | 9", stream: "https://streamtape.com/v/RgMrRvw1YkcdWbX/Solo-Leveling-Ger-Dub-E09.mp4" },
          { title: "Ep | 10", stream: "https://streamtape.com/v/bGodZgKG8LFP0Qq/Solo-Leveling-Ger-Dub-E10.mp4" },
          { title: "Ep | 11", stream: "https://streamtape.com/v/XBAggZbqrYUB2e/Solo-Leveling-Ger-Dub-E11.mp4" },
          { title: "Ep | 12", stream: "https://streamtape.com/v/3VoDWy4BAdhdg60/Solo-Leveling-Ger-Dub-E12.mp4" }
        ]
      },
      {
        name: "Staffel 2",
        episodes: Array.from({length: 20}, (_, i) => ({ 
          title: `Ep | ${i + 1}`, 
          stream: "https://streamtape.com/e/STREAM-LINK-HIER" 
        }))
      }
    ]
  },
  {
    name: "Serie 2",
    thumbnail: "https://i.postimg.cc/VsbHMDKR/Design-ohne-Titel-20251010-234756-0000.png",
    seasons: [
      {
        name: "Staffel 1",
        episodes: Array.from({length: 20}, (_, i) => ({
          title: `Ep | ${i + 1}`,
          stream: "https://streamtape.com/e/STREAM-LINK-HIER"
        }))
      },
      {
        name: "Staffel 2",
        episodes: Array.from({length: 20}, (_, i) => ({
          title: `Ep | ${i + 1}`,
          stream: "https://streamtape.com/e/STREAM-LINK-HIER"
        }))
      }
    ]
  }
];


function showSeries(list, containerId = "results") {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach(anime => {
    const div = document.createElement("div");
    div.classList.add("anime-card");
    div.innerHTML = `
      <img src="${anime.thumbnail}" alt="${anime.name}">
      <h3>${anime.name}</h3>
    `;
    div.onclick = () => showEpisodes(anime);
    container.appendChild(div);
  });
}


function showRandomSeries() {
  const containerId = "results";
  const shuffled = [...series].sort(() => 0.5 - Math.random());
  const randomFive = shuffled.slice(0, 5);
  showSeries(randomFive, containerId);
}


document.getElementById("search").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const filtered = series.filter(s => s.name.toLowerCase().includes(query));

  if (query.length === 0) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  showSeries(filtered);
});


function showEpisodes(anime) {
  const container = document.getElementById("results");
  container.innerHTML = `<h2>${anime.name}</h2><div class="episodes-container"></div>`;
  const episodesContainer = container.querySelector(".episodes-container");

  anime.seasons.forEach(season => {
    const seasonDiv = document.createElement("div");
    seasonDiv.classList.add("season");
    seasonDiv.innerHTML = `<h3>${season.name}</h3>`;
    
    season.episodes.forEach(ep => {
      const btn = document.createElement("button");
      btn.classList.add("episode");
      btn.textContent = ep.title;
      btn.onclick = () => openPlayer(ep.stream);
      seasonDiv.appendChild(btn);
    });

    episodesContainer.appendChild(seasonDiv);
  });
}


function openPlayer(url) {
  const modal = document.getElementById("playerModal");
  const player = document.getElementById("videoPlayer");
  player.src = url;
  modal.style.display = "flex";
}

function closePlayer() {
  const modal = document.getElementById("playerModal");
  const player = document.getElementById("videoPlayer");
  player.src = "";
  modal.style.display = "none";
}


window.onload = showRandomSeries;
