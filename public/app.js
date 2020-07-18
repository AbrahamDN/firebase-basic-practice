document.addEventListener('DOMContentLoaded', event => {
  const app = firebase.app();
  const db = firebase.firestore();
  const productsRef = db.collection('products');

  const myPost = db.collection('posts').doc('firstpost');

  const productQuery = productsRef.where('price', '>', 10);
  //   orderBy()
  //  where().limit()

  myPost.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#title').innerHTML = data.title;
  });

  //   productQuery.get().then(products => {
  //     products.forEach(doc => {
  //       product = doc.data();
  //       document.write(`<h1> ${product.name} at £${product.price} </h1>`);
  //     });
  //   });
});

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
    });
};

const updatePost = event => {
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('firstpost');

  myPost.update({ title: event.target.value });
};

const uploadFile = files => {
  const storageRef = firebase.storage().ref();
  const fileName = document.getElementById('uploadFileInput').files[0].name;
  const fileRef = storageRef.child(fileName);

  const file = files.item(0);

  const task = fileRef.put(file);

  task.then(snapshot => {
    snapshot.ref.getDownloadURL().then(downloadURL => {
      document.querySelector('#imgUpload').setAttribute('src', downloadURL);
      alert('File successfully uploaded');
    });
  });
};
