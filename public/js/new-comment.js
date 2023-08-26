async function newComment(e) {
    e.preventDefault();

    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();

    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentText) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment_text: commentText,
                post_id: postId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {

            alert(response.statusText);
        }
    }
}

document.querySelector('#comment-form').addEventListener('submit', newComment);