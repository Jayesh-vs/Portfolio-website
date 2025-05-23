let section = document.querySelectorAll("section");

let navLinks = document.querySelectorAll("nav div a ");

let cvButton = document.querySelector(".btn-signing-main");

let currentSection = "content";

window.addEventListener("scroll", () => {
  section.forEach((sectionEl) => {
    if (window.scrollY >= sectionEl.offsetTop-100) {
      currentSection = sectionEl.id;
    }
  });
  navLinks.forEach((navlinkEl) => {
    if (navlinkEl.href.includes(currentSection)) {
      document.querySelector(".active").classList.remove("active");
      navlinkEl.classList.add("active");
    }
  });
});

// CONTACT FORM


const form = document.getElementById('form');
const result = document.querySelector(".contact-button")

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.innerHTML = "Submit <i class='fa-solid fa-arrow-right'></i></button>" ;
            }, 3000);
        });
});



