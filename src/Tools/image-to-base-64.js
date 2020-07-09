class ImageToBase64 {

  transform(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = _ => resolve(reader.result);
      reader.onerror = e => reject(e);
    });
  }
}

export default new ImageToBase64();