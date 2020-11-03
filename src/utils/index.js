/**
 * Mock HTTP request in javascript using promise and timeout
 * @param {*} successObject 
 * @param {*} timeout 
 */
export const mock = (successObject = null, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (successObject != null) {
        resolve({
            status: 200,
            data: successObject
        });
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });
};
