

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
        status.classList.remove("ocultar"); // Mostra

        form.reset();

        // Desaparece com transição
        setTimeout(() => {
          status.classList.add("ocultar"); // Aplica o fade
          setTimeout(() => {
            status.innerText = ""; // Limpa o texto depois do fade
          }, 500); // Espera o tempo da transição
        }, 2000);
      } else {
        const resData = await response.json();
        if (resData.errors) {
          status.innerText = resData.errors.map(error => error.message).join(", ");
        } else {
          status.innerText = "Ocorreu um erro ao enviar. Tente novamente.";
        }
        status.classList.remove("ocultar");
      }
    } catch (error) {
      status.innerText = "Erro ao conectar. Verifique sua internet ou tente mais tarde.";
      status.classList.remove("ocultar");
    }
  });
});
