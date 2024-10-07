import { updateLenguageUI } from "./change-lenguage-simple.js";

export let selectedLanguage = 'en';
export let currentAnimeId = null; // Зберігає ID аніме, яке наразі відображається


//changeLenguageByButton(selectedLanguage, currentAnimeId);
const buttons = document.querySelectorAll('.js-button'); // select all leng-buttons
buttons.forEach((button) => {                          // for each single button 
  button.addEventListener('click', async () => {       // якщо є клік на будь-яку кнопку => async function
      selectedLanguage = button.innerHTML.toLowerCase(); // selected lenguage value = value of button lowerCase
      updateLenguageUI(selectedLanguage);                // update only titels on site, not anime description
      

    // Якщо є відображене аніме, перезавантажуємо його з новою мовою
    if (currentAnimeId !== null) {                              // if currentAnimeId has ID of some anime !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      const data = await fetchAnimeData(selectedLanguage);      // чекаємо отримання даних з конкрктного json-файлу 
      const anime = data.find(anime => anime.id === Number(currentAnimeId));  // anime - це об'єкт де currentAnimeId та anime.id збігаються
      if (anime) {        // завжди  
        try {
          updateAnimeDescription(anime);    // оновлюються тільки name, description та genre
          }
        catch(error) {
          console.log('there is no rendered anime description');
        };
      }
    }   
  });
});

// Click on anime-image
document.querySelectorAll('.anime-item')  // обираємо всі зображення
  .forEach((element) => {                 // element - це любе окреме зображення 
    
    element.addEventListener('click', async () => {          // якщо є клік на будь-яке зображення  => async function
      const data =  await fetchAnimeData(selectedLanguage);  // чекаємо на отримання даних з конкретного json-файлу, data = список об'єктів
      const animeId = element.dataset.id;                   // отримуємо значення data-id зображення, animeId - ЦЕ РЯДОК
      currentAnimeId = animeId; // Зберігаємо ID відображеного аніме в currentAnimeId !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      for (const anime of data) {          // для окремого об'єкта з json-файлу, anime = ОБ'ЄКТ!!!!!!!!
        if(anime.id === Number(animeId)) { // якщо id в json-об'єкті збігається з id клікнутого зображення
          renderDescription(anime);         // 
          updateAnimeDescription(anime);    //
        } 
      }
    })
  })




async function fetchAnimeData(leng) {
    try {
      const response =  await fetch(`./backend/${leng}-anime-list.json`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching the JSON data:', error);
    }
}



let animeList = [];
let idList = [];

function renderDescription(anime) {
  const articleContainer = document.querySelector('.article-container');
  articleContainer.innerHTML =
  `
  <div class="modal-overlay">
  <article class="recomended-anime">
      <h3 class="name">${anime.name}</h3>
      <img src="images/icons/Icon-Close.png" alt="close" class="second-close-icon">
     
      <div class="description">${anime.description}</div>
      <div class="genre">${anime.genre}</div>
     
    <button class="add-to-list-button js-add-to-list-button">+</button>
  </article>
  </div>
  `;
  document.querySelector('.second-close-icon')
  .addEventListener('click', () => {
    articleContainer.innerHTML = '';
  });

  // Закриття при натисканні на фон
  document.querySelector('.modal-overlay').addEventListener('click', (event) => {
    if (event.target === document.querySelector('.modal-overlay')) {
      articleContainer.innerHTML = ''; // Закриває секцію при натисканні на фон
    }
  });

  
  // Switch button +/-
  let counter = 2;
  const addButton = document.querySelectorAll('.js-add-to-list-button');
  addButton.forEach((button) => {
    button.addEventListener('click', () => {
    
      const isInList = idList.includes(anime.id); // перевірка чи зрендерине аніме(його назва) вже є у списку
      if (!isInList) {
        idList.push(anime.id);
        animeList.push(anime.name);
      }
      
      if (counter % 2 === 0) {
        button.classList.add('addedAnimeToList');
        document.querySelector('.js-add-to-list-button').textContent = '-';
        counter++;
        renderList();
      } else {
        button.classList.remove('addedAnimeToList');
        document.querySelector('.js-add-to-list-button').textContent = '+';
        counter++;
      }
    })   
  }); 
}
//  renderList();
function renderList() {
  console.log(animeList);
  let yourAnimeList = '';
  for (let i = 0; i < animeList.length; i++) {
    const nameInList = animeList[i];
    
    const html = 
      `
        <li class="single-list-item"> 
          <div class="anime-list-item">  
            <div class="anime-name-item">${nameInList}</div> 
            <img class="icon-menu" src="images/icons/Icon-Burger-menu.png">
          </div>
          <button class="delete-button js-delete-button">delete</button>
        </li>
      `
      yourAnimeList += html;
      
  }
  document.querySelector('.list-items').innerHTML = yourAnimeList;
  updateLenguageUI(selectedLanguage);

  document.querySelectorAll('.js-delete-button')
    .forEach((button, index) => {
      button.addEventListener('click', () => {
        animeList.splice(index, 1); // Видаляємо елемент із списку
        idList.splice(index, 1);
        renderList(); // Оновлюємо список після видалення
      });
    });
}
function addToList() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  animeList.push(name);
  inputElement.value = '';

  renderList();
}

document.querySelector('.js-add-new-anime-button')
  .addEventListener('click', () => {
    addToList();
  })

export function updateAnimeDescription(anime) {
  // Оновлення елементів не перерендерюючи їх заново
  document.querySelector('.name').textContent = anime.name;
  document.querySelector('.description').textContent = anime.description; 
  document.querySelector('.genre').textContent = anime.genre; 
}



