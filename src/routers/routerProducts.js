import { Router } from "express";
import { fileManager } from "../manager/FileManager.js";
import Product from "../models/Products.js";

const routerProducts = Router();

routerProducts.get("/", (req,res) => {
    let productos = fileManager.getProducts()
    const limit = req.query.limit
    if (limit != undefined){
        productos = productos.slice(0, limit)
    }
    res.json(productos)
})

routerProducts.get("/:pid", (req,res) => {
    const idBuscado = req.params.pid;
    const productos = fileManager.getProductById(idBuscado)
    res.json({
        requisitos: req.params,
        resultado: productos})
})

routerProducts.post("/", (req, res) => {
    try {
        const datosProducto = req.body;
        const producto = new Product(datosProducto);
        const productoGuardado = fileManager.addProduct(producto);
        res.status(201).json(productoGuardado);
    } catch (error) {
        res.status(400).json("Hubo un error con el guardado de este producto.");
    }
});

routerProducts.put("/:pid", (req,res) => {
    const updates = req.body
    const idBuscado = req.params.pid;
    const producto = fileManager.updateProduct(idBuscado, updates)
    res.json({
        cambios: updates,
        resultado: producto
    })
})

routerProducts.delete("/:pid", (req,res) => {
    const idBuscado = req.params.pid;
    const producto = fileManager.deleteProduct(idBuscado)
    res.json({
        producto: producto,
        resultado: "eliminado"
    })
})


export default routerProducts;