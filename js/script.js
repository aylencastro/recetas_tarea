fetch('../js/recetas.json')
  .then((response) => response.json())
  .then((data) => {
    console.log('Éxito:', data);
    mostrarRecetas(data);
  })
  .catch((error) => {
    console.error('Habemus un error :( -->', error);
  });

function mostrarRecetas(data) {
    const listaComidas = document.createElement('ul');

    for(i = 0; i < data.recetas.length; i++) {
        // Listado de Recetas
            let recetaEnListado = document.createElement('li');
            let linkReceta = document.createElement('a');
            linkReceta.setAttribute("href", '#' + data.recetas[i].href);
            recetaEnListado.appendChild(linkReceta);
            linkReceta.innerHTML = data.recetas[i].comida;
            listaComidas.appendChild(recetaEnListado);
        

        // Crea section que engloba cada receta
        const seccionReceta = document.createElement('section');

        // Título de la receta
        const tituloReceta = document.createElement('h2');
        tituloReceta.innerHTML = data.recetas[i].comida;
        tituloReceta.setAttribute("id", data.recetas[i].href);

        // Mostrar ingredientes (h3 que dice "Ingredientes" + listado)
        const ingredientesTitulo = document.createElement('h3');
        ingredientesTitulo.innerText = "Ingredientes";

        const ingredientes = document.createElement('ul');
        ingredientes.setAttribute("class", "ul-text");
        for (let j = 0; j < data.recetas[i].ingredientes.length; j++) {
            let ingrediente = document.createElement('li');
            ingrediente.innerHTML = data.recetas[i].ingredientes[j];
            ingredientes.appendChild(ingrediente);
        }

        // Mostrar paso a paso (h3 que dice "Paso A Paso" + ol)
        const pasoApaso = document.createElement('h3');
        pasoApaso.innerText = "Paso a Paso";
        
        const listaPasos = document.createElement('ol');
        listaPasos.setAttribute("class", "ul-text");
        for (let k = 0; k < data.recetas[i].pasos.length; k++) {
            const paso = document.createElement('li');
            paso.innerHTML = data.recetas[i].pasos[k];
            listaPasos.appendChild(paso);
        }

        // Imagen separadora
        const imgSeparador = document.createElement('img');
        imgSeparador.setAttribute("class", "separador");
        imgSeparador.setAttribute("src", "../pics/separador-removebg-preview.png");

        // Volcar listado Recetas
        document.getElementById("listado-recetas").appendChild(listaComidas);

        // Volcar recetas en Section
        document.getElementById("recetario").appendChild(seccionReceta);
        seccionReceta.appendChild(tituloReceta);
        seccionReceta.appendChild(ingredientesTitulo);
        seccionReceta.appendChild(ingredientes);
        seccionReceta.appendChild(pasoApaso);
        seccionReceta.appendChild(listaPasos);
        if (data.recetas[i].video != null) {
            const tituloVid = document.createElement('h3');
            tituloVid.innerHTML = data.recetas[i].video.titulo;
            tituloVid.style.textAlign = "center";

            const video = document.createElement('iframe');
            video.setAttribute("id", "video-pan")
            video.setAttribute("src", data.recetas[i].video.url);
            seccionReceta.appendChild(tituloVid);
            seccionReceta.appendChild(video);       
        }
        seccionReceta.appendChild(imgSeparador);
    }
}