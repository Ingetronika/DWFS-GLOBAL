const ImageHandler = require('./ImageHandler.js')


let path = 'input/tucan.jpg';
let handler = new ImageHandler(path);


/**
 * Ejemplo de construccion de una imagen
 */
function ejemplo() {

  let outputPath = 'output/ejemplo.jpg';
  let pixeles = [];
  let filas = 2;
  let columnas = 2;
  for (let i = 0; i < filas; i++) {
    let nuevaFila = [];
    console.log("Fila: " + i);
    for (let j = 0; j < columnas; j++) {
      console.log("Columna:" + j)
      let pixel = [0, 0, 0]; // R G B -> Red Green Blue -> Rojo Verde Azul
      if ((i + j) % 2 === 0) { // Si la suma de la fila y la columna es par....
        pixel = [255, 255, 255];
      }
      console.log("Vamos a añadir el pixel " + pixel + " a la fila " + i + " columna " + j)
      nuevaFila.push(pixel);
    }
    console.log(nuevaFila)
    pixeles.push(nuevaFila);
  }
  console.log(pixeles);
  handler.savePixels(pixeles, outputPath, filas, columnas);
}

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
function redConverter() {
  let outputPath = 'output/tucan_red.jpg';
  let pixels = handler.getPixels();

  // Convertir a escala de rojos (ponemos G y B a 0)
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    pixel[1] = 0;  // Canal G
    pixel[2] = 0;  // Canal B
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
function greenConverter() {
  let outputPath = 'output/tucan_green.jpg';
  let pixels = handler.getPixels();

  // Convertir a escala de verdes (ponemos R y B a 0)
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    pixel[0] = 0;  // Canal R
    pixel[2] = 0;  // Canal B
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
function blueConverter() {
  let outputPath = 'output/tucan_blue.jpg';
  let pixels = handler.getPixels();

  // Convertir a escala de azules (ponemos R y G a 0)
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    pixel[0] = 0;  // Canal R
    pixel[1] = 0;  // Canal G
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en escala de grises.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * asignarle a cada canal de RGB esa media.
 *
 * Es decir, si un pixel tiene el valor [100, 120, 200], su media es 140 y por lo tanto
 * lo debemos transformar en el pixel [140, 140, 140].
 */
function greyConverter() {
  let outputPath = 'output/tucan_grey.jpg';
  let pixels = handler.getPixels();

  // Convertir a escala de grises (promediar R, G, B)
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    let average = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
    pixel[0] = average;  // Canal R
    pixel[1] = average;  // Canal G
    pixel[2] = average;  // Canal B
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transformarlo en negro [0, 0, 0] o, en caso contrario,
 * transformarlo en blanco [255, 255, 255].
 */
function blackAndWhiteConverter() {
  let outputPath = 'output/tucan_black_and_white.jpg';
  let pixels = handler.getPixels();

  // Convertir a blanco y negro (basado en la media de RGB)
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    let average = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
    if (average < 128) {
      pixel[0] = pixel[1] = pixel[2] = 0;  // Negro
    } else {
      pixel[0] = pixel[1] = pixel[2] = 255;  // Blanco
    }
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 * Otra forma es crear la imagen de nuevo únicamente con los valores de las filas y columnas pares.
 */
function scaleDown() {
  let outputPath = 'output/tucan_scale_down.jpg';
  let pixels = handler.getPixels();

  let newPixels = [];
  let shape = handler.getShape();
  let width = shape[1] / 2;
  let height = shape[0] / 2;

  // Reducir la imagen a la mitad
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pixel = pixels[(y * 2) * shape[1] + (x * 2)];
      newPixels.push(pixel);
    }
  }

  handler.savePixels(newPixels, outputPath, height, width);
}

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro que recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
function dimBrightness(dimFactor) {
  let outputPath = 'output/tucan_dimed.jpg';
  let pixels = handler.getPixels();

  // Reducir el brillo de cada pixel
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    pixel[0] = Math.round(pixel[0] / dimFactor);
    pixel[1] = Math.round(pixel[1] / dimFactor);
    pixel[2] = Math.round(pixel[2] / dimFactor);
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50] su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */
function invertColors() {
  let outputPath = 'output/tucan_inverse.jpg';
  let pixels = handler.getPixels();

  // Invertir los colores de cada pixel
  for (let i = 0; i < pixels.length; i++) {
    let pixel = pixels[i];
    pixel[0] = 255 - pixel[0];  // Invertir R
    pixel[1] = 255 - pixel[1];  // Invertir G
    pixel[2] = 255 - pixel[2];  // Invertir B
  }

  handler.savePixels(pixels, outputPath);
}

/**
 * merge - Junta dos imagenes con cierto factor de fusion
 * Una forma de conseguirlo es sumar el valor de cada canal de cada píxel de cada imagen, habiéndolo multiplicado antes por el factor de fusión correspondiente.
 * @param alphaFirst - Factor de fusion para la primera imagen
 * @param alphaSecond - Factor de fusion para la segunda imagen
 */
function merge(alphaFirst, alphaSecond) {
  let catHandler = new ImageHandler('input/cat.jpg');
  let dogHandler = new ImageHandler('input/dog.jpg');
  let outputPath = 'output/merged.jpg';

  let catPixels = catHandler.getPixels();
  let dogPixels = dogHandler.getPixels();

  let pixels = [];

  // Mezclar las dos imágenes según los factores de fusión
  for (let i = 0; i < catPixels.length; i++) {
    let catPixel = catPixels[i];
    let dogPixel = dogPixels[i];

    let r = Math.round(catPixel[0] * alphaFirst + dogPixel[0] * alphaSecond);
    let g = Math.round(catPixel[1] * alphaFirst + dogPixel[1] * alphaSecond);
    let b = Math.round(catPixel[2] * alphaFirst + dogPixel[2] * alphaSecond);

    pixels.push([r, g, b]);
  }

  dogHandler.savePixels(pixels, outputPath);
}


/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividad.js tal como se indica en el archivo Readme.md
 * En la carpeta output/ apareceran los resultados para cada uno de los casos
 *
 *     Ejecutar ejemplo: 0
 *     Conversor a rojos: 1
 *     Conversor a verdes: 2
 *     Conversor a azules: 3
 *     Conversor a grises: 4
 *     Conversor blanco y negro: 5
 *     Redimensionar: 6
 *     Reducir brillo: 7
 *     Negativo: 8
 *     Fusion de imagenes: 9
 */
let optionN = 0;

switch (optionN) {
  case 1: redConverter(); break;
  case 2: greenConverter(); break;
  case 3: blueConverter(); break;
  case 4: greyConverter(); break;
  case 5: blackAndWhiteConverter(); break;
  case 6: scaleDown(); break;
  case 7: dimBrightness(2); break;
  case 8: invertColors(); break;
  case 9: merge(0.3, 0.7); break;
  default: ejemplo();
}