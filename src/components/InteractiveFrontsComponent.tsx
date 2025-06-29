import { useState, useEffect } from 'preact/hooks';

interface Framework {
  id: string;
  logo: string;
  url: string;
  nombre: string;
  descripcion: string;
  ejemplo: {
    titulo: string;
    descripcion: string;
    codigo: string;
    demo?: string;
  };
}

const InteractiveFrontsComponent = () => {
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const frameworks: Framework[] = [
    {
      id: 'codeigniter',
      logo: "logos_front_2024/codeigniter.svg",
      url: "https://tbot.comovas.es/",
      nombre: "CodeIgniter Tbot",
      descripcion: "Proyecto desarrollado en PHP con CodeIgniter para Tbot.",
      ejemplo: {
        titulo: "Sistema de Autenticación",
        descripcion: "Ejemplo de login con CodeIgniter usando MVC pattern",
        codigo: `<?php
class Auth extends CI_Controller {
    public function login() {
        $this->load->view('login');
    }
    
    public function verify() {
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        
        if ($this->user_model->verify($username, $password)) {
            $this->session->set_userdata('logged_in', true);
            redirect('dashboard');
        } else {
            $this->session->set_flashdata('error', 'Credenciales inválidas');
            redirect('auth/login');
        }
    }
}`,
        demo: "https://tbot.comovas.es/auth/demo"
      }
    },
    {
      id: 'express',
      logo: "logos_front_2024/express.svg",
      url: "https://express.cosasdev.comovas.es",
      nombre: "Express.js API",
      descripcion: "API desarrollada con Node.js y Express.js.",
      ejemplo: {
        titulo: "API REST con Express",
        descripcion: "Endpoint para gestión de usuarios con middleware de autenticación",
        codigo: `const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rutas protegidas
app.get('/api/users', authenticateToken, (req, res) => {
  res.json({ users: ['user1', 'user2'] });
});

app.listen(3000, () => console.log('Server running on port 3000'));`,
        demo: "https://express.cosasdev.comovas.es/api/demo"
      }
    },
    {
      id: 'strapi',
      logo: "logos_front_2024/strapi.svg",
      url: "https://sbot.comovas.es/",
      nombre: "Strapi Sbot",
      descripcion: "Headless CMS desarrollado con Node.js y Strapi.",
      ejemplo: {
        titulo: "Content Type personalizado",
        descripcion: "Configuración de un modelo de artículos con relaciones",
        codigo: `// api/article/models/article.js
module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
      maxLength: 255
    },
    content: {
      type: 'richtext'
    },
    author: {
      model: 'user'
    },
    categories: {
      collection: 'category',
      via: 'articles'
    },
    publishedAt: {
      type: 'datetime'
    }
  }
};

// Lifecycle hooks
module.exports = {
  beforeCreate: async (data) => {
    data.slug = data.title.toLowerCase().replace(/\s+/g, '-');
  }
};`,
        demo: "https://sbot.comovas.es/admin"
      }
    },
    {
      id: 'gsheet',
      logo: "logos_front_2024/gsheet.svg",
      url: "https://express.cosasdev.comovas.es",
      nombre: "Gsx2json Gbot",
      descripcion: "Headless CMS desarrollado con Node.js y Gsx2json.",
      ejemplo: {
        titulo: "Google Sheets como CMS",
        descripcion: "Conectar Google Sheets como base de datos usando gsx2json",
        codigo: `const axios = require('axios');

class GoogleSheetsCMS {
  constructor(sheetId) {
    this.baseUrl = \`https://spreadsheets.google.com/feeds/list/\${sheetId}/od6/public/values?alt=json\`;
  }
  
  async getArticles() {
    try {
      const response = await axios.get(this.baseUrl);
      const entries = response.data.feed.entry;
      
      return entries.map(entry => ({
        title: entry.gsx$title.$t,
        content: entry.gsx$content.$t,
        author: entry.gsx$author.$t,
        date: entry.gsx$date.$t
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}

const cms = new GoogleSheetsCMS('your-sheet-id');
cms.getArticles().then(articles => console.log(articles));`,
        demo: "https://express.cosasdev.comovas.es/gsheet/demo"
      }
    },
    {
      id: 'telegram',
      logo: "logos_front_2024/telegram.svg",
      url: "https://telegraph.comovas.es",
      nombre: "Telegraph",
      descripcion: "Headless CMS desarrollado con Node.js y Telegraph.",
      ejemplo: {
        titulo: "Bot de Telegram con Telegraph",
        descripcion: "Crear y publicar artículos usando la API de Telegraph",
        codigo: `const { Telegraf } = require('telegraf');
const Telegraph = require('telegraph-node');

const bot = new Telegraf(process.env.BOT_TOKEN);
const telegraph = new Telegraph();

// Inicializar Telegraph
telegraph.createAccount('Mi Bot', 'https://t.me/mibot')
  .then(account => {
    console.log('Telegraph account created:', account.short_name);
  });

// Comando para crear artículo
bot.command('article', async (ctx) => {
  const content = ctx.message.text.replace('/article ', '');
  
  try {
    const page = await telegraph.createPage(
      'Artículo desde Telegram',
      [{ tag: 'p', children: [content] }],
      'Mi Bot'
    );
    
    ctx.reply(\`Artículo creado: \${page.url}\`);
  } catch (error) {
    ctx.reply('Error al crear el artículo');
  }
});

bot.launch();`,
        demo: "https://telegraph.comovas.es/demo"
      }
    },
    {
      id: 'knex',
      logo: "logos_front_2024/knex.svg",
      url: "https://knexjs.org/",
      nombre: "Knex.js",
      descripcion: "Constructor de consultas SQL para Node.js.",
      ejemplo: {
        titulo: "Query Builder con Knex",
        descripcion: "Construcción de consultas SQL complejas de forma programática",
        codigo: `const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp'
  }
});

// Consulta con joins y filtros
const getArticlesWithAuthors = async (categoryId, limit = 10) => {
  return await knex('articles')
    .select(
      'articles.id',
      'articles.title',
      'articles.content',
      'users.name as author_name',
      'categories.name as category_name'
    )
    .join('users', 'articles.author_id', 'users.id')
    .join('categories', 'articles.category_id', 'categories.id')
    .where('articles.category_id', categoryId)
    .where('articles.published', true)
    .orderBy('articles.created_at', 'desc')
    .limit(limit);
};

// Transacciones
const createArticleWithTags = async (articleData, tags) => {
  return await knex.transaction(async (trx) => {
    const [articleId] = await trx('articles').insert(articleData);
    
    const tagInserts = tags.map(tag => ({
      article_id: articleId,
      tag_name: tag
    }));
    
    await trx('article_tags').insert(tagInserts);
    return articleId;
  });
};`,
        demo: "https://knexjs.org/guide/"
      }
    }
  ];

  // Navegación circular
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % frameworks.length;
    const nextFramework = frameworks[nextIndex];
    setCurrentIndex(nextIndex);
    setSelectedFramework(nextFramework);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? frameworks.length - 1 : currentIndex - 1;
    const prevFramework = frameworks[prevIndex];
    setCurrentIndex(prevIndex);
    setSelectedFramework(prevFramework);
  };

  const handleFrameworkSelect = (framework: Framework) => {
    setSelectedFramework(framework);
  };

  const handleClose = () => {
    setSelectedFramework(null);
  };

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFramework) return;

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

    if (selectedFramework) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedFramework, currentIndex]);

  return (
    <>
      <style>
        {`
          .interactive-fronts {
            margin-top: -3.5rem;
          }

          .frameworks-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          @media (min-width: 640px) {
            .frameworks-grid {
              grid-template-columns: repeat(6, 1fr);
            }
          }

          .framework-card {
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

          .framework-card:hover {
            border-color: var(--color-secondary);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
          }

          .framework-card.selected {
            border-color: var(--color-secondary);
            background: var(--color-secondary-accent);
          }

          .framework-logo {
            display: inline-block;
            border-radius: 0.5rem;
            background: #f9fafb;
            padding: 0.75rem;
            margin-bottom: 0.5rem;
          }

          .framework-logo img {
            width: 100%;
            height: auto;
            max-width: 40px;
          }

          .framework-name {
            margin: 0.5rem 0 0 0;
            font-weight: bold;
            color: var(--color-text);
          }

          .framework-description {
            margin: 0.25rem 0 0 0;
            font-size: 0.875rem;
            color: var(--color-text-secondary);
            display: none;
          }

          @media (min-width: 640px) {
            .framework-description {
              display: block;
            }
          }

          .example-modal {
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

          .example-content {
            background: var(--color-bg);
            border-radius: 0.75rem;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            border: 1px solid var(--color-bg-secondary);
          }

          .example-header {
            padding: 1.5rem;
            border-bottom: 1px solid var(--color-bg-secondary);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .example-title {
            margin: 0;
            color: var(--color-text);
            font-size: 1.5rem;
          }

          .example-subtitle {
            margin: 0.5rem 0 0 0;
            color: var(--color-text-secondary);
            font-size: 0.875rem;
          }

          .example-controls {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }

          .control-btn {
            background: var(--color-link);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s ease;
          }

          .control-btn:hover {
            background: var(--color-secondary);
            transform: translateY(-1px);
          }

          .close-btn {
            background: #ef4444;
            color: white;
            border: none;
            padding: 0.5rem;
            border-radius: 0.375rem;
            cursor: pointer;
            font-size: 1.25rem;
            line-height: 1;
          }

          .close-btn:hover {
            background: #dc2626;
          }

          .example-body {
            padding: 1.5rem;
          }

          .code-container {
            background: #1f2937;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
            overflow-x: auto;
          }

          .code-container pre {
            margin: 0;
            color: #f9fafb;
            font-family: 'Courier New', monospace;
            font-size: 0.875rem;
            line-height: 1.5;
            white-space: pre-wrap;
          }

          .demo-link {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: var(--color-secondary);
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
          }

          .demo-link:hover {
            background: var(--color-link);
            transform: translateY(-1px);
          }

          .navigation-info {
            text-align: center;
            margin-top: 1rem;
            color: var(--color-text-secondary);
            font-size: 0.875rem;
          }

          @media (max-width: 768px) {
            .example-content {
              max-width: 95vw;
              max-height: 95vh;
            }

            .example-header {
              padding: 1rem;
              flex-direction: column;
              align-items: stretch;
            }

            .example-controls {
              justify-content: space-between;
            }

            .example-body {
              padding: 1rem;
            }

            .code-container {
              font-size: 0.75rem;
            }
          }
        `}
      </style>

      <section class="interactive-fronts">
        <div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div class="grid grid-cols-1">
            <h3 class="hidden text-center md:block font-bold">
              Explora mis APIS y Frontends
            </h3>
          </div>

          <div class="frameworks-grid">
            {frameworks.map((framework, index) => (
              <div
                key={framework.id}
                class={`framework-card ${selectedFramework?.id === framework.id ? 'selected' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                  handleFrameworkSelect(framework);
                }}
              >
                <span class="framework-logo">
                  <img src={framework.logo} alt={framework.nombre} loading="lazy" />
                </span>

                <h4 class="framework-name">{framework.nombre}</h4>

                <p class="framework-description">
                  {framework.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedFramework && (
        <div class="example-modal" onClick={(e) => e.target === e.currentTarget && handleClose()}>
          <div class="example-content">
            <div class="example-header">
              <div>
                <h2 class="example-title">{selectedFramework.ejemplo.titulo}</h2>
                <p class="example-subtitle">{selectedFramework.ejemplo.descripcion}</p>
              </div>
              
              <div class="example-controls">
                <button 
                  class="control-btn" 
                  onClick={handlePrevious}
                >
                  ← Anterior
                </button>
                
                <button 
                  class="control-btn" 
                  onClick={handleNext}
                >
                  Siguiente →
                </button>
                
                <button class="close-btn" onClick={handleClose}>
                  ×
                </button>
              </div>
            </div>

            <div class="example-body">
              <h3>Código de ejemplo:</h3>
              <div class="code-container">
                <pre>{selectedFramework.ejemplo.codigo}</pre>
              </div>

              {selectedFramework.ejemplo.demo && (
                <a 
                  href={selectedFramework.ejemplo.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="demo-link"
                >
                  🚀 Ver Demo en Vivo
                </a>
              )}

              <div class="navigation-info">
                Framework {currentIndex + 1} de {frameworks.length} • 
                Usa las flechas del teclado o los botones para navegar (navegación circular)
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteractiveFrontsComponent;