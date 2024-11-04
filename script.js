const communicationLog = document.getElementById('communication-log');

window.addEventListener('message', (event) => {
    if (event.origin === 'https://iframe-netlify-test.netlify.app') {
        if (event.data.action === 'process-payment') {
            const paymentData = event.data.data;

            // Simulate processing the payment and generating a response
            const responseData = {
                type: "PAYMENT_STATUS",
                status: "SUCCESS",
                data: {
                    transactionId: `TXN-${Math.random().toString(36).substring(2, 10)}`,
                    timestamp: new Date().toISOString(),
                    amount: paymentData.amount,
                    currency: paymentData.currency,
                    orderId: paymentData.orderId,
                    processingId: `PROC-${Math.random().toString(36).substring(2, 10)}`
                }
            };

            // Log the payment processed message
            communicationLog.innerHTML += `<br>GitHub: Payment processed: ${JSON.stringify(responseData)}`;

            // Send response back to Netlify iframe
            try {
                window.parent.postMessage(responseData, 'https://iframe-netlify-test.netlify.app');
            } catch (error) {
                console.error("Failed to send message to Netlify iframe:", error);
            }
        }
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});
