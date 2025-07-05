
    //document.querySelector('#boton').style.display = 'none'
    const printSection = document.createElement('div')
    document.querySelector('div').style.display = 'flex'
    document.querySelector('div').style.height = '90vh'
    const elemToPrint = document.querySelector('#img')
    printSection.innerHTML = elemToPrint
    let domClone = elemToPrint.cloneNode(true);
    printSection.appendChild(domClone);
    window.print(); 
    window.onafterprint = afterPrint;
    function afterPrint(){
        window.location.replace('./auditorio.html')
    }
    setInterval(afterPrint, 500)
    