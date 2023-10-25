let carta = {
    palo: null,
    numero: null,
    valor: null,
  
    getPalo: function () {
      return this.palo;
    },
  
    setPalo: function (value) {
      this.palo = value;
    },
  
    getNumero: function () {
      return this.numero;
    },
  
    setNumero: function (value) {
      this.numero = value;
    },
  
    getValor: function () {
      return this.valor;
    },
  
    setValor: function (value) {
      this.valor = value;
    },
  };
  
  let baraja = {
    cartas: [],
  
    inicializar: function () {
      this.cartas = [];
      const numeros = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "10",
        "11",
        "12",
      ];
      const valores = [1, 2, 3, 4, 5, 6, 7, 0.5, 0.5, 0.5];
      const palos = ["Oros", "Copas", "Espadas", "Bastos"];
  
      //Palos
      for (let palo of palos) {
        //Número y valor
        for (let index in numeros) {
          let miCarta = Object.create(carta);
  
          miCarta.setNumero(numeros[index]);
          miCarta.setValor(valores[index]);
          miCarta.setPalo(palo);
  
          this.cartas.push(miCarta);
        }
      }
    },
  
    barajar: function () {
      const barajado = [];
      while (this.cartas.length > 0) {
        let posicion = Math.floor(Math.random() * this.cartas.length);
        const cartaExtraida = this.cartas.splice(posicion, 1);
        barajado.push(cartaExtraida[0]);
      }
  
      this.cartas = [...barajado];
    },
  
    // Recorre cada una de las posiciones e intercambia los valores con una posición aleatoria
    barajar2: function () {
      for (let index in this.cartas) {
        let posicionAleatoria = Math.floor(Math.random() * this.cartas.length);
        let cartaAux = Object.create(carta);
        cartaAux = this.cartas[index];
        this.cartas[index] = this.cartas[posicionAleatoria];
        this.cartas[posicionAleatoria] = cartaAux;
      }
    },
  
    repartirCarta: function () {
      return this.size() != 0 ? this.cartas.shift() : 0;
    },
  
    imprimir: function () {
      for (carta of this.cartas) {
        console.log(carta);
      }
    },
    size: function () {
      return this.cartas.length;
    },
  };
  
  // Jugador
  let jugador = {
    nombre: "",
    cartasMano: [],
    puntos: 0,
    terminar: false,
  
    inicializar() {
      this.cartasMano = [];
      this.puntos = 0;
      this.terminar = false;
    },
  
    // Devuelve una carta de la baraja
    pedirCarta: function () {},
  
    // Pide una carta de la baraja, controla los puntos y si se ha pasado del tope
    jugar: function (tope) {},
  };
  
  let jugador1 = Object.create(jugador);
  let jugador2 = Object.create(jugador);
  
  const controlador = {
    tope: 7.5,
  
    inicializar: function () {
      baraja.inicializar();
      baraja.barajar();
  
      this.limpiarMesa();
      this.dibujarBaraja();
  
      jugador1.inicializar();
      jugador2.inicializar();
  
      jugador1.nombre = "Antonio";
      jugador2.nombre = "Computer";
  
      this.updateElement("numeroCartas", `Quedan ${baraja.size()} Cartas`);
      this.updateElement("resultado", "");
  
      this.enableElement("btnContinuar");
      this.enableElement("btnTerminar");
    },
  
    barajar: function () {
      baraja.barajar();
      this.limpiarDiv("baraja");
      this.dibujarBaraja();
    },
  
    dibujarCarta: function (dst, numeroCarta, paloCarta) {
      const divDestino = document.getElementById(dst);
      const imagenHTML = document.createElement("img");
  
      imagenHTML.setAttribute("id", `${numeroCarta}-${paloCarta}`);
  
      imagenHTML.setAttribute(
        "src",
        `./img/${paloCarta}_${numeroCarta}-195x300.png`
      );
      divDestino.appendChild(imagenHTML);
    },
  
    dibujarBaraja: function () {
      this.limpiarDiv("baraja");
      for (let carta of baraja.cartas) {
        this.dibujarCarta("baraja", carta.getNumero(), carta.getPalo());
      }
    },
  
    mostrarBaraja: function () {
      const divDestino = document.getElementById("baraja");
      divDestino.removeAttribute("hidden");
    },
  
    ocultarBaraja: function () {
      const divDestino = document.getElementById("baraja");
      divDestino.setAttribute("hidden", "hidden");
    },
  
    eliminarCarta: function (numeroCarta, paloCarta) {
      const cartaHTML = document.getElementById(`${numeroCarta}-${paloCarta}`);
      cartaHTML.remove();
    },
  
    limpiarMesa: function () {
      this.limpiarDiv("baraja");
      this.limpiarDiv("jugadores");
    },
  
    limpiarDiv: function (dst) {
      const divDestino = document.getElementById(dst);
      divDestino.innerHTML = "";
    },
  
    addElement(type, content, target) {
      const principal = document.getElementById(target);
      const elementHTML = document.createElement(type);
      elementHTML.innerHTML = content;
      principal.appendChild(elementHTML);
    },
  
    updateElement(id, content) {
      const elementHTML = document.getElementById(id);
      elementHTML.innerText = content;
    },
  
    disableElement(id) {
      const elementHTML = document.getElementById(id);
      elementHTML.disabled = true;
    },
  
    enableElement(id) {
      const elementHTML = document.getElementById(id);
      elementHTML.disabled = false;
    },
  
    /**************************************************** */
  
    // Se usa desde juego para dibujar el jugador. Crea la interfaz del jugador
    // si no existe
    // Un ejemplo es:
    // <div id="jugadores">
    //   <div id="div-Antonio">
    //     <h2 id="nombre-Antonio">Antonio</h2>
    //     <h2 id="puntos-Antonio">4 puntos.</h2>
    //     <div id="cartas-Antonio">
    //       <img id="04-Oros" src="./img/Oros_04-195x300.png" />
    //     </div>
    //   </div>
    // </div>
  
    dibujarJugador(jugador, dst) {},
  
    // Controla el juego, se llama desde el boton continuar
    juego() {},
  
    //El jugador 1 se planta, lo llama el botón terminar
    finPartida() {
      jugador1.terminar = true;
      this.juego();
    },
  
    // Muestra el resultado de la partida, quién gana o empate
    resultado() {},
  };
  