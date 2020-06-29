function formatPhoneText(contact){

    contact = replaceAll(contact.trim(),"-","");

    if(contact.length > 3 && contact.length <= 6)
        contact = contact.slice(0,3) + "-" + contact.slice(3);
    else if(contact.length > 6)
        contact = contact.slice(0,3) + "-" + contact.slice(3,6) + "-" + contact.slice(6);

    return contact;
}

function replaceAll(src,search,replace){
    return src.split(search).join(replace);
}

export default formatPhoneText;