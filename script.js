window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {  // Adjust scroll distance as needed
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// someimportantstyles();

function setactive(element) {
  const activeElement = document.querySelector('.active');
  if (activeElement) {
    activeElement.classList.remove('active');
  }
  element.classList.add('active');
  
}
window.addEventListener('scroll', () => {
  const element1 = document.querySelector('.bganimimg');

  if (window.scrollY > 100) {  // Adjust scroll distance as needed
   element1.children[0].style = `transform:scale(${window.scrollY/300});`
   console.log(`transform:scale(0${window.scrollY});`);
  } else {
   
  }
});
 

    window.onload = () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0); // ensures scroll position is at top
};