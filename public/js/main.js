
var numberInput = document.getElementById('number');
var messageInput = document.getElementById('message');
var button = document.getElementById('button');
var response = document.querySelector('.response');

button.addEventListener('click', send, false);

function send () {

    //remove non-numeric character
    const number = numberInput.value.replace(/\D/g, '');
    const text = messageInput.value;

    fetch('/', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
            body: JSON.stringify({number, text})
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}