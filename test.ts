type Option = 1 | -1

let possibleOptions : Option[] = [];

possibleOptions.push(-1) // pero no acepta otra opcion que 1 o -1 

//-------------------

let a: Record<number, string | boolean>;

a = {
    0: 'Hola',
    1: 'adios',
    //2: 1, no acepta values que no sean string o boolean
    3: false,
}


//-------------------

/*
    1-si tenes algo como console.log(input?.value) solo se hara el console log si input != null
    2-si tenes algo como const a = funcion()!  con el '!' le avisas a .ts que el valor no va a ser null, aun asi es peligroso 
        ya ts cree en tu palabra y se desprotege de un posiblee null
    3- podes renombrar el type de una funcion nativa con 'as' -> document.getElementById(...) as HTMLInputElement | null

    4- variables o parametros opcionales

    const a (msg?: string) => {}

    type User = {
    name: string,
    age: string,
    role?: 'admin' | 'guest'
    }

*/ 