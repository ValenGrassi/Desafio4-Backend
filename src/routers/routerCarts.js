import { Router } from "express";
import { cartManager } from "../manager/FileManager.js";
import { fileManager } from "../manager/FileManager.js";
import Cart from "../models/Carts.js";

const routerCarts = Router();

routerCarts.post("/", (req,res) => {
    const id = Math.random().toString(30).substring(2);
    const carrito = new Cart({id})
    const carritoNuevo = cartManager.createCart(carrito)
    res.json({
        id: id,
        resultado: carritoNuevo
    })
})

routerCarts.get("/:cid", (req,res) => {
    const idBuscado = req.params.cid;
    const carritos = cartManager.getCartById(idBuscado)
    res.json(carritos)
})

routerCarts.get("/", (req,res) => {
    let carritos = cartManager.getCarts()
    res.json(carritos)
})

routerCarts.post("/:cid/product/:pid", (req,res) => {
    const idProducto = req.params.pid;
    const idCarrito = req.params.cid;
    const carrito = cartManager.getCartById(idCarrito)
    const producto = fileManager.getProductById(idProducto)
    const quantity = 1
    const productoExiste = carrito.products.find(c => c.pid === idProducto)
    if(productoExiste){
        productoExiste.quantity = productoExiste.quantity + 1;
    }else {carrito.products.push({quantity: quantity,pid: producto.id})}
    cartManager.writeProduct()
    res.json({carrito})
})


export default routerCarts;
