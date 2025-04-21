const request = require("supertest")

require('dotenv').config({ path: '.env.dev' });

const Server = require('../models/server');
const userService = require('../models/usuario_model');

const app = new Server({db_conection : false}).app;
jest.mock('../models/usuario_model');


describe('GET /api/usuarios/:id', () => {
    it('should return 200 if user exists', async () => {        
        userService.findByPk.mockResolvedValue({id:'1', name: 'Joaquin Chumacero'})
        const res = await request(app).get('/api/usuarios/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: '1', name: 'Joaquin Chumacero' });        
    });

    it('the method must be called once', async () => {        
        userService.findByPk.mockResolvedValue({id:'1', name: 'Joaquin Chumacero'})
        await request(app).get('/api/usuarios/1');        
        expect(userService.findByPk).toHaveBeenCalledTimes(2); // Hasta este punto findByPk ya se llamo 2 veces
    });

    it('should return 400 if user does not exist', async () => {        
        userService.findByPk.mockResolvedValue(null)
        const res = await request(app).get('/api/usuarios/999');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({  msg: 'No existe el usuario solicitado' });        
    });
});

describe("POST /api/usuarios", () => {
    it("should create a new user and return 200", async () => {
        userService.create.mockResolvedValue({
            id: 1, 
            nombre: "Jane Doe", 
            correo: "jane@prueba.com", 
            telefono: 4567})
        const newUser = { nombre: "Jane Doe", correo: "jane@prueba.com", telefono: 4567 };
        const response = await request(app).post("/api/usuarios").send(newUser);
        expect(response.status).toBe(200);
        expect(response.body.estudiante).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);        
    });

    it("should return 400 if nombre is missing", async () => {
        const response = await request(app).post("/api/usuarios").send({}); // Body vacío
        expect(response.status).toBe(400);
    });
});


// describe("GET /api/usuarios", () => {
//     it("should return all users", async () => {
//         return request(app)
//             .get("/api/usuarios")
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//             })
//     });
// });

// db.findUser.mockResolvedValue({ id: 1 }); // Éxito
// db.findUser.mockRejectedValue(new Error('DB error')); // Error
// db.findUser.mockImplementation((id) => {   Define lógica personalizada.
//     if (id === 1) return { id: 1, name: 'Custom' };
//     return null;
// });