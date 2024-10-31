import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(express.json());


morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let contactos = [
          {
            "id": "1",
            "name": "Luis",
            "number": "9331663995"
          },
          {
            "id": "2",
            "name": "Felipe",
            "number": "8277388229"
          },
          {
            "id": "3",
            "name": "Armando",
            "number": "372819282"
          },
          {
            "id": "4",
            "name": "Jose",
            "number": "83828382"
          }
        ];


app.get('/api/persons', (req, res) => {
    res.json(contactos);
});

app.get("/info", (req, res) => {
    const date = new Date();
    res.send(
        `<p>Phonebook has info for ${contactos.length} people</p>
        <p>${date}</p>`
    );
});

app.get('/api/persons/:id', (req, res) => {
    const id =req.params.id;
    const contacto = contactos.find(contacto => contacto.id === id);
    if(contacto) {
        res.json(contacto);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    contactos = contactos.filter(contacto => contacto.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        });
    }

    const contacto = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    };

    contactos = contactos.concat(contacto);
    res.json(contacto);
}
);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

