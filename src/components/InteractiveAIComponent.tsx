import { useState, useEffect } from 'preact/hooks';

interface AIExample {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  code: string;
  demo?: string;
  status: 'working' | 'experimental' | 'concept';
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
      title: 'Análisis de Sentimientos',
      description: 'Usando Transformers.js para detectar emociones en texto',
      icon: '😊',
      category: 'NLP',
      status: 'working',
      code: `import { pipeline } from '@xenova/transformers';

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
    },
    {
      id: 'web-translator',
      title: 'Traductor Web Nativo',
      description: 'API de traducción experimental del navegador',
      icon: '🌐',
      category: 'Translation',
      status: 'experimental',
      code: `// API experimental de traducción del navegador
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

  async detectLanguage(text) {
    if (!('languageDetector' in window)) {
      return 'Detección no disponible';
    }

    try {
      // @ts-ignore - API experimental
      const detector = await window.languageDetector.create();
      const results = await detector.detect(text);
      return results[0]?.detectedLanguage || 'unknown';
    } catch (error) {
      return 'Error en detección';
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
    },
    {
      id: 'google-ai-barista',
      title: 'Barista AI con Gemini',
      description: 'Chatbot especializado usando Google AI Studio',
      icon: '☕',
      category: 'Chatbot',
      status: 'concept',
      code: `import { GoogleGenerativeAI } from '@google/generative-ai';

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
      // Construir el prompt completo
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

  async recommendCoffee(preferences) {
    const prompt = \`
Basándote en estas preferencias, recomienda el café perfecto:
- Intensidad preferida: \${preferences.intensity || 'media'}
- Momento del día: \${preferences.timeOfDay || 'mañana'}
- Con leche: \${preferences.withMilk ? 'sí' : 'no'}
- Dulce: \${preferences.sweet ? 'sí' : 'no'}
- Experiencia: \${preferences.experience || 'intermedio'}

Proporciona una recomendación específica con explicación.
\`;

    return await this.chat(prompt);
  }
}

// Ejemplo de uso
const barista = new BaristaAI('tu-api-key-aquí');

// Chat simple
const response = await barista.chat('¿Qué café me recomiendas para empezar el día?');
console.log(response);

// Recomendación personalizada
const recommendation = await barista.recommendCoffee({
  intensity: 'fuerte',
  timeOfDay: 'mañana',
  withMilk: true,
  sweet: false,
  experience: 'principiante'
});
console.log(recommendation);`,
      demo: "barista-demo"
    },
    {
      id: 'mcp-protocol',
      title: 'Model Context Protocol (MCP)',
      description: 'Protocolo para conectar modelos de IA con herramientas externas',
      icon: '🔗',
      category: 'Protocol',
      status: 'concept',
      code: `// Model Context Protocol - Concepto de implementación
// MCP permite que los modelos de IA accedan a herramientas y datos externos

class MCPServer {
  constructor() {
    this.tools = new Map();
    this.resources = new Map();
    this.prompts = new Map();
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

  // Registrar recursos (archivos, APIs, etc.)
  registerResource(uri, name, description, handler) {
    this.resources.set(uri, {
      uri,
      name,
      description,
      mimeType: "text/plain",
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

  // Listar herramientas disponibles
  listTools() {
    return Array.from(this.tools.values()).map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema
    }));
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
    // Simulación de análisis
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

// Herramienta para consultar documentación
mcpServer.registerTool(
  'search_docs',
  'Busca en la documentación de APIs web',
  async (args) => {
    const { query } = args;
    // Simulación de búsqueda
    return {
      results: [
        {
          title: \`Documentación de \${query}\`,
          url: \`https://developer.mozilla.org/docs/\${query}\`,
          summary: \`Información sobre \${query} en MDN\`
        }
      ]
    };
  }
);

// Uso del servidor
console.log('Herramientas disponibles:', mcpServer.listTools());

const codeAnalysis = await mcpServer.callTool('analyze_code', {
  code: 'function test() { const unused = 5; unknownFunction(); }'
});
console.log('Análisis de código:', codeAnalysis);`,
      demo: "mcp-demo"
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
    // Simulación del análisis de sentimientos
    const sentiments = ['😊 POSITIVE (85.2%)', '😞 NEGATIVE (72.1%)', '😊 POSITIVE (91.7%)'];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    setSentimentResult(`"${testText}" -> ${randomSentiment}`);
  };

  const runTranslatorDemo = () => {
    // Simulación de traducción
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
      case 'working': return '#10b981';
      case 'experimental': return '#f59e0b';
      case 'concept': return '#8b5cf6';
      default: return '#6b7280';
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
            margin-top: 2rem;
          }

          .ai-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .ai-title {
            font-size: 2rem;
            font-weight: bold;
            background: linear-gradient(135deg, var(--color-link), var(--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
          }

          .ai-subtitle {
            color: var(--color-text-secondary);
            font-size: 1.1rem;
          }

          .ai-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
          }

          @media (min-width: 768px) {
            .ai-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .ai-card {
            background: var(--color-bg);
            border: 1px solid var(--color-bg-secondary);
            border-radius: 0.75rem;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .ai-card:hover {
            border-color: var(--color-link);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .ai-card.selected {
            border-color: var(--color-secondary);
            background: var(--color-secondary-accent);
          }

          .ai-card-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: block;
          }

          .ai-card-title {
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: var(--color-text);
          }

          .ai-card-description {
            font-size: 0.875rem;
            color: var(--color-text-secondary);
            margin-bottom: 1rem;
            line-height: 1.4;
          }

          .ai-card-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.75rem;
          }

          .ai-card-category {
            background: var(--color-accent);
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            color: var(--color-text);
          }

          .ai-card-status {
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            color: white;
            font-weight: bold;
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
            max-width: 95vw;
            max-height: 95vh;
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
            display: flex;
            align-items: center;
            gap: 0.5rem;
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
              max-width: 98vw;
              max-height: 98vh;
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
          <div class="ai-header">
            <h2 class="ai-title">LA IA NO TE QUITARÁ EL TRABAJO</h2>
            <p class="ai-subtitle">
              Explora ejemplos prácticos de IA en desarrollo web
            </p>
          </div>

          <div class="ai-grid">
            {aiExamples.map((example, index) => (
              <div
                key={example.id}
                class={`ai-card ${selectedExample?.id === example.id ? 'selected' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                  handleExampleSelect(example);
                }}
              >
                <span class="ai-card-icon">{example.icon}</span>
                <h3 class="ai-card-title">{example.title}</h3>
                <p class="ai-card-description">{example.description}</p>
                <div class="ai-card-meta">
                  <span class="ai-card-category">{example.category}</span>
                  <span 
                    class="ai-card-status"
                    style={{ backgroundColor: getStatusColor(example.status) }}
                  >
                    {getStatusText(example.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedExample && (
        <div class="ai-modal" onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <div class="ai-modal-content">
            <div class="ai-modal-header">
              <h2 class="ai-modal-title">
                <span>{selectedExample.icon}</span>
                {selectedExample.title}
              </h2>
              
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
              {/* Demo interactivo */}
              {selectedExample.demo && (
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
                <pre>{selectedExample.code}</pre>
              </div>

              <div class="ai-navigation-info">
                Ejemplo {currentIndex + 1} de {aiExamples.length} • 
                Usa las flechas del teclado o los botones para navegar
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveAIComponent;