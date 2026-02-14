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

#### React Testing Library + Tests de Integración

Para los tests de componentes hemos optado por **React Testing Library** junto con **@testing-library/user-event** para simular interacciones reales del usuario.

**Estrategia de Tests de Integración para FundsTable**

Hemos priorizado los tests de **integridad estructural** y **navegación** (ordenación/paginación) sobre otros aspectos por las siguientes razones:


#### Playwright

He implementado Playwright como herramienta de testing E2E y visual regression. Aunque es una tecnología relativamente nueva para mí, he aplicado los mismos principios de ingeniería de software que uso en cualquier otro código: **DRY**, **Clean Code** y **Single Responsibility**.

**Arquitectura de tests:**

```
tests/
├── e2e/                                # Tests funcionales end-to-end
├── visual/                             # Tests de regresión visual
│   └── __snapshots__/                  # Baselines por proyecto (desktop/mobile)
├── fixtures/                           # Configuración reutilizable
└── utils/                              # Utilidades compartidas
```

**Decisiones técnicas:**

1. **Fixtures personalizados**: Extiendo `test` de Playwright con `fundsPage` y `mockFundsApi` para que cada test tenga la API mockeada automáticamente. Esto sigue el principio DRY - la configuración del mock se hace una vez y se reutiliza.

2. **Selectores accesibles**: Priorizo `getByRole()` y `getByText()` sobre selectores CSS. Son más resistentes a cambios de estilo y promueven buenas prácticas de accesibilidad.

3. **Datos determinísticos**: El generador de mocks usa seeds para producir siempre los mismos datos. Esto hace los tests reproducibles y facilita el debugging.

4. **Separación de responsabilidades**: Cada archivo de test tiene un propósito claro (smoke, sorting, pagination, visual). Facilita ejecutar subconjuntos según necesidad.

#### Storybook (TBD)

#### MSW (Mock Service Worker) (TBD)

Para el mocking de peticiones HTTP he elegido MSW

#### Fishery + Faker.js (TBD)

Para la generación de datos de prueba he optado por la combinación de **fishery** (factories tipadas) + **@faker-js/faker** (generación de datos realistas).

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
