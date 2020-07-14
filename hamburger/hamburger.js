const icon = document.querySelector('.icon');
// const menu = document.querySelector('.menu');
const menu = document.getElementsByClassName('menu');

icon.addEventListener('click', () => {
  console.log(menu);
  if (menu.style.display === 'none') {
    console.log('none');
    menu.style.display = 'block';
  } else {
    console.log('block');
    menu.style.display = 'none';
  }
});
