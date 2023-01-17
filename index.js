const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-f4VUXXTGQd7sF9HHimnjyIPW",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express()
const port = 3080
app.use(bodyParser.json())
app.use(cors());

app.post('/', async (req, res) => {
    if (req.body && req.body.message) {
        const {message, currentModel} = req.body;
        console.log(message, "message");
        console.log(currentModel, "currentModel");
        const response = await openai.createCompletion({
            model: `${currentModel}`,
            prompt: `${message}`,
            max_tokens: 900,
            temperature: 0.5,
        });
        res.json({
            message: response.data.choices[0].text,
        })
    } else {
        res.json({
            data: 'message not present in the request body'
        })
    }
});


app.get('/', (req, res) => {
    res.json({
        message: "Server is running"
    });
});

app.get('/models', async (req, res) => {
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models: response.data.data
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

