const lenButtons = document.querySelectorAll('.js-button');

lenButtons.forEach((button) => {
  button.addEventListener('click', () => {
    lenButtons.forEach((btn) => {
      btn.classList.remove('selected');
    });
    button.classList.add('selected');
  });
});

