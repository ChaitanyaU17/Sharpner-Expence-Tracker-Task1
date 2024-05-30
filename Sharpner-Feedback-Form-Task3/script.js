document.addEventListener('DOMContentLoaded', function() {
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };

    const overallRatingSpans = document.querySelectorAll('.header h4 span');
    const feedbackList = document.querySelector('.feedback-list ul');

    const updateOverallRatings = () => {
        overallRatingSpans.forEach((span, index) => {
            span.textContent = ratingCounts[index + 1];
        });
    };

    const addFeedbackToList = (name, rating) => {
        const li = document.createElement('li');
        li.dataset.rating = rating;
        li.innerHTML = `
            ${name} - ${rating}
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        feedbackList.appendChild(li);
    };

    const deleteFeedback = (li) => {
        const rating = li.dataset.rating;
        ratingCounts[rating]--;
        updateOverallRatings();
        li.remove();
    };

    const editFeedback = (li) => {
        const newName = prompt("Enter new name:");
        const newRating = prompt("Enter new rating:");
        if (newRating >= 1 && newRating <= 5) {
            ratingCounts[newRating]++;
            li.dataset.rating = newRating;
            li.textContent = `${newName} - ${newRating}`;
            updateOverallRatings();
            submitBtn.textContent = "Submit";
        } else {
            alert("Please enter a rating between 1 and 5.");
        } 
    };

    document.querySelector('.form button').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const rating = document.getElementById('select-rating').value;
        if (username && rating) {
            ratingCounts[rating]++;
            updateOverallRatings();
            addFeedbackToList(username, rating);
            document.getElementById('username').value = '';
            document.getElementById('select-rating').selectedIndex = 0;
            saveToApi(username, rating);
        } else {
            alert('Please enter your name and select a rating.');
        }
    });

    const saveToApi = (username, rating) => { 
        axios.post('https://crudcrud.com/api/9177dbe23b2745b18e512e53cd838012/project', {
            name: username,
            rating: rating
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
    
    feedbackList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            editFeedback(target.parentNode);
        } else if (target.classList.contains('delete-btn')) {
            deleteFeedback(target.parentNode);
        }
    }); 
});