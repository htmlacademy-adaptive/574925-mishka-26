let navigationMenu = document.querySelector('.navigation__container');
let navigationButton = document.querySelector('.navigation__toggle');
let navigationBtnIconOpen = navigationButton.querySelector('.navigation__toggle-icon--open');
let navigationBtnIconClose = navigationButton.querySelector('.navigation__toggle-icon--close');

navigationMenu.classList.remove('navigation__container--no-js');
navigationButton.classList.remove('navigation__toggle--no-js');

navigationButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  navigationMenu.classList.toggle('navigation__container--open');
  navigationBtnIconOpen.classList.toggle('navigation__toggle-icon--hide');
  navigationBtnIconClose.classList.toggle('navigation__toggle-icon--hide');
});
