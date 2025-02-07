document.addEventListener('DOMContentLoaded', function() {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const proposalSection = document.querySelector('.proposal');
    const gallerySection = document.querySelector('.gallery');

    yesButton.addEventListener('click', function() {
        alert('She said YES! ❤️ My forever starts now!');
        proposalSection.style.display = 'none';
        gallerySection.style.display = 'block';
    });

    noButton.style.position = 'absolute'; // Make the "No" button positioned absolutely

    noButton.addEventListener('click', function(event) {
        // Prevent default button behavior (like form submission if inside a form)
        event.preventDefault();

        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;
        const containerWidth = proposalSection.offsetWidth; // Keep inside proposal section
        const containerHeight = proposalSection.offsetHeight; // Keep inside proposal section

        // Calculate random positions within the container bounds,
        // ensuring the button stays fully visible.
        let newX, newY;

        // Function to generate random position, avoiding overlap with edges
        const generateRandomPosition = () => {
            newX = Math.random() * (containerWidth - buttonWidth);
            newY = Math.random() * (containerHeight - buttonHeight);

            // Ensure button stays within the proposal section bounds
            newX = Math.max(0, Math.min(newX, containerWidth - buttonWidth));
            newY = Math.max(0, Math.min(newY, containerHeight - buttonHeight));
        };

        generateRandomPosition();

        // If the new position is too close to the "Yes" button, try again
        const yesButtonRect = yesButton.getBoundingClientRect();
        const noButtonNewRect = {
            left: proposalSection.offsetLeft + newX,
            top: proposalSection.offsetTop + newY,
            width: buttonWidth,
            height: buttonHeight
        };

        // Simple check if new "No" button position overlaps with "Yes" button significantly
        const overlapThreshold = 50; // Adjust as needed, higher value = more overlap allowed
        while (rectsOverlap(yesButtonRect, noButtonNewRect, overlapThreshold)) {
            generateRandomPosition();
            noButtonNewRect.left = proposalSection.offsetLeft + newX;
            noButtonNewRect.top = proposalSection.offsetTop + newY;
        }


        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    });

    // Helper function to check if two rectangles overlap significantly
    function rectsOverlap(rect1, rect2, threshold) {
        const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
        const overlapArea = overlapX * overlapY;

        const rect1Area = rect1.width * rect1.height;
        // Check if overlap is more than 'threshold' percentage of the "Yes" button's area
        return overlapArea > (rect1Area * (threshold / 100));
    }
});