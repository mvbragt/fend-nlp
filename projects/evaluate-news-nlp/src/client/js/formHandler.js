document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Form not found');
    }
});

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    const urlInput = document.getElementById('URL').value;

    if (!urlInput) {
        alert('Please enter a URL.');
        return;
    }

    // Logging url
    console.log(`URL submitted: ${urlInput}`);

    fetch('/articleApi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // update the UI with the response
        })
        .catch((error) => {
            console.error('Error:', error.json );
        });
}

function updateUI(){

}
