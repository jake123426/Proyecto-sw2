const { OpenAI } = require("openai");


const consultaChatGPT =  async ( prompt ) => {    
    // const configuration = new Configuration({
    //     apiKey: process.env.OPENAI_API_KEY,
    // });
    const openai = new OpenAI({
        // organization: "org-TQi1Y22gsOyDgue21LK8R2m1",
        apiKey: process.env.OPENAI_API_KEY,
    });    
    
    
    const apiRequestBody = {
        model: "gpt-3.5-turbo",        
        messages: [{ "role": "user", "content": prompt }],
        temperature: 0.6,
    };
    const chatCompletion  = await openai.chat.completions.create( apiRequestBody );    
    
    // const completionResp = completion.data.choices[0].message.content;    
    
    return chatCompletion.choices[0].message.content;
    
}

module.exports = consultaChatGPT;