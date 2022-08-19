// https://lenguajejs.com/javascript/asincronia/que-es/
// En el siguiente código se tiene un retardo simulado (de 3 seg) para probar las promesas (en este ejemplo el retardo sería síncrono)


let myPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('Te saludo tras 3 segundos!! ');
    }, 3000);
  });
  
  myPromise.then(function(value) {
    console.log(value);
  });
  
  console.log(myPromise);
  console.log(typeof myPromise);


  // El código de la promesa está definido en las líneas 6, 7 y 8. Es un 'timer' que contiene una función que escupe un string: 'Te saludo tras 3 segundos!! '

  // Los parámetros de esta función se usan para hacer un 'return' dividido:

        // 'resolve' es un 'return' que se ejecuta cuando todo ha ido bien.

        // 'reject' es un 'return' que se ejecuta para cuando todo ha ido mal.


// Tras lo dicho, al ejecutar el código anterior se ejecutará primero el console.log de la línea 15, y tras 3 segundos, el código de la línea 12.


// Los pasos de ejecución del objeto 'promise' consisten en que cuando pasan 3 segundos devuelve el contenido de 'resolve' (en este ejemplo, reject no está definido). Esta promesa no terminaría hasta que se ejecute un 'resolve' o un 'reject'. Peticiones a la web pueden tardar 'x' tiempo, y después resolverse o no, dependiendo de múltiples factores.

// Entonces, cuando termina 'myPromise', en la línea 11 hay un 'then' para este objeto ('myPromise') que actua como si fuera un listener, el cual, cuando se resuelve favorablemente ('resolve'), toma el contenido de 'resolve' y se lo pasa por parámetro a la función dentro de 'then' para los casos favorables. En caso de que la promesa se resuelva como 'reject' (no se cumpla o desfavorable), hace lo mismo, pero con la función dentro de 'catch'.


// Si la promesa SÍ se cumple:
// Promise = 'resolve' --> .then("Código favorable")

// Si la promesa NO se cumple:
// Promose = 'reject' --> .catch("Código desfavorable")






const guardaAleatorios = (iterations) => new Promise((resolve, reject) => {
    const numbers = [];
    for (let i = 0; i < iterations; i++) {
      const number = 1 + Math.floor(Math.random() * 6);
      numbers.push(number);
      if (number === 6) {
        reject({
          error: true,
          message: "Se ha sacado un 6"
        });
      }
    }
    resolve({
      error: false,
      value: numbers
    });
  });
  guardaAleatorios(10)
    .then(result => console.log("Tiradas correctas: ", result.value))
    .catch(err => console.error(err.message));






/////////////   promise.RACE   /////////////

// Se queda con el primer dato que llega.

// Para cuando tienes varias fuentes de datos y nos vale el primero que llegue:

let p1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 400, "Promesa 1");
});
let p2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 200, "Promesa 2");
});

Promise.race([p1, p2]).then(function(value) {
  console.log(value); // "segunda" - Promesa 2 más rápida
});





/////////////   promise.ALL   /////////////

// Hace que se tengan que cumplir todas las promesas para terminar. Se demorará el tiempo que tarde la promesa con más demora

// Para cuando se quiere que todas las promesas se cumplan porque se tienen varias fuentes de datos y se quiere esperar a que estén todos los datos disponibles para reflejarlos al mismo tiempo

let error = false

    let pr1 = new Promise(function(resolve, reject) {
      console.log("Promesa 1 - Iniciada");
      setTimeout(resolve, 1100, "Promesa 1 - Terminada");
    });

    let pr2 = new Promise(function(resolve, reject) {
      console.log("Promesa 2 - Iniciada");
      setTimeout(resolve, 1800, "Promesa 2 - Terminada");
    });

    let pr3 = new Promise(function(resolve, reject) {
      if(error) {
        reject("modo error Activado");
        } else {
        console.log("Promesa 3 - Iniciada");
        setTimeout(resolve, 2900, "Promesa 3 - Terminada");
        }
      });

    let pr4 = new Promise(function(resolve, reject) {
      console.log("Promesa 4 - Iniciada");
      setTimeout(resolve, 5100, "Promesa 4 - Terminada");
      });

    Promise.all([pr1, pr2, pr3, pr4])
      .then(function(value) {
        console.info("Promise.all -> TODAS las promesas terminadas", value)}, 
        function(reason) {
        console.log("Ups...hubo algún error!", reason)
        });








//////////// API FETCH: ACCESO A DATOS ///////////////

// La llamada a 'fetch()' devuelve un objeto tipo 'Promise', así que se aplica lo visto anteriormente.

// Petición básica GET (HTML) con fetch():

fetch('https://fakestoreapi.com/products/1')
    .then(res=>res.json())
    .then(dataObject=>console.log(dataObject))

// Se van encadenando los métodos en cascada. Hace un GET a la API direccionada, decodifica los datos en formato JSON y loguea en la consola los datos formateados en un objeto



// En caso de error, el siguente ejemplo lo simula:

fetch("http://httpstat.us/500")
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(function(response) {
        console.log("ok");
    }).catch(function(error) {
        console.log(error);
    });

// Es recomendable colocar un 'catch' cuando se coloque un 'then' para derivar el resultado por si algo falla

// Para ver los tipos de errores entrar en 'Network' de 'Inspección' del navegador

// Códigos de error https://http.cat

// Cuando los códigos comienzan por 4 o 5 son malos

// APIs de prueba en GitHub clase 4






















////// TEORÍA DE ASINCRONÍA CALLBACKS Y PROMISE /////////


/*
const iterations = 10;
const numbers = [];

for (let i = 0; i < iterations; i++) {
  const number = 1 + Math.floor(Math.random() * 6);
  numbers.push(number);
  if (number === 6) {
    console.log("ERROR");
    break;
  }
}

console.log(numbers);
*/




/*
console.log("");
// Ejemplo sin función Callback

const list = ["A", "B", "C"];

for (let i = 0; i < list.length; i++) {
  console.log("i=", i, " list=", list[i]);
}
*/



/*
console.log("");
// Ejemplo con función Callback

list.forEach(function(currentValue, index) {
    console.log("i=", index, " list=", currentValue);
  });
*/




/*
console.log("");
// setTimeout(Callback 'function', time 'number'):

setTimeout(function() {
    //console.log("He ejecutado la función");
  }, 2000);
*/




/////////////// ASINCRONÍA CON CALLBACKS ///////////////

// Se declara la función primaria como la variable 'doTask'.

// Se le pasa por parámetros:
    // Nº iteraciones para el bucle for (tiradas de dados)
    // Nombre de la función Callback

// El código de la función primaria consiste en un bucle 'for', el cual, en cada iteración genera un número entero aleatorio del 1 al 6 y lo guarda en el array 'numbers'

// Si el número generado es 6:
    // Devuelve el parámetro/función 'Callback' con su primer argumento 'err' (Objeto error)

// Si tras completar las iteraciones, no se saca 6:
    // Devuelve el parámetro/función 'Callback' con su segundo argumento 'result' (Objeto resultado)

/*
const doTask = (iterations, miCallback) => {
    const numbers = [];
    for (let i = 0; i < iterations; i++) {
      const number = 1 + Math.floor(Math.random() * 6);
      numbers.push(number);
      if (number === 6) {
        // Error, se ha sacado un 6
        return miCallback({
          error: true,
          message: "Se ha sacado un 6"
        });
      };
    };
    // Termina bucle y no se ha sacado 6 
    return miCallback(null, {
      error: false,
      value: numbers
    });
  };
*/



// Ejecución de la función primaria. Mete el number 10 como 'iterations' y mete una función anónima como parámetro 'miCallback'.

// Si el condicional se deriva al 'return' de 'miCallback' con la 1ª posición de los parámetros ocupada, se tomara esta (en la declaración de la función se le llama a este parámetro 'err')

// Si el condicional se deriva al 'return' de 'miCallback' con la 1ª posición paramétrica como 'null', tomará la 2ª posición (se ha nombrado 'result')

// Entonces los parámetros de la función anónima (referida paramétricamente como miCallback), se han nombrado como 'err' y 'result', y son:
    // El objeto error, con una propiedad booleana de error == true y otra de mensaje de error
    // El objeto resultado, con una propiedad booleana de error == false y otra con el array de tiradas

/*
doTask(10, function(err, result) {
  if (err) {
    return console.error(err.message);
  }
  return console.log("Tiradas correctas: ", result.value);
});
*/





console.log("");
//////////////// ASINCRONÍA CON PROMISES ///////////////


/*
const doTask3 = (iterations) => new Promise((resolve, reject) => {
    const numbers = [];
    for (let i = 0; i < iterations; i++) {
      const number = 1 + Math.floor(Math.random() * 6);
      numbers.push(number);
      if (number === 6) {
        reject({
          error: true,
          message: "Se ha sacado un 6"
        });
      }
    }
    resolve({
      error: false,
      value: numbers
    });
  });


doTask3(10)
    .then(result => console.log("doTask3 Fine: ", result.value))
    .catch(err => console.error("doTask3 err: ", err.message));
*/




























////////  EJERCICIOS  /////////





// 1. Quiero un perrito, pero no se qué raza escoger, ¿me ayudas?

// En este ejercicio utilizaremos la API de https://dog.ceo/dog-api/. Leyendo su documentación, deberás hacer lo siguiente:

    // Imprimir por consola la lista de razas de todos los perros:
/*
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(breedList => {
        console.log(breedList);
        for (const breed in breedList.message) {
          //console.log(`${breed}`);
          document.body.innerHTML += `<p>${breed}</p>`
        };
      });
*/

    // Imprimir por consola una imagen random de una raza:
/*
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(randomImgBreed => {
        console.log(randomImgBreed);
        document.body.innerHTML += `<img src = ${randomImgBreed.message}>`;
      });
*/

    // Imprimir por consola todas las imágenes de una raza concreta:
/*
    function searchBreed(breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(res => res.json())
        .then(dogPhotos => {
          console.log(dogPhotos);
          for (i = 0; i < dogPhotos.message.length; i++) {
            //console.log(dogPhotos.message[i]);
            document.body.innerHTML += `<img src = ${dogPhotos.message[i]}>`;
          };
        });
    }; 
    searchBreed("pomeranian");
*/

// ¿Y si ahora te pidieramos que podamos poner otra raza en la url para que nos busque otras imágenes? Adapta las urls que ya tenías para que puedas pasarle argumentos.

// Recuerda que para estos ejercicios deberás utilizar fetch. Al haber conseguido que se imprima por consola, el siguiente paso será que se muestren en pantalla con las herramientas que nos ofrece el arbol DOM.





// 2. ¿Quieres saber mi información? Aquí la tienes.

// Para este ejercicio vamos a utilizar la API de usuarios de GitHub, la cual tiene esta URL: https://api.github.com/users/{username}. {username} es el nombre del usuario en GitHub, por lo que si quieres buscar a cualquier usuario, solo tienes que ponerlo en la url. Por ejemplo, https://api.github.com/users/alenriquez96. Si ponéis esta URL en una nueva pestaña del navegador podréis observar qué datos nos devuelve el API.

// Lo primero que haremos será crear un input de tipo texto y un botón para buscar. El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar. Después crearemos una función que se ejecute cuando se pulse el botón buscar y que contenga una petición a la API para obtener información de ese usuario y así mostrarla en nuestra página:

// Lo que queremos que se imprima por consola será:

  // nombre
  // número de repositorios
  // avatar (imagen)

// Si ya has obtenido toda la información, utiliza las herramientas del arbol DOM para que esta información aparezca en la pantalla.

/*
let inputText = document.createElement("input");
let runButton = document.createElement("button");

inputText.type = "text";
inputText.style.fontFamily = "Courier";

runButton.innerText = "Search";
runButton.style.backgroundColor = "#eeg";
runButton.style.fontFamily = "Courier";
runButton.style.cursor = "pointer"

document.body.appendChild(inputText);
document.body.appendChild(runButton);



runButton.addEventListener("click", function(value){
  value.preventDefault();
  let userName = inputText.value;

  let urlGit = `https://api.github.com/users/${userName}`;
  fetch(urlGit)
    .then(response => response.json())
    .then(data => {
      let paragraph = document.createElement("p");
          paragraph.style.color = "green";
          paragraph.style.fontSize = "1.2em";
          document.body.appendChild(paragraph);
          paragraph.innerText = `
          Nombre de usuario: ${data.login}

          Número de repositorios: ${data.public_repos}
          `;
          let avatarGit = document.createElement("img");
          avatarGit.style.borderRadius = "40px";
          document.body.appendChild(avatarGit);
          avatarGit.src = data.avatar_url;   
      })
    .catch(err => console.log(error));
  });
*/






// 3. Promesas, promesas y más promesas.

// Dada una lista de usuarios de github guardada en una array, utiliza 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.

    // Objetivo: Usar Promise.all()

    // Recordatorio: Una llamada a fetch() devuelve un objeto promesa.

    // Pregunta. ¿cuántas promesas tendremos?

  
// Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

// Pasos:

    // Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.

    // Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.

    // Cuando Promise.all() haya terminado:

        // Consigue que se imprima por consola la url del repositorio de cada usuario.

        // Consigue que se imprima por consola el nombre de cada usuario.


//////// SIN TERMINAR //////////

let users = ['nacho-sf', 'alejandroereyesb', 'Alenriquez96', 'IvanQGervas', 'JavierEspinosaP'];

let prom1 = fetch("https://api.github.com/users/nacho-sf");
let prom2 = fetch("https://api.github.com/users/alejandroereyesb");
let prom3 = fetch("https://api.github.com/users/Alenriquez96");
let prom4 = fetch("https://api.github.com/users/IvanQGervas");
let prom5 = fetch("https://api.github.com/users/JavierEspinosaP");


Promise.all([prom1, prom2, prom3, prom4, prom5])
  .then(responses => {
    responses.forEach(response => {
      console.log(response.status, response.url);
    })
  });
