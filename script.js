let authInstance;

// Initialize the Google API client
function initGoogleAuth() {
    gapi.load('auth2', () => {
        authInstance = gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
            scope: 'profile email'
        });
    });
}

// Handle login
document.getElementById('login-btn').addEventListener('click', async () => {
    try {
        const user = await authInstance.signIn();
        const profile = user.getBasicProfile();

        document.getElementById('user-photo').src = profile.getImageUrl();
        document.getElementById('user-name').textContent = `Welcome, ${profile.getName()}`;
        document.getElementById('user-info').classList.remove('hidden');
        document.getElementById('upload-section').classList.remove('hidden');
        document.getElementById('login-btn').classList.add('hidden');
    } catch (err) {
        console.error('Error during sign-in', err);
    }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    authInstance.signOut();
    document.getElementById('user-info').classList.add('hidden');
    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('login-btn').classList.remove('hidden');
});

// File upload handler
document.getElementById('upload-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileToUpload');
    const file = fileInput.files[0];

    if (file) {
        console.log('File selected:', file.name);
        alert(`File "${file.name}" uploaded successfully.`);
    } else {
        alert('Please select a file to upload.');
    }
});

// Initialize Google Auth on load
window.onload = initGoogleAuth;
