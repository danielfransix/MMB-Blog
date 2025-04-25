/**
 * Contact form functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : '';
            const message = document.getElementById('message') ? document.getElementById('message').value.trim() : 
                            document.getElementById('comment') ? document.getElementById('comment').value.trim() : '';
            
            // Basic validation
            if (!name) {
                showFormError('Please enter your name');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormError('Please enter a valid email address');
                return;
            }
            
            if (subject && subject.length < 2) {
                showFormError('Please enter a valid subject');
                return;
            }
            
            if (!message) {
                showFormError('Please enter your message');
                return;
            }
            
            // In a real implementation, you would send the form data to a server here
            // For this demo, we'll simulate a successful form submission
            
            // Show a loading spinner
            showFormLoading();
            
            // Simulate form submission with a timeout
            setTimeout(() => {
                // Hide loading spinner and show success message
                hideFormLoading();
                showFormSuccess();
                
                // Reset the form
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    clearFormMessages();
                }, 5000);
            }, 1500);
        });
    }
    
    // Helper functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
    
    function showFormError(message) {
        clearFormMessages();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error';
        errorDiv.textContent = message;
        
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
        
        // Add style for error message
        addFormMessageStyles();
    }
    
    function showFormSuccess() {
        clearFormMessages();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success';
        successDiv.textContent = 'Your message has been sent successfully!';
        
        contactForm.insertBefore(successDiv, contactForm.firstChild);
        
        // Add style for success message
        addFormMessageStyles();
    }
    
    function clearFormMessages() {
        const messages = contactForm.querySelectorAll('.form-message');
        messages.forEach(message => message.remove());
    }
    
    function showFormLoading() {
        clearFormMessages();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        
        // Add style for loading spinner
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                display: inline-block;
                width: 15px;
                height: 15px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
                margin-right: 5px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    function hideFormLoading() {
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
    
    function addFormMessageStyles() {
        // Only add styles once
        if (!document.getElementById('form-message-styles')) {
            const style = document.createElement('style');
            style.id = 'form-message-styles';
            style.textContent = `
                .form-message {
                    padding: 12px;
                    border-radius: 4px;
                    margin-bottom: 20px;
                    font-weight: 500;
                }
                
                .form-message.error {
                    background-color: #ffe6e6;
                    color: #d63031;
                    border-left: 4px solid #d63031;
                }
                
                .form-message.success {
                    background-color: #e6fff2;
                    color: #2ecc71;
                    border-left: 4px solid #2ecc71;
                }
            `;
            document.head.appendChild(style);
        }
    }
}); 