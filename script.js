
const div_divOriginal = () => {

    var section_criadora = document.createElement("section")
    section_criadora.setAttribute("id","criadora")
    section_criadora.setAttribute("class" , "bloco-principal ZeroUm a_trocar")

    var div = document.createElement("div")
    var Div = document.createElement("div")

    var input_original_titulo = document.createElement("input")
    input_original_titulo.setAttribute("type", "text")
    input_original_titulo.setAttribute("id", "titulo")
    input_original_titulo.setAttribute("name", "text")
    input_original_titulo.setAttribute("placeholder", "Digite o Titulo ...")

    var textarea_Nota = document.createElement("textarea")
    textarea_Nota.setAttribute("name", "conteudo_da_Nota")
    textarea_Nota.setAttribute("id", "conteudo_da_Nota")
    textarea_Nota.setAttribute("placeholder", "digite aqui a nota...")
    
    var button = document.createElement("button")
    button.innerHTML = "salvar"
    button.setAttribute("onclick", "setNewContentNote();criar_div_Aside ()")
    
    div.appendChild(input_original_titulo)
    Div.appendChild(textarea_Nota)

    
    section_criadora.appendChild(div)
    section_criadora.appendChild(Div)
    section_criadora.appendChild(button)

    document.getElementById("centro").appendChild(section_criadora)



}

var nota_index = localStorage.length 

function setNewContentNote(){

    if(document.getElementById("titulo").value != "" && document.getElementById("conteudo_da_Nota").value != ""){
    
    var titulo = document.getElementById("titulo").value
    var conteudo = document.getElementById("conteudo_da_Nota").value

    const nota = {
        titulo: titulo,
        conteudo:conteudo,
        index: nota_index
    }

    let nota_stringtfy = JSON.stringify(nota) /*que coisa UTIL NAMORAL, se usar isso com o parse, nossssa, ajuda demais na vida*/ 


    localStorage.setItem(nota_index, `${nota_stringtfy}`)   /*depois é so "descompactar" com o parse a string inserida, namoral, genial.*/     
    nota_index += 1
    
    const intervalo = setInterval (() => {
        document.getElementById("titulo").value = ""
        document.getElementById("conteudo_da_Nota").value = ""
        clearInterval(intervalo)// para impedir que seja impossivel digitar
    }, 10); /*para nao quebrar a afunção de criar div no aside */


} else {
    alert("Complete a sua nota, por favor.")
}


    
}

function mostrar(mostrar_esta_nota){



    var nota = JSON.parse(localStorage[mostrar_esta_nota])

    var section_antiga = document.getElementsByClassName("ZeroUm")[0]

    var section = document.createElement("section")
    section.setAttribute("class","bloco-principal a_trocar")
    
    var div = document.createElement("div")
    div.setAttribute("id", "div-a-trocar1")
    var Div = document.createElement("div")
    Div.setAttribute("id", "div-a-trocar2")
    var div3 = document.createElement("div")
    div3.setAttribute("style" , "display: grid; place-items: center; ")
    div3.setAttribute("class", "alterações")

    var img = document.createElement("img")
    img.setAttribute("src", "src/apagar.png")
    img.setAttribute("id", "apagar-nota")
    img.setAttribute("onclick", "apagar_nota(this.getAttribute('index1'))")
    img.setAttribute("index1", mostrar_esta_nota)

    var editar = document.createElement("img")
    editar.setAttribute("src", "src/editar.png")
    editar.setAttribute("id", "editar")
    editar.setAttribute("onclick", "editar_alteracao(this.getAttribute('index1'))")
    editar.setAttribute("index1", mostrar_esta_nota)
    
    div3.appendChild(img)
    div3.appendChild(editar)

    var titulo_Novo = document.createElement("input")
    titulo_Novo.setAttribute("type", "text")
    titulo_Novo.setAttribute("id", "titulo")
    titulo_Novo.setAttribute("name", "text")
    titulo_Novo.readOnly = true
    titulo_Novo.value = nota.titulo

    var conteudo_Novo = document.createElement("textarea")
    conteudo_Novo.setAttribute("id","conteudo_da_Nota")
    conteudo_Novo.readOnly = true
    conteudo_Novo.value = nota.conteudo

    div.appendChild(titulo_Novo)
    Div.appendChild(conteudo_Novo)

    section.appendChild(div)
    section.appendChild(Div)
    section.appendChild(div3)

    divOriginal = section_antiga

    document.getElementById("voltar").style.display = "flex"

    var div_a_trocar = document.getElementsByClassName("a_trocar")[0]
    document.getElementById("centro").removeChild(div_a_trocar)
    document.getElementById("centro").appendChild(section) 
    
    // neste caso, errei aqui por besteira, bastava colocar um appendChild e o section, coisa que eu tentei antes, mas nao foi, mas enfim ne

    
}

function aparecer_aside(){


    var aside = document.querySelector(".aside")

    if (aside.style.display == "" || aside.style.display == "none" ){
        aside.style.display = "flex"
    } else {
        aside.style.display = "none"
    }
    
    if (document.getElementsByTagName("aside")[0].innerHTML == ''){
        for(let valuesSeila = 0; valuesSeila < localStorage.length; valuesSeila++){
        var divNova = document.createElement("div")
        divNova.setAttribute("indexNote", valuesSeila)
        divNova.setAttribute("class", "divs-aside")
        divNova.setAttribute("onclick", "mostrar(this.getAttribute('indexNote'))")

        var valor_titulo1 = JSON.parse(localStorage[Number(valuesSeila)])
    
        var paragrafoDaDiv = document.createElement("p")
        paragrafoDaDiv.innerHTML = valor_titulo1.titulo
    
        
    
        divNova.appendChild(paragrafoDaDiv)
    
        document.getElementsByClassName("aside")[0].appendChild(divNova)
        }
    }

}

function criar_div_Aside (){
    
    if (document.getElementById("titulo").value != "" && document.getElementById("conteudo_da_Nota").value != ""){

    var divNova = document.createElement("div")
    divNova.setAttribute("indexNote", nota_index - 1)
    divNova.setAttribute("class", "divs-aside")
    divNova.setAttribute("onclick", "mostrar(this.getAttribute('indexNote'))")

    var valor_titulo = JSON.parse(localStorage[Number(nota_index) - 1])

    var paragrafoDaDiv = document.createElement("p")
    paragrafoDaDiv.innerHTML = valor_titulo.titulo


    divNova.appendChild(paragrafoDaDiv)

    document.getElementsByClassName("aside")[0].appendChild(divNova)
    } 
}

function voltar(){
    var div_a_trocar = document.getElementsByClassName("a_trocar")[0]
    document.getElementById("centro").removeChild(div_a_trocar)
    div_divOriginal()
    document.getElementById("voltar").style.display = "none"

}

function limpar(este){
    for(let apagar = 0; apagar <= este; apagar++){  
        localStorage.removeItem(apagar)
    }
}

function apagar_nota(esta){
    if (confirm("esta nota sera apagada") == true){
    localStorage.removeItem(esta)
    voltar()
    var atualizar_aside = document.getElementsByClassName("aside")[0]
    atualizar_aside.getElementsByClassName("divs-aside")[esta].style.display = "none"
    } 
}



const criar_icon_salvar = (save) =>{
    var aondeCriar = document.getElementsByClassName("alterações")[0]

    var salvar = document.createElement("img")
    salvar.setAttribute("src", "src/salvar.png")
    salvar.setAttribute("id", "salvar")
    salvar.setAttribute("index1", save)
    salvar.setAttribute("onclick", "salvar_edicao(this.getAttribute('index1'))")
    
    aondeCriar.appendChild(salvar)


}

function salvar_edicao(isto){
    
    var novo_titulo = document.getElementById("titulo").value
    var nova_nota = document.getElementById("conteudo_da_Nota").value

    const nota = {
        titulo: novo_titulo,
        conteudo:nova_nota,
        index: isto
    }

    document.getElementsByClassName("divs-aside")[isto].innerHTML = `<p>${novo_titulo}</p>`

    var valores_a_serem_substituidos = JSON.stringify(nota)

    localStorage.setItem(isto, `${valores_a_serem_substituidos}` )
    
    document.getElementsByTagName("input")[0].readOnly = true
    document.getElementsByTagName("textarea")[0].readOnly = true 

    document.getElementById("salvar").style.display = "none"


}

function editar_alteracao(editar_esta_nota){

    var atualizar_titulos = document.getElementsByTagName("input")[0]
    atualizar_titulos.readOnly = false

    var atualizar_Nota = document.getElementsByTagName("textarea")[0]
    atualizar_Nota.readOnly = false 

    criar_icon_salvar(editar_esta_nota)

}