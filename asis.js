const resol = document.querySelector('#resp')
const preg = document.querySelector('#preg')
const loading = document.querySelector('#loading')
const pregunta = document.querySelector('#pregunta')
const boton = document.querySelector('#boton')
let prompt = {}
let question = ''
let message = []
let url;
let controller = null; // Para poder cancelar el stream

boton.addEventListener('click', async (event) => {
    event.preventDefault();
    resol.innerHTML = ''
    const p = String(pregunta.value)
    if(p.length < 1) return
    
    question = p
    preg.innerHTML = question 
    pregunta.value = ''
    prompt = {prompt: p, stream: true} // Habilitamos streaming
    loading.innerHTML = 'Pixel está pensando...'
    
    // Cancelar cualquier solicitud previa
    if (controller) {
        controller.abort();
    }
    controller = new AbortController();
    
    try {
        await Nuevo(prompt, controller.signal);
    } catch (error) {
        if (error.name !== 'AbortError') {
            resol.innerHTML = 'Error al conectar con el asistente. Inténtalo de nuevo.';
            loading.innerHTML = '';
        }
    }
});

const procesarChunk = (chunk) => {
    // Procesamos cada línea del stream
    const lines = chunk.split('\n');
    let fullResponse = '';
    
    lines.forEach(line => {
        if (line.startsWith('data:') && line !== 'data: [DONE]') {
            try {
                const data = JSON.parse(line.substring(5));
                if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                    fullResponse += data.choices[0].delta.content;
                }
            } catch (e) {
                console.error('Error parsing stream data:', e);
            }
        }
    });
    
    return fullResponse;
};

const respuestaStream = (text) => {
    resol.innerHTML = text;
    // Auto-scroll al final del contenido
    resol.scrollTop = resol.scrollHeight;
};

const respuestaNormal = (resp) => {
    message.push({question: resp});
    loading.innerHTML = '';
    
    if(resp.choices){
        resol.innerHTML = resp.choices[0].message.content;
    } else {
        resol.innerHTML = 'Lamentamos no poder responder en este momento, pruebe en unos minutos.';
    }
};

const inicio = () => {
    resol.innerHTML = "Hello! I'm Pixel, the virtual assistant from RPG. How can I help you today?";
};

async function Nuevo(prompt, signal) {
    url = 'https://roche-backend.vercel.app/';
    
    try {
        const response = await fetch(url, { 
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(prompt),
            signal // Pasamos el signal para poder cancelar
        });
        
        if (!response.ok) throw new Error('Error en la respuesta');
        
        // Verificamos si es streaming
        if (prompt.stream) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let partialData = '';
            
            while (true) {
                const {done, value} = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, {stream: true});
                partialData += chunk;
                
                // Procesamos los chunks completos
                const lines = partialData.split('\n');
                partialData = lines.pop(); // Guardamos el último fragmento incompleto
                
                let newContent = '';
                for (const line of lines) {
                    if (line.startsWith('data:') && line !== 'data: [DONE]') {
                        try {
                            const data = JSON.parse(line.substring(5));
                            if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                                newContent += data.choices[0].delta.content;
                            }
                        } catch (e) {
                            console.error('Error parsing stream data:', e);
                        }
                    }
                }
                
                if (newContent) {
                    respuestaStream(resol.innerHTML + newContent);
                }
            }
            
            loading.innerHTML = '';
        } else {
            const resp = await response.json();
            respuestaNormal(resp);
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error:', error);
            loading.innerHTML = '';
            resol.innerHTML = 'Error al obtener la respuesta. Inténtalo de nuevo.';
        }
    } finally {
        controller = null;
    }
}

inicio();