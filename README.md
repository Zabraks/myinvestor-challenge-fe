# MyInvestor Challenge - Documentación del Proyecto

## Introducción

Este documento recoge el desarrollo de una prueba técnica para MyInvestor, una aplicación web de gestión de fondos de inversión. En este README voy a explicar cómo está estructurado el proyecto, las decisiones que he tomado durante su desarrollo, qué funcionalidades incluye y qué mejoras aplicaría si dispusiera de más tiempo.

---

## Cómo correr el proyecto localmente

> Este proyecto ha sido desarrollado con **Node.js v24.13.0**.
> 

### IMPORTANTE

Se necesita tener el proyecto backend levantado y estar escuchando por el puerto `3000` para poder recibir datos 

### Instalación

1. Para instalar el proyecto con las dependencias:
    
    ```bash
    npm install
    ```
    
2. Para configurar Husky (para los git hooks):
    
    ```bash
    npm run prepare
    ```
    

### Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Arranca el servidor de desarrollo en modo local |
| `npm run build` | Genera la build de producción |
| `npm run test` | Ejecuta todos los tests unitarios e integración |
| `npm run test:watch` | Ejecuta los tests en modo watch (desarrollo) |
| `npm run test:coverage` | Genera el informe de cobertura de tests |
| `npm run test:e2e` | Ejecuta los tests end-to-end con Playwright |
| `npm run test:e2e:ui` | Abre la interfaz visual de Playwright |
| `npm run storybook` | Arranca Storybook para visualizar componentes |
| `npm run lint` | Ejecuta el linter para verificar el código |

### Arranque

Para ver la aplicación funcionando, se utiliza el comando:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` y dependerá de un backend levantado en la dirección `http://localhost:3000` .

### Build

Para hacer el build de la aplicación, tenemos que ejecutar:

```bash
npm run build
```

### Test

Para ejecutar los tests unitarios y de integración, se utiliza el comando:

```bash
npm run test
```

Si quieres ejecutar los tests en modo watch durante el desarrollo:

```bash
npm run test:watch
```

Para generar un informe de cobertura:

```bash
npm run test:coverage
```

Para los tests E2E con Playwright, primero hay que instalar los navegadores:

```bash
npx playwright install
```

Una vez instalados, se ejecutan los tests E2E con:

```bash
npm run test:e2e
```

Si prefieres usar la interfaz visual de Playwright para depurar tests:

```bash
npm run test:e2e:ui
```

> **Nota**: Los tests E2E requieren que la aplicación esté levantada.
> 

### Preview

Para previsualizar la build de producción localmente, primero se genera el build y después se ejecuta:

```bash
npm run build
npm run preview
```

La aplicación estará disponible en `http://localhost:4173`.

## Decisiones técnicas tomadas

---

## Stack tecnológico

### Vite como bundler

He elegido **Vite** por encima de otras alternativas por varios motivos:

- **Simplicidad**: Para un proyecto de este tamaño, Vite ofrece el equilibrio perfecto entre potencia y sencillez de configuración
- **Velocidad**: El Hot Module Replacement (HMR) es prácticamente instantáneo, lo que hace el desarrollo mucho más ágil
- **Sinergia con Vitest**: Comparte la misma configuración, lo que simplifica enormemente el setup de testing

### React 19 + TypeScript

React 19 junto con TypeScript forma la base del proyecto. TypeScript no solo ayuda a prevenir errores en tiempo de desarrollo, sino que también sirve como documentación viva del código.

## Arquitectura de la Aplicación

### Tailwind CSS + shadcn/ui

Esta combinación me permite trabajar rápidamente sin sacrificar control:

- **Tailwind** proporciona utilidades CSS para el desarrollo rápido y un sistema de tokenizacion y configuración de theme
- **shadcn/ui** aporta componentes accesibles basados en Radix UI que puedo personalizar completamente, ya que el código vive en mi proyecto, no en una librería externa

Los estilos se organizan mediante un sistema de **tokens CSS.**

### TanStack Query (React Query)

Para la gestión del estado del servidor he optado por **TanStack Query** para gestionar una cache inteligente con los datos, mejorar el control de estados de loading y error, y ser capaz de invalidar peticiones de manera automatica.

### TanStack Table (React Table)

Para la tabla de fondos utilizo **TanStack Table** que me da toda la lógica que debe tener una tabla y al ser headless me permite utilizar la librería shadcn/ui sin tener que casarme con una librería de tabla específica.

### **React Hook Form + Zod**

La gestión de formularios se apoya en **React Hook Form** para obtener un rendimiento óptimo evitando re-renders innecesarios. La validación se delega a **Zod**, que permite definir esquemas de datos estrictos.

### **Framer Motion**

He añadido esta libreria para implementar el gesto complejo del swipe en las acciones del portfolio en vista mobile. la animación es natural y con una aplicación sencilla.

## Testing

### **Vitest**

Utilizo Vitest para aprovechar su integración nativa con el motor de Vite. Al compartir el mismo sistema de resolución de módulos y transformación de archivos, los tests se ejecutan en un entorno idéntico al de desarrollo.

### **React Testing Library**

La utilizo como herramienta fundamental para los tests de integración. Es la librería que siempre he utilizado para realizar los test de integración de una aplicación de React.

### **Playwright**

He utilizado Playwright como herramienta de testint e2e por su alta demanda en el mercado y su sencillez de uso así como su, a mi parecer, mayor rapidez que Cypress.

### **MSW (Mock Service Worker)**

He utilizado MSW para interceptar las peticiones y así conseguir simular la comunicación de la app con el backend de una manera similar a la realidad ya que intercepta peticiones a nivel de red utilizándola en los tests para obtener mayor similitud con un entorno de desarrollo real.

### **Fishery + Faker**

Para la generación de datos de prueba he utilizado Fishery como motor de factorías, permitiendo crear objetos complejos reutilizables siguiendo el tipado de la aplicación. A su vez, lo combino con **Faker** para generar datos aleatorios realistas, lo que mejora la robustez de los tests.

### Ecosistema y Calidad (DX)

### **Storybook**

He incluido Storybook como catálogo de componentes. De esta manera, puedo modificar la ui y probarla de una manera aislada sin necesidad de disponer de la aplicación levantada. Ha sido útil para realizar modificaciones para los componentes más atómicos. También sirve de documentación visual de los componentes que se usan en la aplicación y que opciones de configuración tienen.

### **ESLint + Prettier**

He utilizado la combinacion de ESLint y Prettier para garantizar una base de código limpia y homogénea. De esta manera, se consigue que cualquier persona que trabaje en el proyecto siga las mismas reglas y formatos, promoviendo una coherencia de desarrollo por la aplicación.

### **Husky + commitlint**

He configurado **Husky** para gestionar Git Hooks relacionados con las reglas y formato de código mencionadas anteriormente con ESLint y Prettier y a su vez incorporando una revisión de commits antes de éstos para que todo lo que entre al repositorio siga `conventional-commits`.

## Arquitectura del proyecto

He estructurado el código siguiendo una arquitectura orientada a **features**:

```
src/
├── app/           → Configuración de la aplicación y rutas
├── components/    → Componentes UI reutilizables (design system)
├── context/       → Contextos de React para estado compartido
├── domain/        → Tipos y lógica de dominio (Fund, Order, Portfolio)
├── features/      → Funcionalidades organizadas por dominio
├── hooks/         → Hooks reutilizables
├── lib/           → Utilidades y configuraciones
├── pages/         → Componentes de página
├── services/      → Capa de comunicación con APIs
├── mocks/         → Configuración de MSW y factories de datos
|
tests/
├── e2e/           → test e2e (mobile y desktop)
├── fixtures/      → Fixtures de Playwright con helpers
└── utils/         → Selectores y generadores de datos mock
```

Esta estructura facilita la escalabilidad: si mañana necesito añadir una nueva funcionalidad, encuentro los dominios que competen a esa funcionalidad si fuese algo nuevo y creo una nueva carpeta en `features/` para que todo quede contenido.

### Estrategia para los tests

He implementado una **pirámide de tests** con tres niveles:

1. **Tests unitarios** (Vitest): Para funciones puras y utilidades
2. **Tests de integración** (Vitest + React Testing Library): Para componentes y flujos de usuario
3. **Tests E2E** (Playwright): Para validar flujos de usuario

Los tests E2E están separados por dispositivo (desktop y mobile) y utilizan **fixtures con utilidades e interceptaciones de peticiones.**

### Calidad de código

- **ESLint** + **Prettier**: Garantizan un código consistente y obligan a seguir un patron común
- **Husky** + **lint-staged**: Ejecutan verificaciones antes de cada commit
- **Commitlint**: Asegura que los mensajes de commit sigan Conventional Commits

## Funcionalidades implementadas

---

## App

### Catálogo de fondos

La página principal muestra una **tabla con todos los fondos de inversión disponibles**:

- **Ordenación**: Puedes ordenar por cualquier columna (nombre, categoría, valor, rentabilidades…)
- **Paginación**: Navegación entre páginas con selector de elementos por página (10, 25, 50, 100)
- **Información detallada**: Cada fondo muestra nombre, categoría, moneda, valor actual y rentabilidades históricas (YTD, 1 año, 3 años, 5 años)

### Mi cartera (Portfolio)

Sección donde el usuario puede ver **los fondos que tiene en su cartera**:

- Lista de fondos con cantidad invertida
- Valor actual de cada posición
- Estado de loading mientras cargan los datos
- Manejo de errores con opción de reintentar

### Órdenes

Historial de **operaciones realizadas** por el usuario:

- Tipo de operación (compra, venta, transferencia)
- Fecha y detalles de cada operación

### Acciones sobre fondos

Desde la cartera, el usuario puede realizar **tres tipos de operaciones**:

- **Comprar**: Adquirir más participaciones de un fondo
- **Vender**: Desinvertir participaciones
- **Transferir**: Mover inversión de un fondo a otro
- **Detalle**: Ver más información del fondo

### Diseño responsive

La aplicación está **completamente adaptada a móvil y escritorio**:

- Todo el contenido es facilmente visible tanto en mobile como en desktop
- Las acciones de los fondos de la cartera se presentan en una tarjeta deslizable en mobile frente al botón de acciones en desktop
- La tabla de fondos tiene un overflow para facilitar el scroll lateral en mobile
- Uso de shadcn/ui con tailwind para crear un sistema de componentes propio y mantenible para la aplicación
- Storybook básico donde ver los diseños de los componentes por individual, su comportamiento y su mantenimiento

## Testing

### Testing unitario

Tests enfocados en **validar la lógica de negocio de forma aislada.**  

- Se han realizado testings para validar los schemas de Zod de los formularios (compra, venta, transferencia)
- Realizados tests en los mappers de datos entre API y dominio
- Realizados tests en los utils reutilizables por toda la aplicación como colores según rentabilidad, paginación, sorting y formateos de moneda

### Testing de integración

Tests que validan **el comportamiento de componentes completos con sus dependencias.** 

- Se han comprobado los componentes principales y destacados de la aplicación (formulario con las distintas acciones, tabla, listado de portfolio, providers, contextos y control de mensajes de errores).
- Se ha usado Factorias para simular mejor el comportamiento con el backend.
- Se han realizado tests hasta llegar a una cobertura aproximada de más del 85%

### Testing E2E

Tests de extremo a extremo con **Playwright separados por dispositivo.** 

- Se ha separado el proyecto en `mobile` y `desktop` para permitir un flujo más flexible del testing y con mayor facilidad de escalado
- Se han realizado tests de las principales demandas de la aplicación, listado de fondos, paginación, ordenacion, acciones, portfolio, smoke tests básicos.
- Se han utilizado fixtures para extender el test base y usado helpers para poder interceptar peticiones y generar contenido mockeado de una manera eficiente.
- Se ha creado un objeto de constantes para generar una mayor robustez en dichos tests.

### Interceptación de peticiones

Se ha añadido **MSW (Mock Service Worker)** para simular respuestas de API de forma consistente.

- Según el recurso se han generado distintos handlers para delimitar la funcionalidad del mock al recurso (`portfolioHandlers`, `buyFundHandler`, etc).
- Se han generado factorias que usan el tipado de la aplicación para mantener la consistencia del dato que se va a brindar.
- Se han usado seed fijos para la generación de datos determinísiticos entre ejecuciones
- Se ha creado un store para mantener el estado del portfolio en los mocks y que así estos sean sensibles a las mutations de compra, venta o transferencia.

## Qué mejoraría si tuviera más tiempo

---

### 1. Internacionalización (i18n)

Actualmente todos los textos están hardcodeados en español. Integraría un sistema multilenguaje robusto tipo **React-i18next** 

### 2. Generación de variables de entorno

No las he creado por brindar una facilidad de uso rápido de la prueba, pero lo correcto sería tener ciertos valores inmutables de la aplicación en un `.env`  que permita la reutilización de este y evitar repetir cadenas que después hagan su mantenimiento más complicado.

### 3. Robustez y esencia en el theming y token

Al final, he usado el sistema de TailwindCSS para tener un theme sencillo de crear y desarrollar pero no tiene apenas tokens ni una configuración seria. Habría que implementar un buen sistema de tokenizacion, configuración de ciertas clases más ajustadas al “branding” a través de tailwind.config.ts y crear adaptaciones para no tener demasiados estilos incrustados directamente en los componentes.

### 4. Modo oscuro

Siguiendo el punto anterior, unos de los beneficios directos que supondría ese theming es la facilidad de desarrollar un modo oscuro eficiente. La base esta creada pero falta implementarla por completo.

### 5. Optimizar caché

Como primera opción lo ideal sería guardar Orders en el backend pero de no ser así intentaría algún sistema con el localStorage para gestionar el mantener vivo las orders después de un refresco de JS y posibles mejoras para la recepción de algunos valores.

### 6. Revisión de Accesibilidad y personalización de la libreria de componentes

Se ha utilizado shadcn/ui por la compatibilidad con Tailwind y esa primera capa de accesibilidad que ofrece de base RadixUI pero se han instalado componentes completos, los cuales muchos no son necesarios y los que lo son necesitan una revisión en términos de accesibilidad.

### 7. Storybook refinado

Ahora mismo tenemos una base sencilla para comprender los distintos componentes de la aplicación pero sería un siguiente paso, revisar cada historia para ver posibles mejoras, ya no solo de la historia en sí si no también del propio componente pasando tests de accesibilidad o pruebas de interacción.

### 8. Integración completa de MSW y factorías en la aplicación

Ahora mismo MSW, esta integrado para que funcione con los tests de integración y en storybook, pero ha presentado algún error en storybook y algunos tests se podrían mejorar utilizando mejor las factorías. Incluso se podría añadir a la ejecución de desarrollo y así evitar usar el backend.

### 9. Tests de regresión visual

Los he intentado integrar en Playwright pero no es algo que yo haya trabajado en el pasado y sentía que no estaban funcionando muy bien, es algo que investigaría y añadiría al proyecto.

### 10. Documentación

Solo por rizar un poco el rizo, más allá de presentar un README, si se quiere desarrollar más la documentación se podría insertar algún sistema interno de documentación tipo Docusaurus para una documentación mejor desarrollada en la app

## Qué funcionalidades añadiría a la aplicación

---

### 1. Filtrado avanzado en la tabla

Añadiría un sistema sencillo de filtros estilo **Jira** que permitiese ir añadiendo pequeñas configuraciones por campo y eso fuese discriminando los valores, esto no solo afectaría al frontend también al backend.

### 2. Visión global del portfolio

Una tarjeta sencilla que indique todo el dinero que se tiene invertido y una serie de gráficos que permitan aprovechando shadcn/ui que den una visualización sencilla y rápida del estado del portfolio del usuario.

### 3. Vista de los fondos detallada

Añadiría una sección nueva dentro del portfolio `/portfolio/fund` que muestre información del fondo con respecto a tu actividad, que se pueda ver el listado de ordenes, las participaciones que tienes de ese fondo. Dentro se podrían añadir las acciones de una manera rápida y un sistema de comparación con otros fondos según rentabilidad, para poder hacer un traspaso rápido.
