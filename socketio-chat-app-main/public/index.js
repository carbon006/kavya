
const chatConsole = document.querySelector('.chat-console')
var myMsg = ''
const ws = new WebSocket('ws://localhost:8080/')

ws.addEventListener('open', function (event) {
    ws.send('Hello Server!');
});
ws.addEventListener('message', function (event) {
    if(event.data!==myMsg.toString()){
        createMsg(event.data,'server-messege')
    }
    console.log('Message from server ', event.data);
});

//


const form = document.querySelector('.form-msg')

form.addEventListener('submit',function(event){
    event.preventDefault()
    var msg =  event.target.msg.value
    createMsg(msg,'my-messege')
    ws.send(msg)
    myMsg = msg
})


function createMsg(data,myClass){
    const myDiv = document.createElement('div')
    myDiv.classList.add('msg')
    const myMsg = document.createElement('h3')
    myMsg.classList.add(myClass)
    myMsg.innerText =data
    myDiv.appendChild(myMsg)
    chatConsole.appendChild(myDiv)

}