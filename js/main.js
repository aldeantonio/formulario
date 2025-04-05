document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("meu-formulario");
  const status = document.getElementById("mensagem-estado");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.innerText = "Obrigado! O formulário foi enviado com sucesso.";
        form.reset();
      } else {
        const resData = await response.json();
        if (resData.errors) {
          status.innerText = resData.errors.map(error => error.message).join(", ");
        } else {
          status.innerText = "Ocorreu um erro ao enviar. Tente novamente.";
        }
      }
    } catch (error) {
      status.innerText = "Erro ao conectar. Verifique sua internet ou tente mais tarde.";
    }
  });
});
