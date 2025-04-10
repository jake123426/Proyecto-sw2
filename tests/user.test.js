const request = require("supertest")

require('dotenv').config({ path: '.env.dev' });

const Server = require('../models/server');
const userService = require('../models/usuario_model');

const app = new Server({db_conection : false}).app;
jest.mock('../models/usuario_model');

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

describe('GET /api/usuarios/:id', () => {
    it('should return 200 if user exists', async () => {        
        userService.findByPk.mockResolvedValue({id:'1', name: 'Joaquin Chumacero'})
        const res = await request(app).get('/api/usuarios/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: '1', name: 'Joaquin Chumacero' });
    });
    
    it('should return 400 if user does not exist', async () => {        
        userService.findByPk.mockResolvedValue(null)
        const res = await request(app).get('/api/usuarios/999');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({  msg: 'No existe el usuario solicitado' });        
    });
});