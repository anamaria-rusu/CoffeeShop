
function verificare_email(target)
{
    const emailRegex=/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
    const email=document.getElementById(target);
    if(!email.value.match(emailRegex))
        email.classList.add('error');
    else
        email.classList.remove('error');
}


window.onload=()=>{

const inputs=document.getElementById('input-box');

inputs.addEventListener('keyup', event=>{
    const target=event.target;
    if(target.value=="")
        target.classList.add('error');
    else
        target.classList.remove('error');

    if(target.id=='email')
        verificare_email(target.id);
});
}