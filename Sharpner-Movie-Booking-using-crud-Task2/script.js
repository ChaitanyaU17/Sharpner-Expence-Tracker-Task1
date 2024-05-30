document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    const usernameInput = document.getElementById("username");
    const seatNoInput = document.getElementById("seat-no");
    const bookingList = document.getElementById("booking-list");
    const totalBooked = document.getElementById("total-booked");
    const movieSlotInput = document.getElementById("movie-slot");
    let bookings = [];

    addButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        const seatNo = parseInt(seatNoInput.value);
        if (!username || isNaN(seatNo)) return alert("Invalid input!");
        if (bookings.some(booking => booking.seatNo === seatNo))
            return alert("Seat already booked!");

        const booking = { username, seatNo };
        bookings.push(booking);
        updateBookings();
        saveToAPI(booking);
        clearInputs();
    });

    movieSlotInput.addEventListener("change", () => {
        const slot = parseInt(movieSlotInput.value);
        const foundBooking = bookings.find(booking => booking.seatNo === slot);
        updateBookings(foundBooking ? [foundBooking] : []);
    });

    bookingList.addEventListener("click", event => {
        const target = event.target;
        if (target.classList.contains("delete-button")) {
            const index = Array.from(bookingList.children).indexOf(target.parentElement);
            bookings.splice(index, 1);
        } else if (target.classList.contains("edit-button")) {
            const index = Array.from(bookingList.children).indexOf(target.parentElement);
            const { username, seatNo } = bookings[index];
            usernameInput.value = username;
            seatNoInput.value = seatNo;
            bookings.splice(index, 1);
        }
        updateBookings();
    });

    function updateBookings(filteredBookings = bookings) {
        bookingList.innerHTML = filteredBookings.length
            ? filteredBookings.map(({ username, seatNo }) => `
                <li>${username} - Seat ${seatNo}
                    <button class="delete-button">Delete</button>
                    <button class="edit-button">Edit</button>
                </li>
            `).join('')
            : "<h2>Nothing Present in list</h2>";
        totalBooked.textContent = bookings.length;
    }

    function clearInputs() {
        usernameInput.value = "";
        seatNoInput.value = "";
    }

    function saveToAPI(booking) {
        fetch('https://crudcrud.com/api/b13c4597a7334e928f2907f9582e348e/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });
    }
});



























