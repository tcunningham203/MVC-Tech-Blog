const deletePost = async (event) => {
    event.preventDefault();
    const post_id = window.location.pathname.split("/").pop();
    try {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            $("#suc3").toast("show");
            setTimeout(function () {
              document.location.replace(`/dashboard`);
            }, 1200);
        } else {
            $("#err3").toast("show");
            console.log(response.statusText);
        }
    } catch (error) {
        console.log(err);
    }
};

const updatePost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post1').value.trim();
    const content = document.querySelector('#post2').value.trim();
    const post_id = window.location.pathname.split("/").pop();
    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
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
    .querySelector('.update-btn')
    .addEventListener('click', updatePost);

document
    .querySelector('.delete-btn')
    .addEventListener('click', deletePost);