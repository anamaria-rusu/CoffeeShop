
//import {verificare_email,verificare_nume,verificare_telefon,verificare_data} from '/validari.js';
//export {verificare_email,verificare_nume,verificare_telefon,verificare_data};


const sectiune = document.getElementsByClassName('feedback')[0];
const titlu= document.querySelector('h2');
const formular=document.querySelector('form');
titlu.textContent="Feedback";
titlu.style.font='Arial';
titlu.style.fontSize='30px';
titlu.style.alignContent="center";
titlu.style.marginBottom='20px';
const input_box=document.getElementById("input-box");


const input_nume=document.getElementById('input-nume');
const nume=document.createElement('input');
nume.id='nume';nume.placeholder="nume";nume.classList.add("zona_input");nume.name="nume";input_nume.append(nume);
const nume_eroare=document.createElement('div');
nume_eroare.id='nume_eroare';nume_eroare.classList.add("input_error");input_nume.append(nume_eroare);nume_eroare.textContent="Trebuie completat!";


const input_prenume=document.getElementById('input-prenume');
const prenume=document.createElement('input');
prenume.id='prenume';prenume.placeholder="prenume";prenume.classList.add("zona_input");prenume.name="prenume";input_prenume.append(prenume);
const prenume_eroare=document.createElement('div');
prenume_eroare.id='prenume_eroare';prenume_eroare.classList.add("input_error");input_prenume.append(prenume_eroare);prenume_eroare.textContent="Trebuie completat!";


const input_data=document.getElementById('input-data');
const data=document.createElement('input');
data.id='data';data.type="date";data.classList.add("zona_input");data.name="data";input_data.append(data);
const data_eroare=document.createElement('div');
data_eroare.id='data_eroare';data_eroare.classList.add("input_error");input_data.append(data_eroare);data_eroare.textContent="Trebuie completat!";


const input_telefon=document.getElementById('input-telefon');
const telefon=document.createElement('input');
telefon.id='telefon';telefon.placeholder="telefon";telefon.classList.add("zona_input");telefon.name="telefon";input_telefon.append(telefon);
const telefon_eroare=document.createElement('div');
telefon_eroare.id='telefon_eroare';telefon_eroare.classList.add("input_error");input_telefon.append(telefon_eroare);telefon_eroare.textContent="Trebuie completat!";

const input_email=document.getElementById('input-email');
const email=document.createElement('input');
email.id='email';email.placeholder="email";email.classList.add("zona_input");email.name="emial";input_email.append(email);
const email_eroare=document.createElement('div');
email_eroare.id='email_eroare';email_eroare.classList.add("input_error");input_email.append(email_eroare);email_eroare.textContent="Trebuie completat!";

const input_parere=document.getElementById('input-parere');
const parere=document.createElement('textarea');
parere.id='parere';parere.placeholder="parere";parere.classList.add("zona_input");parere.name="parere";input_parere.append(parere);
parere.style.resize="none";
const parere_eroare=document.createElement('div');
parere_eroare.id='parere_eroare';parere_eroare.classList.add("input_error");parere_eroare.textContent="Trebuie completat!";input_parere.append(parere_eroare);


const input_nota=document.getElementById('input-nota');
const nota=document.createElement('input');
nota.id='nota';nota.type="range"; nota.min="1"; nota.max="10"; nota.step="1";nota.name="nota";nota.classList.add("zona_input");input_nota.append(nota);
nota.classList.add("zona-input");
const valoare_nota=document.createElement('div');
valoare_nota.id="valoare_nota"; valoare_nota.style.alignContent="center";
valoare_nota.style.alignItems="center"; valoare_nota.style.fontSize="20px";
valoare_nota.style.marginTop="-20px";
input_nota.append(valoare_nota);



const input_checkbox=document.getElementById("input-checkbox");
const mesaj_checkbox=document.createElement('div');
mesaj_checkbox.textContent="Esti de acord cu preluarea datelor?";mesaj_checkbox.style.color="white"; mesaj_checkbox.style.fontSize="20px"; mesaj_checkbox.style.marginTop="40px";
input_checkbox.append(mesaj_checkbox);
const checkbox=document.createElement('input');
checkbox.id="checkbox"; checkbox.type="checkbox";checkbox.style.width="20px";checkbox.style.height="20px";
input_checkbox.append(checkbox);



const input_ora=document.getElementById('input-ora');
const ora=document.createElement('input');
ora.id='ora';ora.type="time";ora.classList.add("zona_input");ora.name="ora";input_ora.append(ora);



const trimite=document.createElement('button');
trimite.type="submit";
trimite.id="submit";
trimite.textContent="Submit";
trimite.style.backgroundColor="#262d78";



//-----------------------------------------------------------------------------------------------------------------------butoane + input +validare

//pentru nota 
document.getElementById("nota").oninput = (event) =>
{
    const credit = event.target.value;
    const creditValue = document.getElementById("valoare_nota");
    creditValue.innerHTML = credit;
};



//pt localSt
const input_array=document.querySelectorAll(".zona_input");
input_array.forEach(element =>{element.value=localStorage.getItem(element.getAttribute('id'))});
input_box.addEventListener('input', event=>{

    const target=event.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'){
        const id=target.id;
        const val=target.value;
        localStorage.setItem(id,val);
    }

});




//validari
input_box.addEventListener('keyup', event=>{
    const target=event.target;
    if(target.value==""){
        if (target.nextElementSibling)
            target.nextSibling.classList.add('error');
        target.classList.add('error');
    }
    else{
        if (target.nextElementSibling)
            target.nextSibling.classList.remove('error');
        target.classList.remove('error');
    }

    if(target.id=='nume' || target.id=='prenume')
        verificare_nume(target.id);
    else if(target.id=='email')
        verificare_email(target.id);
    else if(target.id=='telefon')
        verificare_telefon(target.id);
    else if(target.id=="data")
        verificare_data(target.id);
    else if(target.id=='parere'){
        if(!target.classList.contains('error'))
        target.classList.add('corect');
        else{
            target.classList.remove('corect');target.classList.add('error');
        }
    }

});




function verificare_email(target)
{
    const emailRegex=/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
    const email=document.getElementById(target);
    if(!email.value.match(emailRegex)){
        email.classList.remove('corect');
        email.classList.add('error');
    }
    else{
        email.classList.remove('error');
        email.classList.add('corect');
    }
}

function verificare_telefon(target)
{
    const telefonRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const telefon=document.getElementById(target);
    if(!telefon.value.match(telefonRegex)){
        telefon.classList.remove('corect');
        telefon.classList.add('error');
    }
       
    else{
        telefon.classList.remove('error');
        telefon.classList.add('corect');
    }
}

function verificare_nume(target)
{
    const numeRegex=/([a-zA-Z0-9_\s]+)/;
    const nume=document.getElementById(target);
    if(!nume.value.match(numeRegex)){
        nume.classList.remove('corect');
        nume.classList.add('error');
    }
    else{
        nume.classList.remove('error');
        nume.classList.add('corect');
    }
}


function verificare_data(target)
{
    const dataElement = document.getElementById(target);
    const dataValue = dataElement.value;
    const dataObiect = new Date(dataValue);
    const an = dataObiect.getFullYear();
    const luna = dataObiect.getMonth();
    const zi = dataObiect.getDate();

    if( an>1900  && an<2024){
        dataElement.classList.remove('error');
        dataElement.classList.add('corect');
    }
    else{
        dataElement.classList.remove('corect');
        dataElement.classList.add('error');
    }

}



//drag&drop

const dd_list=document.querySelectorAll(".list");
const right=document.getElementById('right');
const left=document.getElementById('left');

dd_list.forEach(list =>{
    list.addEventListener("dragstart",function(e){
        let selected = e.target;

        right.addEventListener("dragover",function(e){
            e.preventDefault();
        });

        right.addEventListener("drop", function(e){
            if(selected!=null)
                {right.append(selected); selected.classList.add("in_dd");}
            selected=null;
        });



        left.addEventListener("dragover",function(e){
            e.preventDefault();
        });

        left.addEventListener("drop", function(e){
            if(selected!=null)
                {left.append(selected); selected.classList.remove("in_dd");}
            selected=null;
        });

    
    });

});





//pentru checkbox --> apare submit

checkbox.addEventListener('click',event =>{
    if(checkbox.checked)
        formular.append(trimite);
    else
        formular.removeChild(trimite);
});


//submit
formular.addEventListener('submit', (event) =>{
    event.preventDefault();

    var verificare=true;
    input_array.forEach(element=>{
        if(element.classList.contains('error') || element.value==""){
            verificare=false; 
            element.classList.add('error')
        }});

    if(verificare)
    {
        //luam si elementele din dd cand dam submit
       
        const formData=new FormData(formular);
        const in_dd=document.getElementsByClassName("in_dd");
        if(in_dd.length){
            for(let i=0;i<in_dd.length;i++){
                formData.append(`magazin vizitat ${i+1}`,in_dd[i].textContent);
            }
        }
        const obj=Object.fromEntries(formData);
        const json = JSON.stringify(obj);
        localStorage.setItem('form',json);
        input_array.forEach(element=>{element.value=""});
        window.location.href="form_confirmare.html";
    }
});

