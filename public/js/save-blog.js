const saveBlog = async(title, content) =>{
const response = await fetch('/blogposts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, content })
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to Save blog');
  }
};
document.getElementById("save").onclick = (event) =>{
  event.preventDefault();
  const title = document.querySelector('.note-title').value;
  const text = document.querySelector('.note-textarea').value;
  saveBlog(title, text);
};