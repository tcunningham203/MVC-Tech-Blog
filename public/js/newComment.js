const createComment = async (event) => {
  event.preventDefault();
  const comment = document.querySelector('#post2').value.trim();
  const post_id = window.location.pathname.split('/').pop();
  if (comment) {
      const response = await fetch(`/api/comments/${post_id}`, {
          method: 'POST',
          body: JSON.stringify({ comment }),
          headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        $("#suc1").toast("show");
        setTimeout(function () {
          document.location.replace(`/comments/${post_id}`);
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
  .querySelector('.comment-form')
  .addEventListener('submit', createComment);

