function startRecognition(fieldId) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set the language to English
    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const field = document.getElementById(fieldId);

        // Validate and format the date
        const formattedDate = formatDate(transcript);
        if (formattedDate) {
            field.value = formattedDate;
        } else {
            alert("Invalid date format. Please try again (e.g., 19 May 2004 or 19-05-2004).");
        }
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
        alert("An error occurred with voice recognition. Please try again.");
    };
}

function formatDate(dateString) {
    // Match common date formats (e.g., 19 May 2004 or 19-05-2004)
    const regex = /^(\d{1,2})[-\s]?(\w+)[-\s]?(\d{4})$/;
    const match = dateString.match(regex);

    if (match) {
        let [_, day, month, year] = match;

        // Convert month names to numbers if necessary
        const months = {
            January: "01", February: "02", March: "03", April: "04", May: "05",
            June: "06", July: "07", August: "08", September: "09", October: "10",
            November: "11", December: "12"
        };

        if (isNaN(month)) {
            month = months[month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()] || month;
        }

        // Ensure day and month are two digits
        day = day.padStart(2, '0');
        month = month.padStart(2, '0');

        // Return the formatted date
        return `${day}-${month}-${year}`;
    }

    return null; // Return null if the date format is invalid
}
