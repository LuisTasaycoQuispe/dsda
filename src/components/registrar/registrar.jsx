
import Swal from 'sweetalert2';

export const registerUser = (e, transcribedText, setTranslatedText) => {
  e.preventDefault(); 

  const data = {
    text: transcribedText || e.target.textoTraducir.value, 
    from: e.target.textoIdiomaEntrada.value,
    to: e.target.textoATraducir.value,
  };

  const url = "https://vigilant-meme-rjgr4q4j57rhxg5r-8085.app.github.dev/api";
  
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  })
    .then((r) => {
      if (!r.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      return r.text(); 
    })
    .then((responseText) => {
      console.log("Texto traducido recibido:", responseText);

      setTranslatedText(responseText); 

      Swal.fire({
        title: "Traducción completada exitosamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    });
};
