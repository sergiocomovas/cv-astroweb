import { useState, useEffect } from 'preact/hooks';

const ThemeControlsComponent = () => {
  const [currentTheme, setCurrentTheme] = useState<'auto' | 'light' | 'dark'>('auto');

  useEffect(() => {
    // Obtener tema actual del localStorage o usar 'auto' por defecto
    const savedTheme = localStorage.getItem('color-theme') as 'auto' | 'light' | 'dark' || 'auto';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: 'auto' | 'light' | 'dark') => {
    const root = document.documentElement;
    
    if (theme === 'auto') {
      root.removeAttribute('color-mode');
      root.style.colorScheme = '';
    } else if (theme === 'light') {
      root.setAttribute('color-mode', 'light');
      root.style.colorScheme = 'light';
    } else if (theme === 'dark') {
      root.setAttribute('color-mode', 'dark');
      root.style.colorScheme = 'dark';
    }
  };

  const toggleTheme = () => {
    const themes: ('auto' | 'light' | 'dark')[] = ['auto', 'light', 'dark'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setCurrentTheme(nextTheme);
    localStorage.setItem('color-theme', nextTheme);
    applyTheme(nextTheme);
  };

  const clearLocalStorage = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos los datos guardados localmente? Esto incluye preferencias y configuraciones.')) {
      localStorage.clear();
      // Recargar la página para aplicar los cambios
      window.location.reload();
    }
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      default: return '🔄';
    }
  };

  const getThemeText = () => {
    switch (currentTheme) {
      case 'light': return 'Claro';
      case 'dark': return 'Oscuro';
      default: return 'Auto';
    }
  };

  return (
    <>
      <style>
        {`
          .theme-controls {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            margin-top: 0.5rem;
            font-size: 0.75rem;
            opacity: 0.6;
            transition: opacity 0.3s ease;
          }

          .theme-controls:hover {
            opacity: 1;
          }

          .theme-btn, .clear-btn {
            background: none;
            border: 1px solid var(--color-text-secondary);
            color: var(--color-text-secondary);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.7rem;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
          }

          .theme-btn:hover, .clear-btn:hover {
            border-color: var(--color-link);
            color: var(--color-link);
            transform: translateY(-1px);
          }

          .clear-btn:hover {
            border-color: #ff6b6b;
            color: #ff6b6b;
          }

          @media (max-width: 768px) {
            .theme-controls {
              justify-content: center;
              margin-top: 0.75rem;
            }
          }
        `}
      </style>

      <div class="theme-controls">
        <button 
          onClick={toggleTheme}
          class="theme-btn"
          title={`Tema actual: ${getThemeText()}. Clic para cambiar.`}
        >
          <span>{getThemeIcon()}</span>
          <span>{getThemeText()}</span>
        </button>
        
        <button 
          onClick={clearLocalStorage}
          class="clear-btn"
          title="Borrar todos los datos guardados localmente"
        >
          <span>🗑️</span>
          <span>Limpiar</span>
        </button>
      </div>
    </>
  );
};

export default ThemeControlsComponent;