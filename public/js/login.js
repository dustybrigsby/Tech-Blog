async function signupForm(e) {
    e.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('New user created');
            alert('New user created you can now log in');
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

async function loginForm(e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('response:', response);

        if (response.ok) {
            console.log('User logged in.');
            document.location.assign('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('signup-form').addEventListener('submit', signupForm);
document.getElementById('login-form').addEventListener('submit', loginForm);