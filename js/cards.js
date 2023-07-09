const cards = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
    const data = await response.json();
    const cardContainer = document.querySelector('#card-container');
    data.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card';
      const img = document.createElement('img');
      img.src = 'https://avatars.mds.yandex.net/i?id=4394642a2c8edc0d5ea50798721f12a6f92bfb20-9097381-images-thumbs&n=13';
      const title = document.createElement('h4');
      title.textContent = post.title;
      const description = document.createElement('p');
      description.textContent = post.body;
      card.append(img);
      card.append(title);
      card.append(description);
      cardContainer.append(card);
    });
  } catch (error) {
    console.error(error, 'ERROR');
  }
}
cards()
