import express from "express"
import routerProducts from "./routers/routerProducts.js";
import routerCarts from "./routers/routerCarts.js";
import routerWeb from "./routers/routerWebs.js";
import {engine} from "express-handlebars"
import {Server} from "socket.io"
import { fileManager } from "./manager/FileManager.js";

const app = express();
const puerto = 8080;
const httpServer = app.listen(puerto, () => {console.log("servidor conectado al puerto")})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use("/", routerWeb)

app.engine("handlebars", engine())
app.set("views", "./views")
app.set("view engine", "handlebars")

const io = new Server(httpServer)

io.on("connection", socket => {
    console.log("cliente conectado al servidor")

    socket.on("newProduct", prod => {
        fileManager.addProduct(prod);
        io.sockets.emit("actualizar", fileManager.getProducts())
    })

    socket.on("refrescar", () => {
        io.sockets.emit("actualizar", fileManager.getProducts())
    })
})