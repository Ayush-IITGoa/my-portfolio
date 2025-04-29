/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

// ============= Live stats fetching ==================
//  -----------------Leetcode stats -------------------
async function fetchLeetCodeStats() {
    const username = "itssme_ayush"; // Replace with your username
    const apiUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;
	// document.getElementById("easy").innerText = "...Loading";
	// document.getElementById("medium").innerText = "...Loading";
	// document.getElementById("hard").innerText = "...Loading";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const easy = data.easySolved;
        const medium = data.mediumSolved;
        const hard = data.hardSolved;
		const totalQuestions = data.totalQuestions;

        document.getElementById("easy").innerText = easy;
        document.getElementById("medium").innerText = medium;
        document.getElementById("hard").innerText = hard;

		document.getElementById("totalSolved").innerText = easy+medium+hard;
		document.getElementById("totalQuestions").innerText = `/ ${totalQuestions}`;
        drawChart(easy, medium, hard,totalQuestions);
    } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
    }
}

function drawChart(easy, medium, hard,totalQuestions) {
    const totalSolved = easy + medium + hard;
    const totalProblems = totalQuestions; // Update with actual total problem count

    const ctx = document.getElementById("solvedChart").getContext("2d");

    // Custom plugin to add center text
	// comment this out and try 6/march//
    // const centerTextPlugin = {
    // };
	// comment above out and try 6/march//

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{
                data: [easy, medium, hard],
                backgroundColor: ['#1CBABA', 'orange', 'red'],
				borderColor: 'transparent',
				borderWidth: 0, 
				borderRadius: 10,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '90%', // Adjust to make the ring thinner
			radius: '80%',
            plugins: {
                legend: { display: false} // Hide legend for a clean look
            }
        },
        plugins: [] // Register the plugin
    });
}


// Fetch data when the page loads
fetchLeetCodeStats();

// --------------- Codeforces stats ----------------------
async function fetchCodeforcesStats() {
    const username = "Itssme_Ayush"; // Replace with your Codeforces handle
    const userInfoUrl = `https://codeforces.com/api/user.info?handles=${username}`;

    try {
        const response = await fetch(userInfoUrl);
        const data = await response.json();

        if (data.status === "OK") {
            const user = data.result[0];

            // Display current & max stats
            document.getElementById("cfCurrentRating").innerText = `Current Rating: ${user.rating}`;
            document.getElementById("cfCurrentRank").innerText = `Current Rank: ${user.rank}`;
            document.getElementById("cfMaxRating").innerText = `Max Rating: ${user.maxRating}`;
            document.getElementById("cfMaxRank").innerText = `Max Rank: ${user.maxRank}`;
        }
    } catch (error) {
        console.error("Error fetching Codeforces stats:", error);
    }
}

// Fetch CF stats when page loads
fetchCodeforcesStats();

// ===== For toggling Theme ==========
// const toggleButton = document.getElementById("theme-toggle");
// const themeIcon = toggleButton.querySelector(".theme-icon");
// const body = document.body;

// // Check and apply saved theme
// if (localStorage.getItem("theme") === "dark") {
//     body.classList.add("dark-theme");
//     themeIcon.textContent = "\u2600"; // Sun emoji for light mode
// }

// toggleButton.addEventListener("click", () => {
//     body.classList.toggle("dark-theme");

//     if (body.classList.contains("dark-theme")) {
//         themeIcon.textContent = "\u2600"; // Sun emoji for light mode
//         localStorage.setItem("theme", "dark");
//     } else {
//         themeIcon.textContent = "🌙"; // Moon emoji for dark mode
//         localStorage.setItem("theme", "light");
//     }
// });

// ===================== Changed theme button ============== //
// document.querySelector('.theme-switch__checkbox').addEventListener('change', () => {
// 	document.body.style.backgroundColor = 'black';
//   });
  
const toggleCheckbox = document.querySelector('.theme-switch__checkbox');
const body = document.body;
// // Check and apply saved theme
// if (localStorage.getItem("theme") === "dark") {
//     body.classList.add("dark-theme");
// }
toggleCheckbox.addEventListener('change', () => {
    body.classList.toggle('dark-theme');
});

// scrolling wheel for work section
// document.addEventListener('DOMContentLoaded', function() {
//     const workContainer = document.querySelector('.work__container');
    
//     // Add horizontal scroll with mouse wheel
//     workContainer.addEventListener('wheel', function(e) {
//       if (e.deltaY !== 0) {
//         e.preventDefault();
//         workContainer.scrollLeft += e.deltaY;
//       }
//     }, { passive: false });
//   });

document.addEventListener('DOMContentLoaded', function() {
    const workContainer = document.querySelector('.work__container');
    
    // Add event listener for mouse wheel over the container
    workContainer.addEventListener('wheel', function(event) {
      // Prevent the default vertical scroll
      event.preventDefault();
      
      // Determine scroll amount based on the wheel delta
      const scrollAmount = event.deltaY * 2; // Adjust multiplier for sensitivity
      
      // Scroll horizontally
      workContainer.scrollLeft += scrollAmount;
    }, { passive: false });
    
    // Optional: Add scroll indicators/navigation
    const scrollIndicatorContainer = document.createElement('div');
    scrollIndicatorContainer.className = 'scroll-indicator';
    scrollIndicatorContainer.innerHTML = '<span>⟵ Scroll ⟶</span>';
    
    // Add indicator after work container
    workContainer.parentNode.insertBefore(scrollIndicatorContainer, workContainer.nextSibling);
    
    // Additional styles for the indicator
    const style = document.createElement('style');
    style.textContent = `
      .scroll-indicator {
        text-align: center;
        padding: 1rem 0;
        color: var(--text-color-light);
        font-size: 0.85rem;
        opacity: 0.7;
      }
      
      @media (hover: none) {
        .scroll-indicator {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  });


