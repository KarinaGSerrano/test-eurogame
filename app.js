// -------------------------------
// COMPONENTE NAV (independiente):
// -------------------------------
Vue.component("nav-eurogame", {
  props: ["nav"],
  template: `<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div class="container-fluid">
              <a class="navbar-brand" href="#"
                ><img class="logo-nav" src="./img/logo.svg" alt="logo"
              /></a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item" v-for="x in nav">
                    <a
                      class="nav-link a-color"
                      aria-current="page"
                      v-bind:href="x.href"
                      v-text="x.link"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>`,
});

// -------------------------------
// COMPONENTE PORTADA (independiente):
// -------------------------------

Vue.component("componente-portada", {
  props: ["tituloportada", "textoportada"],
  template: ` <div class="container padding-top">
  <div class="row">
    <div class="col-3 d-flex align-items-center">
      <div>
        <h1>{{ tituloportada }}</h1>
        <p class="p-portada" v-html="textoportada"></p>
      </div>
    </div>
    <div class="col-9">
      <img
        class="img-fluid img-prod-1 img-portada"
        src="./img/boardgame.webp"        
        alt="portada-BoardGame"
      />
    </div>
  </div>
  <div class="text-center">
    <a href="#test" class="chevron-style">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-chevron-compact-down"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
        />
      </svg>
    </a>
  </div>
</div>`,
});

// --------------------------
// COMPONENTE TEST PRINCIPAL (Padre):
// --------------------------
Vue.component("componente-test", {
  props: ["titulotest", "subtitulotest", "test", "juegos"],
  data() {
    return {
      datosRespuesta: {
        nombre: "",
        alias: "",
        juego: {},
        like: false,
        dislike: false,
      },
      opciones: [],
      validacionCorrecta: true,
      mostrarResultado: false,
      categoriaSeleccionada: "",
    };
  },
  template: `<form v-on:submit.prevent>
              <div class="container-pregunta container bg-color">
                <div class="text-center">
                  <span>{{ subtitulotest | mayuscula }}</span>
                  <h2 class="pt-2 color-orange">{{ titulotest | capital }}</h2>
                </div>
                <hr class="hr-prod" />

                <div class="row">
                  <div class="col-6">
                    <div class="d-flex flex-column">
                      <label for="nombre">Nombre</label>
                        <input
                          type="text"
                          placeholder="Luz"
                          id="nombre"
                          class="form-control"
                          v-model="datosRespuesta.nombre"
                          required
                      />
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="d-flex flex-column">
                      <label for="alias">Alias</label>
                        <input
                          type="text"
                          placeholder="Elfa del Bosque"
                          id="alias"
                          class="form-control"
                          v-model="datosRespuesta.alias"
                          required
                      />
                    </div>
                  </div>
                </div>

                <div class="p-3"></div>
                <hr class="hr-prod" />

                <ol>
                  <li class="pt-5" v-for="(cuestion, keyC) in test">
                    <p>{{ cuestion.pregunta }}</p>
                    <div>
                      <div class="form-check" v-for="(opcion, keyO) in cuestion.opciones">
                        <input
                          class="form-check-input"
                          type="radio"
                          v-bind:name="'radioN' + (keyC + 1)"
                          v-bind:id="'radioId' + (keyO + 1)"
                          v-bind:value="opcion.categoria"
                          v-bind:checked="opcion.seleccionado"
                        /> {{  }}
                        <label class="form-check-label" v-bind:for="'respuesta' + (keyO + 1)">
                            {{ opcion.opcion }}
                        </label>
                      </div>            
                    </div>
                  </li>
                </ol>                

                <div class="row d-flex pt-5">
                  <div class="col-3"></div>
                  <div class="col-2 text-center">
                      <button class="btn-secondary" v-bind:disabled="checkLocalStorage()" v-on:click="traerUltimo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-return-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 
                        3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 
                        .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div class="col-2 text-center">
                    <input type="submit" value="Ver mi resultado" class="btn-secondary" v-on:click="verResultado"></input>
                  </div>

                  <div class="col-2 text-center">
                      <button class="btn-secondary" v-on:click="limpiarResultado">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 
                        0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 
                        0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 
                        .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 
                        .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <p class="msj-alert text-center mt-2" v-if="!validacionCorrecta">Debes ingresar al menos una opción</p>

                  <div class="col-3"></div>
                </div>
              </div>

              <respuesta-test v-bind:respuesta="datosRespuesta" v-if="mostrarResultado"></respuesta-test>

            </form>`,
  methods: {
    verResultado() {
      // Funcion que ejecuta la muestra del componente-resultado
      this.datosRespuesta.like = false;
      this.datosRespuesta.dislike = false;
      this.validacionCorrecta = true;

      this.guardarOpciones();
      this.determinarCategoria();

      if (this.categoriaSeleccionada) {
        this.traerJuego();
        this.guardarDataStorage();
        this.mostrarResultado = true;
      } else {
        this.validacionCorrecta = false;
      }
    },

    guardarOpciones() {
      this.opciones = []; // se inicializa Array opciones
      const radios = [...document.querySelectorAll("input[type='radio']")]; // se seleccionan todos los radio buttons
      const radiosSeleccionados = radios.filter((radio) => radio.checked); // se filtran los que solo están seleccionados
      radiosSeleccionados.forEach((radio) => this.opciones.push(radio.value)); // se pushean los seleccionados en opciones
    },

    determinarCategoria() {
      this.categoriaSeleccionada = "";

      function uniqueMostFreqValue(arr) {
        const frequencyMap = {};
        for (const element of arr) {
          if (frequencyMap[element] === undefined) {
            frequencyMap[element] = 1;
          } else {
            frequencyMap[element]++;
          }
        }
        let maxFrequency = 0;
        let mostFrequentValue;
        for (const element in frequencyMap) {
          if (frequencyMap[element] > maxFrequency) {
            maxFrequency = frequencyMap[element];
            mostFrequentValue = element;
          }
        }
        let unique = true;
        for (const element in frequencyMap) {
          if (
            frequencyMap[element] === maxFrequency &&
            element !== mostFrequentValue
          ) {
            unique = false;
            break;
          }
        }
        if (unique) {
          return mostFrequentValue;
        } else {
          return "Familiar";
        }
      }

      this.categoriaSeleccionada = uniqueMostFreqValue(this.opciones);
    },

    guardarDataStorage() {
      // Se ejecuta el guardado de las elecciones del usuario al localStorage
      localStorage.setItem("nombre", this.datosRespuesta.nombre);
      localStorage.setItem("alias", this.datosRespuesta.alias);
      localStorage.setItem("categoria", this.categoriaSeleccionada);
    },

    traerJuego() {
      const filtro = this.juegos.filter(
        (juego) => juego.categoria === this.categoriaSeleccionada
      );

      this.datosRespuesta.juego = filtro[0];
    },

    limpiarResultado() {
      this.mostrarResultado = false;
      this.datosRespuesta.nombre = "";
      this.datosRespuesta.alias = "";

      const radios = [...document.querySelectorAll("input[type='radio']")];
      radios.forEach((radio) => (radio.checked = false));
    },

    traerUltimo() {
      this.datosRespuesta.nombre = localStorage.getItem("nombre");
      this.datosRespuesta.alias = localStorage.getItem("alias");
      this.categoriaSeleccionada = localStorage.getItem("categoria");
      this.datosRespuesta.like = JSON.parse(localStorage.getItem("like"));
      this.datosRespuesta.dislike = JSON.parse(localStorage.getItem("dislike"));

      this.traerJuego();
      this.mostrarResultado = true;
    },

    checkLocalStorage() {
      return !(localStorage.getItem("nombre") !== null);
    },
  },
});

// --------------------------
// COMPONENTE RESPUESTA TEST (hijo):
// --------------------------
Vue.component("respuesta-test", {
  props: ["respuesta"],
  template: `  <div class="container-respuesta bg-img">
                  <div class="container color-backgroung">
                    <div class="m-4">
                      <h3 class="text-center h3-text">
                        ¡Hola <span class="color-strong">{{ respuesta.nombre }}, {{ respuesta.alias }}</span>
                        ! Según tus preferencias te recomendamos:
                      </h3>

                      <div class="row">
                        <div class="col-6">
                          <img
                            class="img-fluid img-prod-1"
                            v-bind:src="'./img/' + respuesta.juego.portada"           
                            alt="game"
                          />
                        </div>

                        <div class="col-6 d-flex align-items-center">
                          <div class="pt-3">
                            <div class="text-center color-orange-0">
                              <h4><strong class="h4-text">{{ respuesta.juego.titulo }}</strong></h4>
                            </div>
                            <hr class="hr-prod" />

                            <div class="row">
                              <div class="col-6 text-center">
                                <p>
                                  <strong class="color-strong">Editorial:</strong>
                                  {{ respuesta.juego.editorial }}
                                </p>
                              </div>
                              <div class="col-6 text-center">
                                <p>
                                  <strong class="color-strong"
                                    >Año de lanzamiento:</strong
                                  >
                                  {{ respuesta.juego.anioLanzamiento }}
                                </p>
                              </div>
                              <hr class="hr-prod" />
                            </div>

                            <div class="row">
                              <div class="col-6 text-center">
                                <p>
                                  <strong class="color-strong">Categoría:</strong>
                                  {{ respuesta.juego.categoria }}
                                </p>
                              </div>
                              <div class="col-6 text-center">
                                <p>
                                  <strong class="color-strong">Idioma:</strong>
                                  {{ respuesta.juego.idioma }}
                                </p>
                              </div>
                              <hr class="hr-prod" />
                            </div>

                            <div class="row text-center">
                              <div class="col-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-people-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                                  />
                                </svg>
                                <p><strong class="color-strong">{{ respuesta.juego.jugadores }}</strong></p>
                              </div>
                              <div class="col-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-emoji-smile-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"
                                  />
                                </svg>
                                <p><strong class="color-strong">{{ respuesta.juego.edadRecomendada }}</strong></p>
                              </div>
                              <div class="col-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-clock-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                                  />
                                </svg>
                                <p><strong class="color-strong">{{ respuesta.juego.tiempoJuego }}</strong></p>
                              </div>
                              <hr class="hr-prod" />
                            </div>

                            <div class="sinopsis-prod">
                              <p>
                                {{ respuesta.juego.sinopsis }}
                              </p>
                            </div>                                                       
                            
                            <div class="row padding-top-2 text-center">
                                <hr class="hr-prod-like" />
                                <p class="text-center p-button-like">¿Te gustaría jugar este Eurogame?</p>
                                <div class="col-4"></div>                       
                                  <div class="col-2 d-flex justify-content-center">
                                    <button class="btn-like-dislike d-flex" v-bind:class="respuesta.like ? '' : 'opacity-25' " v-on:click="clickLike">
                                      <img src="./img/like-7.svg" alt="like" />
                                    </button>
                                  </div>
                                  <div class="col-2 d-flex justify-content-center">
                                    <button class="btn-like-dislike" v-bind:class="respuesta.dislike ? '' : 'opacity-25' " v-on:click="clickDislike">
                                      <img src="./img/dislike-7.svg" alt="dislike" />
                                    </button>
                                  </div>
                                  <div class="col-4"></div>                                                                     
                            </div>                             
                            

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
`,
  methods: {
    clickLike() {
      this.respuesta.like = !this.respuesta.like;
      if (this.respuesta.like === true && this.respuesta.dislike === true)
        this.respuesta.dislike = !this.respuesta.like;
      this.guardarLikesStorage();
    },

    clickDislike() {
      this.respuesta.dislike = !this.respuesta.dislike;
      if (this.respuesta.like === true && this.respuesta.dislike === true)
        this.respuesta.like = !this.respuesta.dislike;
      this.guardarLikesStorage();
    },

    guardarLikesStorage() {
      localStorage.setItem("like", this.respuesta.like);
      localStorage.setItem("dislike", this.respuesta.dislike);
    },
  },
});

// --------------------------
// FILTROS:
// --------------------------

Vue.filter("capital", function (palabra) {
  return palabra[0].toUpperCase() + palabra.slice(1);
});

Vue.filter("mayuscula", function (palabra) {
  return palabra.toUpperCase();
});

// --------------------------
// APP VUE PRINCIPAL:
// --------------------------

const app = new Vue({
  el: "#app",
  data: {
    nav: [
      { link: "Inicio", href: "#" },
      { link: "Realizar Test", href: "#test" },
    ],
    tituloPortada: "¿Qué es un Eurogame?",
    textoPortada:
      "¡Explora el emocionante mundo de los Eurogames! Estos juegos de mesa te desafían a planificar y tomar decisiones inteligentes, ofreciendo horas de diversión estratégica. <strong><i>¿Estás listo para embarcarte en una emocionante aventura de juego?</i></strong>",
    tituloTest: "te recomendamos el que más se adapte a tus gustos:",
    subtituloTest: "¿qué eurogame puedo jugar?",
    test: [
      {
        pregunta: "¿Prefieres jugar en solitario o en equipo?",
        opciones: [
          {
            opcion: "Me gusta jugar en solitario.",
            categoria: "Estrategia",
          },
          {
            opcion: "Disfruto de juegos que implican construcción.",
            categoria: "Construcción",
          },
          {
            opcion: "Prefiero jugar en equipo.",
            categoria: "Cooperativo",
          },
        ],
      },
      {
        pregunta: "¿Qué tipo de temática de juego te atrae más?",
        opciones: [
          {
            opcion: "Ciencia ficción y estrategia.",
            categoria: "Estrategia",
          },
          {
            opcion: "Construcción de ciudades y recursos.",
            categoria: "Construcción",
          },
          {
            opcion: "Aventuras cooperativas y resolución de problemas.",
            categoria: "Cooperativo",
          },
        ],
      },
      {
        pregunta:
          "¿Cuánto tiempo estás dispuesto a invertir en una partida de juego de mesa?",
        opciones: [
          {
            opcion:
              "Estoy dispuesto a invertir tiempo en partidas largas y extensas.",
            categoria: "Estrategia",
          },
          {
            opcion: "No me importa si la partida es de duración media.",
            categoria: "Construcción",
          },
          {
            opcion: "Prefiero partidas cortas y rápidas.",
            categoria: "Cooperativo",
          },
        ],
      },
    ],
    juegos: [
      {
        titulo: "Ticket to Ride",
        portada: "gameboard-07.webp",
        editorial: "Days of Wonder",
        anioLanzamiento: 2017,
        categoria: "Familiar",
        idioma: "Español-Ingles",
        jugadores: "2-4",
        edadRecomendada: "12+",
        tiempoJuego: "40'",
        sinopsis:
          "Embárcate en un viaje a través de América del Norte en Ticket to Ride, un juego de estrategia ferroviaria. Compite con amigos para construir rutas ferroviarias y completa tus objetivos secretos mientras te conviertes en el maestro de la locomoción.",
      },
      {
        titulo: "Gloomhaven",
        portada: "gameboard-05.webp",
        editorial: "Cephalofair Games",
        anioLanzamiento: 2017,
        categoria: "Estrategia",
        idioma: "Español-ingles",
        jugadores: "1-4",
        edadRecomendada: "14+",
        tiempoJuego: "120'",
        sinopsis:
          "Sumérgete en el emocionante mundo de Gloomhaven, un juego de mesa épico lleno de estrategia y aventuras. Forma un equipo de héroes y explora mazmorras, enfrenta monstruos y toma decisiones cruciales en una campaña que te sumergirá en un reino de fantasía como ningún otro.",
      },
      {
        titulo: "Bunny Kingdom",
        portada: "gameboard-02.webp",
        editorial: "IELLO",
        anioLanzamiento: 2017,
        categoria: "Construcción",
        idioma: "Español",
        jugadores: "2-4",
        edadRecomendada: "12+",
        tiempoJuego: "50'",
        sinopsis:
          "Preparate para Liderar un reino de conejos en Bunny Kingdom, donde la estrategia y la diplomacia son esenciales. Expande tu territorio, recolecta recursos y compite estratégicamente para ser el monarca más poderoso en este juego adorable pero desafiante.",
      },
      {
        titulo: "Pandemic",
        portada: "gameboard-06.webp",
        editorial: "Z-Man Games",
        anioLanzamiento: 2008,
        categoria: "Cooperativo",
        idioma: "Español-ingles",
        jugadores: "2-4",
        edadRecomendada: "8+",
        tiempoJuego: "35'",
        sinopsis:
          "Forma parte de un equipo de especialistas en enfermedades en Pandemic y trabaja juntos para salvar al mundo de epidemias mortales. Combina tus habilidades y estrategias para contener y curar enfermedades en una emocionante carrera contra el tiempo. La supervivencia del mundo está en tus manos.",
      },
    ],
  },
});

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
