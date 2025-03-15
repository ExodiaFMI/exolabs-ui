export default (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]); // remove data MIME prefix
      } else {
        reject('Failed to convert file');
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
