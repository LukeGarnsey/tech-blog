const saveComment = async(content, blogpost_id) =>{
  const response = await fetch('/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, blogpost_id })
    });
    if (response.ok) {
      document.location.replace(window.location.href);
    } else {
      alert('Failed to Save comment');
    }
  };
  document.getElementById("save").onclick = (event) =>{
    event.preventDefault();
    const text = document.getElementById("comment-field").value;
    const data = document.getElementById("comment-field").dataset.blogid;
    saveComment(text, data);
  };