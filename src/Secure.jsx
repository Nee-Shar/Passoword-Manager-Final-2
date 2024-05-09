import CryptoJS from "crypto-js";

const key = import.meta.env.VITE_ENCRYPT_KEY;

export function eencrypt(text, key) {
  const cipher_Text = CryptoJS.AES.encrypt(
    JSON.stringify({ text }),
    key
  ).toString();
  //console.log(cipher_Text);
  // const encData = CryptoJS.enc.Base64.stringify(
  //   CryptoJS.enc.Utf8.parse(cipher_Text)
  // );
  return cipher_Text;
}

export function decrypt(text, key) {
  const bytes = CryptoJS.AES.decrypt(text, key);
  //console.log(bytes);
  const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalText.text;
}

export async function GeneratePassword() {
  return fetch(
    "https://api.genratr.com/?length=16&uppercase&lowercase&special&numbers"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      return data.password; // Return only the password string
    });
}
