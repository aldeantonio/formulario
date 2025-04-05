document.getElementById('meu-formulario').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const botao = document.getElementById('botao-enviar');
  const mensagem = document.getElementById('mensagem-estado');

  botao.disabled = true;
  mensagem.textContent = 'A enviar...';

  const formData = new FormData(form);

  fetch('https://formspree.io/f/movekgan', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      mensagem.textContent = 'Dados enviados com sucesso!';
      form.reset();
    } else {
      mensagem.textContent = 'Ocorreu um erro. Tente novamente.';
    }
    botao.disabled = false;
  }).catch(error => {
    mensagem.textContent = 'Erro ao enviar. Verifique a ligação.';
    botao.disabled = false;
  });
});