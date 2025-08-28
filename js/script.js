function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    
    if (password === 'celebrate') {
        document.getElementById('passwordPrompt').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('flex-col');

    } else {
        alert('Wrong password');
    }
}