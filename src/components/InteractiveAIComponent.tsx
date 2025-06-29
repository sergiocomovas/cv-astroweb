import { useState, useEffect } from 'preact/hooks';

interface AIExample {
  id: string;
  logo: string;
  nombre: string;
  descripcion: string;
  ejemplo: {
    titulo: string;
    descripcion: string;
    codigo: string;
    demo?: string;
    status: 'working' | 'experimental' | 'concept';
  };
}

const InteractiveAIComponent = () => {
  const [selectedExample, setSelectedExample] = useState<AIExample | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sentimentResult, setSentimentResult] = useState<string>('');
  const [translationResult, setTranslationResult] = useState<string>('');
  const [testText, setTestText] = useState('Me encanta programar con JavaScript');

  const aiExamples: AIExample[] = [
    {
      id: 'transformers-sentiment',
      logo: "😊",
      nombre: "Análisis de Sentimientos",
      descripcion: "Usando Transformers.js para detectar emociones en texto",
      ejemplo: {
        titulo: "Análisis de Sentimientos con Transformers.js",
        descripcion: "Detecta emociones en texto usando modelos de IA en el navegador",
        status: 'working',
        codigo: `import { pipeline } from '@xenova/transformers';

// Cargar el modelo de análisis de sentimientos
const classifier = await pipeline(
  'sentiment-analysis',
  'Xenova/distilbert-base-uncased-finetuned-sst-2-english'
);

// Función para analizar sentimiento
async function analyzeSentiment(text) {
  try {
    const result = await classifier(text);
    return {
      label: result[0].label, // POSITIVE o NEGATIVE
      score: result[0].score, // Confianza (0-1)
      emoji: result[0].label === 'POSITIVE' ? '😊' : '😞'
    };
  } catch (error) {
    console.error('Error en análisis:', error);
    return { label: 'ERROR', score: 0, emoji: '❌' };
  }
}

// Ejemplo de uso
const texts = [
  "Me encanta programar con JavaScript",
  "Este código es terrible y no funciona",
  "La IA está revolucionando el desarrollo web"
];

texts.forEach(async (text) => {
  const sentiment = await analyzeSentiment(text);
  console.log(\`"\${text}" -> \${sentiment.emoji} \${sentiment.label} (\${(sentiment.score * 100).toFixed(1)}%)\`);
});`,
        demo: "transformers-demo"
      }
    },
    {
      id: 'web-translator',
      logo: "🌐",
      nombre: "Traductor Web Nativo",
      descripcion: "API de traducción experimental del navegador",
      ejemplo: {
        titulo: "Traductor Web Nativo",
        descripcion: "API experimental de traducción integrada en el navegador",
        status: 'experimental',
        codigo: `// API experimental de traducción del navegador
// Actualmente solo disponible en Chrome Canary con flags habilitados

class WebTranslator {
  constructor() {
    this.translator = null;
    this.isSupported = 'translation' in window;
  }

  async initialize(sourceLanguage = 'es', targetLanguage = 'en') {
    if (!this.isSupported) {
      throw new Error('Translation API no soportada en este navegador');
    }

    try {
      // @ts-ignore - API experimental
      this.translator = await window.translation.createTranslator({
        sourceLanguage,
        targetLanguage
      });
      
      return true;
    } catch (error) {
      console.error('Error inicializando traductor:', error);
      return false;
    }
  }

  async translate(text) {
    if (!this.translator) {
      throw new Error('Traductor no inicializado');
    }

    try {
      const result = await this.translator.translate(text);
      return result;
    } catch (error) {
      console.error('Error en traducción:', error);
      return 'Error en traducción';
    }
  }
}

// Ejemplo de uso
const translator = new WebTranslator();

async function translateText() {
  const initialized = await translator.initialize('es', 'en');
  
  if (initialized) {
    const spanish = "Hola, ¿cómo estás?";
    const english = await translator.translate(spanish);
    console.log(\`\${spanish} -> \${english}\`);
  } else {
    console.log('Traductor no disponible');
  }
}`,
        demo: "translator-demo"
      }
    },
    {
      id: 'google-ai-barista',
      logo: "☕",
      nombre: "Barista AI con Gemini",
      descripcion: "Chatbot especializado usando Google AI Studio",
      ejemplo: {
        titulo: "Barista AI con Google Gemini",
        descripcion: "Chatbot especializado en café usando Google AI Studio",
        status: 'concept',
        codigo: `import { GoogleGenerativeAI } from '@google/generative-ai';

class BaristaAI {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Contexto del barista
    this.systemPrompt = \`
Eres un barista experto y amigable llamado "CaféBot". 
Tu especialidad es ayudar a las personas a elegir el café perfecto.

Conocimientos:
- Tipos de café: espresso, americano, latte, cappuccino, macchiato, etc.
- Métodos de preparación: V60, chemex, prensa francesa, etc.
- Orígenes del café: Colombia, Etiopía, Brasil, etc.
- Maridajes con comida

Personalidad:
- Entusiasta y conocedor
- Amigable pero profesional
- Siempre sugiere opciones personalizadas
- Usa emojis relacionados con café ☕

Responde SOLO sobre temas relacionados con café.
\`;
  }

  async chat(userMessage, conversationHistory = []) {
    try {
      const fullPrompt = \`
\${this.systemPrompt}

Historial de conversación:
\${conversationHistory.map(msg => \`\${msg.role}: \${msg.content}\`).join('\\n')}

Usuario: \${userMessage}
Barista:
\`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
      
    } catch (error) {
      console.error('Error en chat:', error);
      return '☕ Lo siento, tengo problemas técnicos. ¿Podrías repetir tu pregunta?';
    }
  }
}

// Ejemplo de uso
const barista = new BaristaAI('tu-api-key-aquí');

const response = await barista.chat('¿Qué café me recomiendas para empezar el día?');
console.log(response);`,
        demo: "barista-demo"
      }
    },
    {
      id: 'mcp-protocol',
      logo: "🔗",
      nombre: "Model Context Protocol",
      descripcion: "Protocolo para conectar modelos de IA con herramientas externas",
      ejemplo: {
        titulo: "Model Context Protocol (MCP)",
        descripcion: "Protocolo para conectar modelos de IA con herramientas y datos externos",
        status: 'concept',
        codigo: `// Model Context Protocol - Concepto de implementación
// MCP permite que los modelos de IA accedan a herramientas y datos externos

class MCPServer {
  constructor() {
    this.tools = new Map();
    this.resources = new Map();
  }

  // Registrar herramientas disponibles
  registerTool(name, description, handler) {
    this.tools.set(name, {
      name,
      description,
      inputSchema: {
        type: "object",
        properties: {},
        required: []
      },
      handler
    });
  }

  // Manejar llamadas de herramientas
  async callTool(name, arguments_) {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(\`Herramienta '\${name}' no encontrada\`);
    }

    try {
      const result = await tool.handler(arguments_);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: \`Error: \${error.message}\`
          }
        ],
        isError: true
      };
    }
  }
}

// Ejemplo de uso: Servidor MCP para desarrollo web
const mcpServer = new MCPServer();

// Herramienta para analizar código
mcpServer.registerTool(
  'analyze_code',
  'Analiza código JavaScript y detecta problemas',
  async (args) => {
    const { code } = args;
    return {
      issues: [
        { line: 5, type: 'warning', message: 'Variable no utilizada' },
        { line: 12, type: 'error', message: 'Función no definida' }
      ],
      metrics: {
        lines: code.split('\\n').length,
        complexity: 'media'
      }
    };
  }
);

console.log('Herramientas disponibles:', mcpServer.listTools());`,
        demo: "mcp-demo"
      }
    }
  ];

  // Navegación circular
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % aiExamples.length;
    setCurrentIndex(nextIndex);
    setSelectedExample(aiExamples[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? aiExamples.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedExample(aiExamples[prevIndex]);
  };

  const handleExampleSelect = (example: AIExample) => {
    setSelectedExample(example);
  };

  const handleClose = () => {
    setSelectedExample(null);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedExample) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          handlePrevious();
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    if (selectedExample) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedExample, currentIndex]);

  // Demo functions
  const runSentimentDemo = () => {
    const sentiments = ['😊 POSITIVE (85.2%)', '😞 NEGATIVE (72.1%)', '😊 POSITIVE (91.7%)'];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    setSentimentResult(`"${testText}" -> ${randomSentiment}`);
  };

  const runTranslatorDemo = () => {
    const translations = {
      'Me encanta programar con JavaScript': 'I love programming with JavaScript',
      'La IA está revolucionando el desarrollo': 'AI is revolutionizing development',
      'Hola mundo': 'Hello world'
    };
    const translation = translations[testText] || 'Translation not available in demo';
    setTranslationResult(`"${testText}" -> "${translation}"`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'var(--color-link)';
      case 'experimental': return '#f59e0b';
      case 'concept': return 'var(--color-secondary)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'working': return 'Funcional';
      case 'experimental': return 'Experimental';
      case 'concept': return 'Concepto';
      default: return 'Desconocido';
    }
  };

  return (
    <>
      <style>
        {`
          .ai-section {
            margin-top: -3.5rem;
          }

          .ai-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          @media (min-width: 640px) {
            .ai-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .ai-card {
            display: block;
            border-radius: 0.75rem;
            border: 1px solid var(--color-link);
            padding: 1rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            background: var(--color-bg);
          }

          .ai-card:hover {
            border-color: var(--color-secondary);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
          }

          .ai-card.selected {
            border-color: var(--color-secondary);
            background: var(--color-secondary-accent);
          }

          .ai-logo {
            display: inline-block;
            border-radius: 0.5rem;
            background: #f9fafb;
            padding: 0.75rem;
            margin-bottom: 0.5rem;
            font-size: 2rem;
            line-height: 1;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .ai-name {
            margin: 0.5rem 0 0 0;
            font-weight: bold;
            color: var(--color-text);
          }

          .ai-description {
            margin: 0.25rem 0 0 0;
            font-size: 0.875rem;
            color: var(--color-text-secondary);
            display: none;
          }

          @media (min-width: 640px) {
            .ai-description {
              display: block;
            }
          }

          .ai-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }

          .ai-modal-content {
            background: var(--color-bg);
            border-radius: 0.75rem;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            border: 1px solid var(--color-bg-secondary);
          }

          .ai-modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid var(--color-bg-secondary);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .ai-modal-title {
            margin: 0;
            color: var(--color-text);
            font-size: 1.5rem;
          }

          .ai-modal-subtitle {
            margin: 0.5rem 0 0 0;
            color: var(--color-text-secondary);
            font-size: 0.875rem;
          }

          .ai-modal-controls {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }

          .ai-control-btn {
            background: var(--color-link);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s ease;
          }

          .ai-control-btn:hover {
            background: var(--color-secondary);
            transform: translateY(-1px);
          }

          .ai-close-btn {
            background: #ef4444;
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 1.25rem;
            line-height: 1;
          }

          .ai-close-btn:hover {
            background: #dc2626;
          }

          .ai-modal-body {
            padding: 1.5rem;
          }

          .ai-demo-section {
            background: var(--color-accent);
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
          }

          .ai-demo-controls {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
          }

          .ai-demo-input {
            flex: 1;
            padding: 0.5rem;
            border: 1px solid var(--color-bg-secondary);
            border-radius: 0.375rem;
            background: var(--color-bg);
            color: var(--color-text);
            min-width: 200px;
          }

          .ai-demo-btn {
            background: var(--color-secondary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 0.875rem;
          }

          .ai-demo-btn:hover {
            background: var(--color-link);
          }

          .ai-demo-result {
            background: var(--color-bg);
            border: 1px solid var(--color-bg-secondary);
            border-radius: 0.375rem;
            padding: 1rem;
            margin-top: 0.5rem;
            font-family: monospace;
            color: var(--color-text);
          }

          .ai-status-badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: bold;
            color: white;
            margin-bottom: 1rem;
          }

          .ai-code-container {
            background: #1f2937;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
            overflow-x: auto;
          }

          .ai-code-container pre {
            margin: 0;
            color: #f9fafb;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            white-space: pre-wrap;
          }

          .ai-navigation-info {
            text-align: center;
            margin-top: 1rem;
            color: var(--color-text-secondary);
            font-size: 0.875rem;
          }

          @media (max-width: 768px) {
            .ai-modal-content {
              max-width: 95vw;
              max-height: 95vh;
            }

            .ai-modal-header {
              padding: 1rem;
              flex-direction: column;
              align-items: stretch;
            }

            .ai-modal-controls {
              justify-content: space-between;
            }

            .ai-modal-body {
              padding: 1rem;
            }

            .ai-code-container {
              font-size: 0.75rem;
            }

            .ai-demo-controls {
              flex-direction: column;
            }

            .ai-demo-input {
              min-width: auto;
            }
          }
        `}
      </style>

      <section class="ai-section">
        <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div class="grid grid-cols-1">
            <h3 class="hidden text-center md:block font-bold">
              LA IA NO TE QUITARÁ EL TRABAJO
            </h3>
          </div>

          <div class="ai-grid" style="margin-top:5px;">
            {aiExamples.map((example, index) => (
              <div
                key={example.id}
                class={`ai-card ${selectedExample?.id === example.id ? 'selected' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                  handleExampleSelect(example);
                }}
              >
                <span class="ai-logo">
                  {example.logo}
                </span>

                <h4 class="ai-name">{example.nombre}</h4>

                <p class="ai-description">
                  {example.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedExample && (
        <div class="ai-modal" onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <div class="ai-modal-content">
            <div class="ai-modal-header">
              <div>
                <h2 class="ai-modal-title">{selectedExample.ejemplo.titulo}</h2>
                <p class="ai-modal-subtitle">{selectedExample.ejemplo.descripcion}</p>
              </div>
              
              <div class="ai-modal-controls">
                <button class="ai-control-btn" onClick={handlePrevious}>
                  ← Anterior
                </button>
                
                <button class="ai-control-btn" onClick={handleNext}>
                  Siguiente →
                </button>
                
                <button class="ai-close-btn" onClick={handleClose}>
                  ×
                </button>
              </div>
            </div>

            <div class="ai-modal-body">
              <span 
                class="ai-status-badge"
                style={{ backgroundColor: getStatusColor(selectedExample.ejemplo.status) }}
              >
                {getStatusText(selectedExample.ejemplo.status)}
              </span>

              {/* Demo interactivo */}
              {selectedExample.ejemplo.demo && (
                <div class="ai-demo-section">
                  <h3>🚀 Demo Interactivo</h3>
                  
                  {selectedExample.id === 'transformers-sentiment' && (
                    <>
                      <div class="ai-demo-controls">
                        <input
                          type="text"
                          class="ai-demo-input"
                          value={testText}
                          onInput={(e) => setTestText((e.target as HTMLInputElement).value)}
                          placeholder="Escribe un texto para analizar..."
                        />
                        <button class="ai-demo-btn" onClick={runSentimentDemo}>
                          Analizar Sentimiento
                        </button>
                      </div>
                      {sentimentResult && (
                        <div class="ai-demo-result">
                          {sentimentResult}
                        </div>
                      )}
                    </>
                  )}

                  {selectedExample.id === 'web-translator' && (
                    <>
                      <div class="ai-demo-controls">
                        <input
                          type="text"
                          class="ai-demo-input"
                          value={testText}
                          onInput={(e) => setTestText((e.target as HTMLInputElement).value)}
                          placeholder="Texto a traducir..."
                        />
                        <button class="ai-demo-btn" onClick={runTranslatorDemo}>
                          Traducir
                        </button>
                      </div>
                      {translationResult && (
                        <div class="ai-demo-result">
                          {translationResult}
                        </div>
                      )}
                    </>
                  )}

                  {(selectedExample.id === 'google-ai-barista' || selectedExample.id === 'mcp-protocol') && (
                    <div class="ai-demo-result">
                      💡 Este es un ejemplo conceptual. Requiere configuración adicional y claves API.
                    </div>
                  )}
                </div>
              )}

              <h3>📝 Código de ejemplo:</h3>
              <div class="ai-code-container">
                <pre>{selectedExample.ejemplo.codigo}</pre>
              </div>

              <div class="ai-navigation-info">
                Ejemplo {currentIndex + 1} de {aiExamples.length} • 
                Usa las flechas del teclado o los botones para navegar (navegación circular)
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveAIComponent;