const socket=io.connect("http://localhost:5000");
console.log(socket.id);

const username=prompt('enter your name: ');
console.log(username);
if(username==null||username==undefined){
    window.alert("enter you name first!!"   );
    // return;
}
const totalUsers=document.getElementById('total-user');
console.log(totalUsers);
const count=document.getElementById('count');
const counts=0;



//current time
let now = new Date();
// get the current hour (from 0 to 23)
let hour = now.getHours();
// get the current minute (from 0 to 59)
let minute = now.getMinutes();
const currentTime=hour+":"+minute;
console.log(currentTime);
const typingSection=document.getElementById("typing-section");
//form -submission
const form=document.getElementById('myform');
const input=document.getElementById('msg');
const messageContainers=document.getElementById('message-containers');


// as soon as user joins then..
socket.on("welcome_message",(username)=>{
    //emiting message as soon user joins


})
if(username){
    const span=document.createElement('span');
span.innerText=`welcome ${username}`
span.setAttribute('class','span-element');
console.log(span);
const divDot=document.createElement('div');
divDot.setAttribute('class','dot');
divDot.style.display='inline-block';
console.log(divDot);
typingSection.append(divDot);
typingSection.append(span);

//displaying joined users
const div=document.createElement('div');
div.setAttribute('class','users','dynamic');
div.style.backgroundColor='bisque';
div.innerHTML=` <div class="dot"></div>
<h5 style="color: white;margin-top:-17px">${username}</h5>`
console.log('totallll',totalUsers);
totalUsers.append(div);

//sending username to server.

socket.emit('send_username',username);
//listening broadcast message









}
socket.on("get_username",(username)=>{
    const div=document.createElement('div');
div.setAttribute('class','users','dynamic');
div.style.backgroundColor='lightgray';
div.innerHTML=` <div class="dot"></div>
<h5 style="color: white;margin-top:-17px">${username}</h5>`
console.log('totallll',totalUsers);
totalUsers.append(div);
})













form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=input.value;
    // if(message===null){
    //     window.alert('enter messge')
    //     return;
    // }
    const div=document.createElement('div');
    div.classList.add('users-message');
    div.innerHTML=`<div>
    <img  class="img-class"src="https://media.istockphoto.com/id/470439259/photo/glass-globe-on-blackboard-rotation-recycle-arrow-spin.jpg?s=612x612&w=0&k=20&c=P-aJXeTNQlPz2LW2U6bYmGcx6Q0D8-UGiZFxfiQ40pA=" alt="not found" >
</div>

<div class="user-info">
    <span><b>${username}</b></span>
    <span>${currentTime}</span>
    <br>
    <div class="message-content" style="margin-left:15px">
       ${message}
    </div>

</div>`

    messageContainers.append(div);
    input.value="";
// //emiting message as soon user joins
// const span=document.createElement('span');
// span.innerText=`welcome ${username}`
// span.setAttribute('class','span-element');
// console.log(span);
// const divDot=document.createElement('div');
// divDot.setAttribute('class','dot');
// divDot.style.display='inline-block';
// console.log(divDot);
// typingSection.append(divDot);
// typingSection.append(span);
//*********************************************** *//
const data={username:username,message:message}
socket.emit("join",data);
socket.emit("send_message",data);

    
})
//broadcating messages catching.........
socket.on("user-message",(info)=>{
    const message=input.value;
    const div=document.createElement('div');
    div.classList.add('users-message','set-margin');
    div.innerHTML=`<div>
    <img  class="img-class"src="https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="not found" >
</div>

<div class="user-info">
    <span><b>${info.username}</b></span>
    <span>${currentTime}</span>
    <br>
    <div class="message-content" style="margin-left:15px">
       ${info.message}
    </div>

</div>`

    messageContainers.append(div);
    input.value="";

    //********************************** */





})
//connect event message catching.
let isConnected=true;
socket.on("connect",()=>{
    const span=document.createElement('span');
    span.innerText=`${username} has joined the group`;
    span.setAttribute('class','span-element');
    messageContainers.append(span);
    socket.emit("send_welcome_message",username);

//total counts..
socket.on("countTotalUsers",(countUsers)=>{
    console.log(countUsers,'countusers');

})
socket.on("countMinusUsers",(countUsers)=>{
    console.log(countUsers);
})

})

socket.on("welcome_message",(username)=>{
    const span=document.createElement('span');
    span.innerText=`${username} has joined the group`;
    span.setAttribute('class','span-element');
    messageContainers.append(span);
    
})
socket.on("disconnect", () => {
    
  });

//load the previous messages..
socket.on("load_messages",(data)=>{
    data.forEach(element => {
        const date=new Date(element.timestamp);
        const pastDate=date.getHours()+":"+date.getMinutes();
        const div=document.createElement('div');
    div.classList.add('users-message','set-margin');
    div.innerHTML=`<div>
    <img  class="img-class"src="https://images.unsplash.com/photo-1584994696678-3d739b5ac1bf?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="not found" >
</div>

<div class="user-info">
    <span><b>${element.username}</b></span>
    <span>${pastDate}</span>
    <br>
    <div class="message-content" style="margin-left:15px">
       ${element.message}
    </div>

</div>`

    messageContainers.append(div);
        
    });
  

})




