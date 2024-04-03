document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Form not found');
    }
});

export function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    const txtInput = document.getElementById('inputText').value;

    if (!inputText) {
        alert('Please enter some text.');
        return;
    }

    // Logging url
    console.log(`inputText submitted: ${inputText}`);

    fetch('http://localhost:8081/articleApi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText: inputText }),
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
