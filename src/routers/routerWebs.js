import { Router } from "express";
import { fileManager } from "../manager/FileManager.js";

const routerWeb = Router();

routerWeb.get("/", (req,res) => {
    const productos = fileManager.getProducts()
    res.render("home", {hayProductos: productos.length > 0, productos});
})


routerWeb.get("/realtimeproducts",(req,res) => {
    res.render("realTimeProducts")
})
export default routerWeb;