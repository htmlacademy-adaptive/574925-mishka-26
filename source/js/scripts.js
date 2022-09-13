let navigation = document.querySelector('.navigation');
let navigationMenu = navigation.querySelector('.navigation__wrapper');
let navigationButton = document.querySelector('.navigation__toggle');
let navigationBtnIconOpen = navigationButton.querySelector('.navigation__toggle-icon--open');
let navigationBtnIconClose = navigationButton.querySelector('.navigation__toggle-icon--close');
let mapWrapper = document.querySelector('.map__wrapper--no-js')
let contactsImg = document.querySelector('.contacts__img');


navigation.classList.remove('navigation--no-js');
navigationMenu.classList.remove('navigation__wrapper--no-js');
navigationButton.classList.remove('navigation__toggle--no-js');

if (mapWrapper) {
  mapWrapper.classList.remove('map__wrapper--no-js');
}
if (contactsImg) {
  contactsImg.classList.remove('contacts__img--no-js');
}

navigationButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  navigationMenu.classList.toggle('navigation__wrapper--open');
  navigationBtnIconOpen.classList.toggle('navigation__toggle-icon--hide');
  navigationBtnIconClose.classList.toggle('navigation__toggle-icon--hide');
});
