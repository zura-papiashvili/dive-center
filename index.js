function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Add this function to close the menu when a link is clicked
function closeMenu() {
  var x = document.getElementById("myTopnav");
  if (x.className.includes("responsive")) {
    x.className = "topnav";
  }
}

function setImagesBasedOnScreenSize() {
  const courseContentElements = document.querySelectorAll(".course-content");

  courseContentElements.forEach(function (courseContentElement) {
    // Get the value of the data-src attribute
    const backgroundImageUrl = courseContentElement.getAttribute("data-src");

    // Check if the screen width is greater than or equal to 769 pixels
    if (window.innerWidth >= 769) {
      // Set the background image dynamically using CSS
      courseContentElement.style.backgroundImage = `url('${backgroundImageUrl}')`;
      courseContentElement.style.backgroundSize = "cover";

      // Reset img element src to an empty string
      const imgElement = courseContentElement.querySelector("img");
      if (imgElement) {
        imgElement.src = "";
      }
    } else {
      // Set the background image to none
      courseContentElement.style.backgroundImage = "none";

      // Get the img element inside the courseContentElement
      const imgElement = courseContentElement.querySelector("img");
      console.log(imgElement);
      // Set the src attribute of the img element
      if (imgElement) {
        imgElement.src = backgroundImageUrl;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", setImagesBasedOnScreenSize);

// Add event listener for window resize
window.addEventListener("resize", setImagesBasedOnScreenSize);

// Function to handle the intersection observer callback
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); // Add 'visible' class when element is in view
      observer.unobserve(entry.target); // Stop observing once it's visible
    }
  });
}

// Create an Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Use the viewport as the root
  rootMargin: "0px", // No margin around the root
  threshold: 0.5, // Trigger when at least 50% of the element is visible
});

// Observe each .course-content element
const courseContentElements = document.querySelectorAll(".course-content");
courseContentElements.forEach((courseContentElement) => {
  observer.observe(courseContentElement);
});
