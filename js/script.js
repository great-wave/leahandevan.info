function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    
    if (password === 'celebrate') {
        // Store authentication in sessionStorage
        sessionStorage.setItem('authenticated', 'true');
        
        document.getElementById('passwordPrompt').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('flex');
        document.getElementById('mainContent').classList.add('flex-col');

        console.log('About to attach menu listeners');

        $('#menuButton').on('click', () => {
            $('#mobileMenuOverlay').toggleClass('hidden');
        });

        $('#closeLink').on('click', () => {
            $('#mobileMenuOverlay').toggleClass('hidden');
        });

    } else {
        alert('Wrong password');
    }
}

document.getElementById('passwordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    const referrer = document.referrer;
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    const cameFromHomePage = referrer.includes('leahandevan.info') && 
                             (referrer.endsWith('/') || referrer.includes('/index.html'));
    
    if (isAuthenticated || cameFromHomePage) {
        // User is authenticated or came from home page
        document.getElementById('passwordPrompt').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('flex');
        document.getElementById('mainContent').classList.add('flex-col');

        $('#menuButton').on('click', () => {
            $('#mobileMenuOverlay').toggleClass('hidden');
        });

        $('#closeLink').on('click', () => {
            $('#mobileMenuOverlay').toggleClass('hidden');
        });
        
        // Set authenticated flag for future pages in this session
        sessionStorage.setItem('authenticated', 'true');

    }

});

