class ElementLuz {
    constructor(Color,Size,Brilho) {

        this._Color = Color
        this._Size = Size
        this._Elements = []
        this._Brilho = Brilho
        this._DropShadow = true
        this._Start = Start

    }

    set Elements(number) {
        this._Elements = []
        for (let c = 0; c != number;c++) {
            this._Elements.push({ Color:this.Color})
        }
    }

    set Color(cor) {
        this._Color.push(cor)
    }

    get Color() {
        let Random = parseInt(Math.random() * this._Color.length)
        return this._Color[Random]
    }

    RandomColor() {
        for (let e in this._Elements) {
            this._Elements[e].Color = this.Color
        }
    }

    RenderElements() {

        if (this._Start == false){return}
        document.querySelector('div#Tela').innerHTML = ''

        for (let i in this._Elements) {

            let Luz = document.createElement('div')
            Luz.classList.add('Luz')

            Luz.style.width = this._Size.width+'px'
            Luz.style.height = this._Size.height+'px'

            if (this._Elements[i].Color != undefined) {

                Luz.style.backgroundColor = this._Elements[i].Color
                Luz.style.boxShadow = `0px 0px ${this._Brilho}px ${this._Elements[i].Color}`

                if (this._DropShadow == true) {
                Luz.style.filter = `drop-shadow(1px 1px 1px ${this._Elements[i].Color})`
            }
            }

            document.querySelector('div#Tela').appendChild(Luz)
        }
    }
}

var Luz = new ElementLuz([],{width:100,height:100},1)
var Tempo = 500
var Tela = false

Luz.Elements = 1
Luz.RenderElements()

document.querySelector('button#Start').addEventListener('click', () => {
    if (Luz._Start)
    {
        document.querySelector('button#Start').innerHTML = 'Start'
        Luz._Start = false
    }
    else 
    {
        document.querySelector('button#Start').innerHTML = 'Stop'
        Luz._Start = true
    }
})

document.querySelector('button#AddColor').addEventListener('click', () => {

    Luz.Color = document.querySelector('input#Cor').value
})

document.querySelector('input#Brilho').addEventListener('input', () => {

    Luz._Brilho = document.querySelector('input#Brilho').value
    Luz.RenderElements()
})

document.querySelector('button#AddDropShadow').addEventListener('click', () => {

    if (Luz._DropShadow)
    {
        document.querySelector('button#AddDropShadow').innerHTML = 'Desativar'
        Luz._DropShadow = false
    }
    else
    {
        document.querySelector('button#AddDropShadow').innerHTML = 'Ativar'
        Luz._DropShadow = true
    }
    Luz.RenderElements()
})

document.addEventListener('keydown', (Event) => {
    var key = {
        d:() => {
            if (Tela) {
                Tela = false
                document.querySelector('header').style.display = 'none'
                document.querySelector('div#Controle').style.display = 'none'
                document.querySelector('div#Tela').style.height = '100vh'
            } 
            else {
                Tela = true                
                document.querySelector('header').style.display = null
                document.querySelector('div#Controle').style.display = null
                document.querySelector('div#Tela').style.height = null
            }
        }
    }

    if (key[Event.key] == undefined) {return}
    key[Event.key]()
})

document.querySelector('input#Quantidade').addEventListener('input', () => {
    Luz.Elements = document.querySelector('input#Quantidade').value
    Luz.RenderElements()
})
document.querySelector('input#Tempo').addEventListener('input', () => {

    Tempo = document.querySelector('input#Tempo').value
})

document.querySelector('input#Tamanho').addEventListener('input', ()=> {

    let Size = document.querySelector('input#Tamanho').value
    Luz._Size = {width:Size,height:Size}
    Luz.RenderElements()
})

Luz.RenderElements()
async function Loop() {
    Esperar(Tempo)
    .then(() => {
        Luz.RandomColor()
        Luz.RenderElements()
        requestAnimationFrame(Loop)
    })
    function Esperar(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true)
            },time)
        })
    }
}
Loop()