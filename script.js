window.addEventListener('message', (event) => {
    // Verify the origin of the message to ensure it's from the trusted Netlify site
    if (event.origin === 'https://iframe-netlify-test.netlify.app') {
        if (event.data.action === 'send-data') {
            // Prepare data to send back to Netlify iframe
            const data = { message: 'Hello from GitHub iframe' };
            
            try {
                // Send data back to Netlify with the target origin specified
                window.parent.postMessage(data, 'https://iframe-netlify-test.netlify.app');
            } catch (error) {
                console.error("Failed to send message to Netlify iframe:", error);
            }
        }
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});
