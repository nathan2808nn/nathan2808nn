document.addEventListener("DOMContentLoaded", function () {
    const momeinput = document.getElementById('nome');
    const emailinput = document.getElementById("email");
    const semhalinput = document.getElementById("senha");

    const erroNome = document.getElementById('erroNome');
    const erroEmail = document.getElementById('erroEmail');
    const erroSenha = document.getElementById('erroSenha');
    const submitButton = document.getElementById('submit');

    function validarNome() {
        if (momeinput.value.trim() === "") {
            momeinput.classList.add("Invalid");
            erroNome.style.display = "block";
        } else {
            momeinput.classList.remove("Invalid");
            erroNome.style.display = "none";
        }
    }

    function validarEmail() {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexEmail.test(emailinput.value)) {
            emailinput.classList.add("Invalid");
            erroEmail.style.display = "block";
        } else {
            emailinput.classList.remove("Invalid");
            erroEmail.style.display = "none";
        }
    }

    function validarSenha() {
        const senha = semhalinput.value;
        const regexsenha = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
        if (!regexsenha.test(senha)) {
            semhalinput.classList.add("Invalid");
            erroSenha.style.display = "block";
        } else {
            semhalinput.classList.remove("Invalid");
            erroSenha.style.display = "none";
        }
    }

    function validarFormulario() {
        if (
            momeinput.value.trim() !== "" &&
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailinput.value) &&
            /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(semhalinput.value)
        ) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    momeinput.addEventListener("input", function () {
        validarNome();
        validarFormulario();
    });

    emailinput.addEventListener('input', function () {
        validarEmail();
        validarFormulario();
    });

    semhalinput.addEventListener('input', function () {
        validarSenha();
        validarFormulario();
    });

    document.getElementById('formulario').addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Formulário enviado com sucesso!');
    });
});
