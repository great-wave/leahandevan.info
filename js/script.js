function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const correctPassword = 'celebrate';
    
    if (input === correctPassword) {
        // Hide prompt, show content
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        // Show error
        alert('Wrong password');
    }
}