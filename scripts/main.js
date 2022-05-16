window.addEventListener('load', () => {
  const fetchSize = 30;
  const itemsPerPage = 5;
  let currentData = [];
  let currentPage = 0;
  let initialLoad = true; // Used to check if columns have their headings
  let paginatedData = [];
  let sorted = [];
  let titles;

  // Selecting elements
  const nextPageButton = document.getElementById('nextPageButton');
  const prevPageButton = document.getElementById('prevPageButton');
  const loadButton = document.getElementById('randomFetch');
  const sortLengthButton = document.getElementById('sortByLen');

  // Fetching data from API
  async function fetchPoemBody(title) {
    return await fetch(`https://poetrydb.org/title/${title}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data[0].lines.toString();
      });
  }

  async function fetchPoemList() {
    let response = await fetch(`https://poetrydb.org/random/${fetchSize}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((item) => delete item.lines);
        return data;
      });
    return response;
  }

  // Event Handlers

  loadButton.addEventListener('click', async (event) => {
    event.preventDefault();
    loadButton.disabled = true;
    let newData = await fetchPoemList();
    currentData.push(...newData);
    sorted = sortSpecifiedDataByLength(newData);
    paginatedData = pagination(currentData, itemsPerPage);
    currentData = paginatedData;
    createHead();
    fillTable(paginatedData[currentPage]);
  });

  sortLengthButton.addEventListener('click', (event) => {
    event.preventDefault();
    currentData = pagination(sorted.reverse(), itemsPerPage);
    resetTable();
    fillTable(currentData[currentPage]);
  });

  prevPageButton.addEventListener('click', () => {
    prevPage();
  });

  nextPageButton.addEventListener('click', () => {
    nextPage();
  });

  // Utility Functions

  function createHead() {
    while (initialLoad) {
      const table = document.getElementById('mainTable');
      let head = Object.keys(currentData[0][0]);
      let header = table.createTHead();
      let row = header.insertRow();
      for (let heading in head) {
        let cell = row.insertCell();
        let text = document.createTextNode(head[heading].toUpperCase());
        cell.appendChild(text);
      }
      initialLoad = false;
    }
  }

  function fillTable(data) {
    const table = document.getElementById('mainTable');

    if (table.hasChildNodes()) {
      resetTable();
    }

    let body = table.createTBody();

    for (let metaData of data) {
      let row = body.insertRow();
      for (let poemInfo in metaData) {
        let cell = row.insertCell();
        let text = document.createTextNode(metaData[poemInfo]);
        cell.setAttribute('class', poemInfo);
        cell.appendChild(text);
      }
    }

    setTitles();
  }

  function resetTable() {
    let tableBody = document.getElementsByTagName('tbody');
    for (let i = 0; i < tableBody.length; i++) {
      tableBody[i].remove();
    }
  }

  function sortSpecifiedDataByLength(data) {
    return data.sort((a, b) => {
      return a.linecount - b.linecount;
    });
  }

  function pagination(data, perPage) {
    let splitArr = [];
    for (let i = 0; i < data.length; i += perPage) {
      let section = data.slice(i, i + perPage);
      splitArr.push(section);
    }
    return splitArr;
  }

  function setTitles() {
    titles = document.querySelectorAll('.title');
    titles.forEach((title) =>
      title.addEventListener('click', () => {
        let currentPoem = fetchPoemBody(title.textContent);
        setPoemBody(currentPoem);
      })
    );
  }

  async function setPoemBody(poem) {
    poemBody = document.getElementById('poemBody');
    poemBody.textContent = await poem;
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      fillTable(currentData[currentPage]);
    }
  }

  function nextPage() {
    if (currentData.length - currentPage > 1) {
      currentPage++;
      fillTable(currentData[currentPage]);
    }
  }
});
