const { response, request } = require('express');
const { SessionsClient } = require('@google-cloud/dialogflow');

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}

const sessionClient = new SessionsClient(CONFIGURATION);

const detectIntent = async (req = request, res = response) => {

    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;
    
    let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

    // The text query request.
    let request = {
        session: sessionPath,        
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },       
    };

    // Send request and log result
    const responseData = await sessionClient.detectIntent(request);   
    // const result = responses[0].queryResult;    
    
    res.status(200).json( responseData[0].queryResult );

}



module.exports = {
    detectIntent   
}