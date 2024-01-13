// Register a listener for the DOMContentLoaded event. This is triggered when the HTML is loaded and the DOM is constructed.
// We are doing this because the script is loaded in the head of the document, so the DOM is not yet constructed when the script is executed.
document.addEventListener("DOMContentLoaded", (_event) => {
    alert("After DOM has loaded");


    var existingInput = document.getElementById('city-input');

    // Apply your autocomplete logic here
    // For example, attaching an event listener
    existingInput.addEventListener('input', function() {
        // Your autocomplete logic here
    });
});