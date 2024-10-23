const request = require('supertest');
const server = require('./app');

describe('Test the things service', () => {
    test('GET /users succeeds', async() => {
        return request(server)
	    .get('/users')
	    .expect(200);
    });

    test('GET /users returns JSON', async() => {
        return request(server)
	    .get('/users')
	    .expect('Content-type', /json/);
    });

    test('GET /users includes John_doe', async() => {
        return request(server)
	    .get('/users')
	    .expect(/John_doe/);
    });

    test('GET /users/1 succeeds', async() => {
        return request(server)
	    .get('/users/1')
	    .expect(200);
    });

    test('GET /users/1 returns JSON', async() => {
        return request(server)
	    .get('/users/1')
	    .expect('Content-type', /json/);
    });

    test('GET /users/1 includes John_doe', async() => {
        return request(server)
	    .get('/users/1')
	    .expect(/John_doe/);
    });

    test('GET /users/99 failed', async() =>{
        return request(server)
	    .get('/users/99')
	    .expect(400);
    });

    test('POST /users succeeds', async() => {
        const params = {'username': 'yr7gi'};
        return request(server)
        .post('/users')
        .send(params)
	    .expect(200);
    });

    test('GET /photos succeeds', async() => {
        return request(server)
	    .get('/photos')
	    .expect(200);
    });

    test('GET /photos returns JSON', async() => {
        return request(server)
	    .get('/photos')
	    .expect('Content-type', /json/);
    });

    test('GET /photos includes City A', async() => {
        return request(server)
	    .get('/photos')
	    .expect(/City A/);
    });

    test('GET /photos/1 succeeds', async() => {
        return request(server)
	    .get('/users/1')
	    .expect(200);
    });

    test('GET /photos/1 returns JSON', async() => {
        return request(server)
	    .get('/users/1')
	    .expect('Content-type', /json/);
    });

    test('GET /photos/1 includes John_doe', async() => {
        return request(server)
	    .get('/photos/1')
	    .expect(/This is the first comment./);
    })

    test('POST /photos succeeds', async() => {
        const params = {
            'url': 'https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg',
            'date': '11/12/2000',
            'topic': 'dice',
            'comments': 'co'
          };
        return request(server)
        .post('/photos')
        .send(params)
	    .expect(200);
    });
});