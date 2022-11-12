
const form=document.querySelectors("form");

const name=document.querySelectors("input[type=text]");

const email=document.querySelectors("input[type=email");

const password=document.querySelectors("input[type=password");

form.addEventListener("submit",onSubmitFunction);

function onSubmitFunction(){
    if(name.value==="" || email.value===""||password.value===""){
        alert("please enter the data");
        return false;
    }
}