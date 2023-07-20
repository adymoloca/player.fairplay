export async function getBase64Image(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (err) => {
        reject(err);
      }
    });
}