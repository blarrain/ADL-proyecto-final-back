import request from 'supertest'
import { app } from '../../server.js'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

describe('Test para articulos en rutas públicas', () => {
    /************************************* GET *************************************/
    /* Recuperar todos los articulo */
    describe('GET / function getArticulos()', () => {
        /* Debería devolver con un estado 200 */
        it('should respond with a 200 status', async () => {
            const response = await request(app).get('/articulos').send()
            expect(response.status).toBe(200)
        })
    })

    /* Recuperar los datos de un artículo por ID */
    describe('GET /:id function getArticuloById()', () => {
        /* Debería devolver un Objeto con los datos del articulo */
        it('should return an object with the article data', async () => {
            const { body } = await request(app).get("/articulos/1").send();
            const producto = body;
            expect(producto).toBeInstanceOf(Object);
        })
        /* Debería devolver con un 404 con una ID que no existe */
        it('should return a 404 status code when the ID does not exist', async () => {
            const response = await request(app).get('/articulos/-1').send()
            expect(response.status).toBe(404)
        })
    })

    /* Recuperar los artículos que apliquen en los filtros */
    describe('GET /:id function getArticulosFiltrados ()', () => {
        /* Debería devolver un estado 200 */
        it('should return a 200 status', async () => {
            const response = await request(app).get('/articulos/filtros').send()
            expect(response.status).toBe(200)
        })
    })
})


describe('Test para articulos en rutas privadas', () => {
    let authToken;
    beforeAll(() => {
        const payload = {
            email: 'cliente@cliente.cl',
            password: '123456',
            rol: 'admin'
        };
        /* Generar Token con 1 hora de vigencia para realizar las pruebas */
        authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    });


    /************************************* POST *************************************/
    /* Crear un articulo */
    describe('POST / function createArticulo()', () => {
        /* Debería devolver con un estado 400 cuando falta alguno de los datos */
        it('should return a 400 status code when any of the data is missing', async () => {
            const fields = [{ nombre: 'articulo1' }, { precio: '100' }, { stock: '23' }, { id_categoria: '2' }];
            for (const body of fields) {
                const response = await request(app).post('/articulos').set('Authorization', `Bearer ${authToken}`).send(body);
                expect(response.status).toBe(400);
            }
        });

        /* Debería devolver con un estado 201 cuando el artículo está creado correctamente */
        it('should return a 201 status code when the item is successfully created', async () => {
            const nuevoArticulo = {
                nombre: 'articulo 100',
                descripcion: 'descripcion',
                precio: '1000',
                stock: '30',
                id_categoria: '1'
            }
            const response = await request(app).post('/articulos').set('Authorization', `Bearer ${authToken}`).send(nuevoArticulo)
            expect(response.status).toBe(201)
        })
    });


    /************************************* PUT *************************************/
    /* Actualizar */
    describe('PUT / function updateArticulo()', () => {
        /* Debería devolver un estado 400 cuando falta alguno de los datos */
        it('should return a 400 status code when any of the data is missing', async () => {
            const fields = [{ nombre: 'articulo1' }, { precio: '100' }, { stock: '23' }, { id_categoria: '2' }];
            for (const body of fields) {
                const response = await request(app).put('/articulos/1').set('Authorization', `Bearer ${authToken}`).send(body);
                expect(response.status).toBe(400);
            }
        });

        /* Debería devolver un estado 200 cuando el artículo se actualiza correctamente */
        it('should return a status of 200 when the item is successfully updated', async () => {
            const articuloActualizado = {
                id: 1,
                nombre: 'articulo 100',
                descripcion: 'descripcion',
                precio: '1000',
                stock: '30',
                id_categoria: '1'
            }
            const response = await request(app).put('/articulos/1').set('Authorization', `Bearer ${authToken}`).send(articuloActualizado)
            expect(response.status).toBe(200)
        })
    });


    /************************************* DELETE *************************************/
    /* Eliminar un artículo */
    describe('DELETE / function deleteArticulo()', () => {
        /* Debería devolver con un 404 con una ID que no existe */
        it('should return a 400 status when the ID does not exist', async () => {
            const { status } = await request(app).delete('/articulos/-1').set('Authorization', `Bearer ${authToken}`).send()
            expect(status).toBe(404)
        })
        /* Debería devolver un estado 200 cuando se elimina el articulo */
        it('should return a 200 status code when the item is deleted.', async () => {
            const response = await request(app).delete('/articulos/1').set('Authorization', `Bearer ${authToken}`).send()
            expect(response.status).toBe(200)
        })
    });
})

