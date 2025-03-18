// Mobile Navigation Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Booking Form Submission
const bookingForm = document.getElementById("bookingForm");
const bookingModal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const confirmationEmail = document.getElementById("confirmationEmail");

bookingForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get email for confirmation message
  const emailValue = document.getElementById("email").value;
  confirmationEmail.textContent = emailValue;

  // Show the modal
  bookingModal.style.display = "flex";

  // Reset form
  bookingForm.reset();
});

// Close modal functions
closeModal.addEventListener("click", () => {
  bookingModal.style.display = "none";
});

closeModalBtn.addEventListener("click", () => {
  bookingModal.style.display = "none";
});

// Close modal if clicked outside content
window.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.style.display = "none";
  }
});

// Set minimum dates for check-in and check-out
const checkInInput = document.getElementById("checkIn");
const checkOutInput = document.getElementById("checkOut");

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Format dates for input
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

checkInInput.min = formatDate(today);
checkOutInput.min = formatDate(tomorrow);

// Update check-out min date when check-in changes
checkInInput.addEventListener("change", () => {
  const checkInDate = new Date(checkInInput.value);
  const minCheckOutDate = new Date(checkInDate);
  minCheckOutDate.setDate(checkInDate.getDate() + 1);

  checkOutInput.min = formatDate(minCheckOutDate);

  // Reset check-out if it's now before check-in
  if (new Date(checkOutInput.value) <= checkInDate) {
    checkOutInput.value = formatDate(minCheckOutDate);
  }
});
