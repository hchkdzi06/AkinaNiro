export function updateLenguageUI(selectedLanguage) {
  // Зміна тексту елементів відповідно до мови
  document.querySelector('.recomented-title').textContent = 
  selectedLanguage === 'en' ? 'Recommended' :
  selectedLanguage === 'pl' ? 'Polecane' :
  'Рекомендоване';

  document.querySelector('.recomended-item').textContent = 
  selectedLanguage === 'en' ? 'recommended' :
  selectedLanguage === 'pl' ? 'polecane' :
  'рекомендоване';

  document.querySelector('.your-list-item').textContent =
  selectedLanguage === 'en' ? 'your list' :
  selectedLanguage === 'pl' ? 'twoja lista' :
  'твій список';

  document.querySelector('.songs-item').textContent =
  selectedLanguage === 'en' ? 'songs' :
  selectedLanguage === 'pl' ? 'piosenki' :
  'пісні';

  document.querySelector('.list-title').textContent =
  selectedLanguage === 'en' ? 'Your list' :
  selectedLanguage === 'pl' ? 'Twoja lista' :
  'Твій список';
  
  document.querySelector('.js-add-new-anime-button').textContent =
  selectedLanguage === 'en' ? 'add' :
  selectedLanguage === 'pl' ? 'dodać' :
  'додати';

  document.querySelectorAll('.js-delete-button')
    .forEach((element) => {
      element.textContent = 
      selectedLanguage === 'en' ? 'delete' :
      selectedLanguage === 'pl' ? 'usunąć' :
      'видалити';
    })
}