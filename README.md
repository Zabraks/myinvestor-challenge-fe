# Prueba técnica My Investor Challenge

## Como arrancar

TBD

para preparar husky "npm run prepare"

## Decisiones Técnicas

En cuanto al setup básico del proyecto he utilizado:

### Tecnologías

#### Vite

He apostado por Vite por varios motivos:

- Proyecto: Por un lado el proyecto no es un proyecto grande, tiene un par de rutas y funcionalidades muy específicas, eso
  hace que Vite sea la opción en términos de simplicidad de instalación y mantenimiento

- Agilidad: Tener una estructura sencilla lista para funcionar con su soporte nativo en typescript y la potencia del HMR hace que trabajar sobre el sea una experiencia rápida y sencilla

- Test con Vitest: Uno de los puntos fuertes es la sinergia total con Vitest. Uso la misma configuración para la aplicación y para los tests.

Next podría haber sido otra buena opción pero realmente para las demandas del proyecto, vite es un equilibrio perfecto, simple, moderno, ligero, y rapido.

#### ESLint

Herramienta muy común centrada en detectar errores comunes durante el tiempo de desarrollo, útil en cualquier equipo que quiera seguir unas normas y convenciones comunes.

#### Prettier

Herramienta centrada en el estilo y formateo del código según las reglas definidas. Fin similar al de ESLint cuando se trabaja en equipo.

#### Husky + lint-staged + Commitlint

Herramienta que utiliza scripts antes de un commit. En este caso lo hemos usado como barrera y evitar que pueda pasar algun error que ya haya pasado ESLint y se nos haya podido pasar. También, para mantener una coherencia en el git history, he añadido commitlint para que sigan conventional commits

#### Tailwind

Herramienta rapida y sencilla para añadir estilos asi como la base para el tema de la aplicación y la tokenización de estilos

#### Shadcn/ui

Uso Shadcn/UI como base de componentes para disponer de una libreria de componentes, permitiendo más agilidad en el desarrollo sin perder el control total de los estilos del diseño. Además utilizan la accesibilidad de los primitivos de Radix, lo cual permite el desarrollo más sencillo.
Los componentes forman parte del código del proyecto, se nutren de los estilos de Tailwind y del sistema de tokenizacion en CSS.

#### Vitest

Como ya hemos mencionado antes, La sinergia con Vite hace que sea la opción idonea, aparte de por su ya rapidez de por si.

#### React-testing-library (TBD)

#### Playwright

He implementado Playwright como herramienta de testing E2E y visual regression. Aunque es una tecnología relativamente nueva para mí, he aplicado los mismos principios de ingeniería de software que uso en cualquier otro código: **DRY**, **Clean Code** y **Single Responsibility**.

**¿Por qué Playwright sobre Cypress o Selenium?**

| Criterio | Playwright | Cypress | Selenium |
|----------|------------|---------|----------|
| Soporte multi-navegador | ✅ Chromium, Firefox, WebKit | ⚠️ Limitado | ✅ Todos |
| Visual Regression nativo | ✅ `toHaveScreenshot()` | ❌ Requiere plugin | ❌ Requiere herramientas externas |
| Velocidad | ✅ Muy rápido | ✅ Rápido | ⚠️ Más lento |
| API moderna | ✅ Async/await nativo | ⚠️ Cadena de comandos | ⚠️ API verbosa |
| Auto-wait | ✅ Inteligente | ✅ Sí | ❌ Manual |

**Arquitectura de tests:**

```
tests/
├── e2e/                           # Tests funcionales end-to-end
│   ├── funds-list.smoke.spec.ts   # Verificación rápida de funcionalidad crítica
│   ├── funds-list.sorting.spec.ts # Tests de ordenación de columnas
│   └── funds-list.pagination.spec.ts # Tests de navegación paginada
├── visual/                        # Tests de regresión visual
│   ├── funds-table.visual.spec.ts # Screenshots para detectar cambios UI
│   └── __snapshots__/             # Baselines por proyecto (desktop/mobile)
├── fixtures/                      # Configuración reutilizable
│   └── funds-api.fixture.ts       # Interceptación de API con datos mock
└── utils/                         # Utilidades compartidas
    ├── selectors.ts               # Selectores centralizados (accesibles)
    └── mock-data.ts               # Generador de datos determinísticos
```

**Decisiones técnicas clave:**

1. **Fixtures personalizados**: Extiendo `test` de Playwright con `fundsPage` y `mockFundsApi` para que cada test tenga la API mockeada automáticamente. Esto sigue el principio DRY - la configuración del mock se hace una vez y se reutiliza.

2. **Selectores accesibles**: Priorizo `getByRole()` y `getByText()` sobre selectores CSS. Son más resistentes a cambios de estilo y promueven buenas prácticas de accesibilidad.

3. **Datos determinísticos**: El generador de mocks usa seeds para producir siempre los mismos datos. Esto hace los tests reproducibles y facilita el debugging.

4. **Separación de responsabilidades**: Cada archivo de test tiene un propósito claro (smoke, sorting, pagination, visual). Facilita ejecutar subconjuntos según necesidad.

**Ejecución de tests:**

```bash
# Ejecutar todos los tests E2E
npx playwright test --project=desktop-chrome

# Ejecutar solo smoke tests (rápido, ideal para CI en PRs)
npx playwright test funds-list.smoke

# Ejecutar tests visuales y actualizar baselines si hay cambios intencionales
npx playwright test --project=visual-desktop --update-snapshots

# Ver el reporte HTML tras la ejecución
npx playwright show-report

# Modo UI interactivo para debugging
npx playwright test --ui
```

**Estrategia de screenshots:**

Los tests visuales capturan screenshots de:
- Tabla completa de fondos
- Página completa (viewport)
- Controles de paginación
- Estados específicos (menú abierto, columna ordenada, lista vacía)

Los baselines se guardan en `tests/visual/__snapshots__/{project-name}/` separados por dispositivo (desktop vs mobile) para comparaciones precisas.

**Nota de honestidad profesional:** Aunque mi experiencia con la sintaxis específica de Playwright es reciente, he aplicado los mismos principios de diseño que uso en código de producción. La suite es mantenible, los tests siguen el flujo real del usuario, y la estructura permite escalar sin fricción.

#### Storybook (TBD)

#### MSW (Mock Service Worker)

Para el mocking de peticiones HTTP he elegido MSW frente a otras alternativas como `nock` o mocks manuales de `fetch`. Las razones principales:

- **Intercepción a nivel de red**: MSW intercepta las peticiones a nivel del Service Worker, lo que significa que el código de producción no necesita ninguna modificación. Las llamadas a `fetch` funcionan exactamente igual que en producción.

- **Compartido entre tests y Storybook**: Los mismos handlers se reutilizan tanto en tests unitarios con Vitest como en Storybook para desarrollo visual. Esto evita duplicar código de mocks y mantiene consistencia.

- **API declarativa**: Los handlers se definen de forma clara y legible, facilitando el mantenimiento.

- **Soporte para MSW v2**: He usado la API moderna con `http` y `HttpResponse` en lugar de la API legacy (`rest`), preparando el proyecto para el futuro.

#### Fishery + Faker.js

Para la generación de datos de prueba he optado por la combinación de **fishery** (factories tipadas) + **@faker-js/faker** (generación de datos realistas). Esta decisión se tomó tras evaluar varias alternativas:

| Alternativa | Evaluación |
|-------------|------------|
| Datos hardcodeados | ❌ Poco mantenible, difícil de escalar, propenso a errores cuando cambian los tipos |
| Solo Faker.js | ⚠️ Funciona bien pero no tiene soporte nativo para factories ni traits |
| Zod + zod-mock | ⚠️ Interesante pero requiere migrar todos los tipos a schemas Zod |
| @mswjs/data | ⚠️ Potente para simular bases de datos pero excesivo para este caso de uso |
| **Fishery + Faker** | ✅ Balance ideal entre tipado, flexibilidad y simplicidad |

**Beneficios de esta combinación:**

1. **Type-safe por defecto**: Las factories están tipadas con los interfaces del dominio (`ApiFund`, etc.). Si cambia el tipo, TypeScript detecta inmediatamente qué factories necesitan actualizarse.

2. **Datos realistas**: Faker genera nombres de empresas, valores numéricos en rangos coherentes, y símbolos bursátiles que hacen los tests más representativos.

3. **Tests determinísticos**: La función `generateDeterministicFunds()` usa un seed fijo, garantizando que los mismos datos se generen siempre. Esto es crítico para tests de snapshot y debugging.

4. **Traits para escenarios específicos**: Fishery permite definir variantes (fondos con alta rentabilidad, fondos en pérdidas, etc.) sin duplicar código.

5. **Sequences automáticos**: Los IDs se generan secuencialmente (`fund-001`, `fund-002`...), evitando colisiones y facilitando la trazabilidad.

**Ejemplo de uso:**

```typescript
// Generar un fondo aleatorio
const fund = fundFactory.build();

// Generar 50 fondos para probar paginación
const funds = fundFactory.buildList(50);

// Override de propiedades específicas
const techFund = fundFactory.build({ category: 'TECH' });

// Datos determinísticos para tests
const consistentFunds = generateDeterministicFunds(10, 12345);
```

Esta arquitectura de mocking permite que los tests sean rápidos, aislados, y que reflejen escenarios realistas sin depender de un backend real.

### Librerias

#### React-router-dom (TBD)

### Estructura del proyecto (TBD)

La elección de estructura del directorios esta centrada en una aquitectura modular por responsabilidades, relativamente rápida, permite una mayor claridad de los distintos aspectos de la aplicación y permite una escalabilidad para el futuro.

```
myinvestor-challenge/ (TBD)
├─ src/
│  ├─ app/                     # Bootstrap de la aplicación
│  ├─ components/              # Componentes reutilizables de la aplicación
│  │  └─ ui/                   # Componentes primitivos
│  ├─ domain/                  # Tipos y reglas compartidas
│  ├─ features/                # Casos de uso de la aplicación
│  ├─ lib/                     # utilidades genéricas
│  ├─ pages/                   # Páginas de la aplicación
│  ├─ services/                # gestión de peticiones y adaptadores externos
│  ├─ styles/                  # estilos globales y conf de Tailwind
│  └─ main.tsx                 # Entry point
│
├─ e2e/                        # Tests E2E

```
