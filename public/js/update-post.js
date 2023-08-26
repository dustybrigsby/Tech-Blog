async function updatePost(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const postText = document.querySelector('textarea[name="post-text"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            post_text: postText,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#update-post-form').addEventListener('submit', updatePost);