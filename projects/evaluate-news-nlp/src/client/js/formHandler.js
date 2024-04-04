document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Form not found');
    }
});

function isValidUrl(url) {
    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;
    return urlRegex.test(url);
}

export function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    const inputUrl = document.getElementById('inputUrl').value;

    if (!inputUrl) {
        alert('Please enter a URL.');
        return;
    }
    if (!isValidUrl(inputUrl)) {
        alert('Please enter a valid URL.');
        return;
    }

    // Logging url
    console.log(`inputUrl submitted: ${inputUrl}`);

    fetch('http://localhost:8081/articleApi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputUrl: inputUrl }),
    })
        .then(response => response.json())
        .then(data => {
                // Update the UI with the response data
                document.getElementById('sentiment-result').textContent = data.score_tag || 'N/A';
                document.getElementById('confidence-result').textContent = data.confidence ? data.confidence + '%' : 'N/A';
                document.getElementById('agreement-result').textContent = data.agreement || 'N/A';
                document.getElementById('subjectivity-result').textContent = data.subjectivity || 'N/A';
                document.getElementById('irony-result').textContent = data.irony || 'N/A';
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error );
        });
}
