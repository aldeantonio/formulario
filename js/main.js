
document.getElementById('meu-formulario').addEventListener('submit', function (e) {
  e.preventDefault();

  const botao = document.getElementById('botao-enviar');
  const estado = document.getElementById('mensagem-estado');
  const form = e.target;

  botao.disabled = true;
  estado.textContent = 'A enviar...';

  // Obter todos os dados
  const dados = {
    nome: form.nome.value,
    email: form.email.value,
    telefone: form.telefone.value,
    tipo_servico: form.tipo_servico.value,
    tipo_projeto: Array.from(form.querySelectorAll('input[name="tipo_projeto"]:checked')).map(el => el.value),
    orcamento: form.orcamento.value,
    data_entrega: form.data_entrega.value,
    horario_meeting: form.horario_meeting.value,
    comentarios: form.comentarios.value
  };

  // Enviar para o Formspree
  fetch('https://formspree.io/f/meqwydpr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(res => {
    if (res.ok) {
      estado.textContent = 'Mensagem enviada com sucesso!';
      form.reset();
    } else {
      estado.textContent = 'Erro ao enviar. Tente novamente.';
    }
    botao.disabled = false;
  })
  .catch(() => {
    estado.textContent = 'Erro de rede. Verifique a conexão.';
    botao.disabled = false;
  });
});
