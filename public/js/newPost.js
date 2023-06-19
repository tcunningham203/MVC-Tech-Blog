const createPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post1').value.trim();
    const content = document.querySelector('#post2').value.trim();
    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            $("#suc1").toast("show");
            setTimeout(function () {
              document.location.replace(`/dashboard`);
            }, 1200);
        } else {
            $("#err2").toast("show");
            console.log(response.statusText);
        }
    } else {
        $("#err1").toast("show");
    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', createPost);