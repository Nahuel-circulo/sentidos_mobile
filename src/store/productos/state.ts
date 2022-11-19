
export interface ProductoCarrito {
  id: string;
  name: string;
  description: string;
  price: string;
  image: Image;
  delivery: boolean;
  categoria: Categoria;
  createdAt: string;
  updatedAt: string;
  cantidad:number
}

export interface Producto {
  id: string;
  name: string;
  description: string;
  price: string;
  image: Image;
  delivery: boolean;
  categoria: Categoria;
  createdAt: string;
  updatedAt: string;
}

interface Categoria {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Image {
  id: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: Sizes;
  createdAt: string;
  updatedAt: string;
  url: string;
}

interface Sizes {
  thumbnail: Thumbnail;
  card: Card;
  tablet: Tablet;
}

interface Tablet {
}

interface Card {
  width?: number;
  height?: number;
  mimeType?: string;
  filesize?: number;
  filename?: string;
  url?: string;
}

interface Thumbnail {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
}

export interface ProductosStateInterface {
  productosTe: Producto[];
  productosRestaurante: Producto[];
  carrito: ProductoCarrito[];
  restaurantLoaded: Boolean,
  teaLoaded: Boolean,
  pedidosArray:String[]
}

function state(): ProductosStateInterface {
  return {
    productosTe: [],
    productosRestaurante: [],
    carrito:[],
    restaurantLoaded: false,
    teaLoaded: false,
    pedidosArray:[]
  }
}

export default state;
