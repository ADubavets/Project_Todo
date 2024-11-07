const accessToken = localStorage.getItem('access_token');

axios.get('http://localhost:8000/todos/', {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});