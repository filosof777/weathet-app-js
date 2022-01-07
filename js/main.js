let elNavList = document.querySelector('.nav__list');
let elHeaderBtn = document.querySelector('.header__btn');

elHeaderBtn.addEventListener('click', () => {
  elNavList.classList.toggle('show-menu');
});

