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

#### playwright(TBD)

#### Storybook(TBD)

### Estructura del proyecto (TBD)

La elección de estructura del directorio esta basada principalmente en las funcionalidades tan marcadas, no así tanto de sus dominios.

<!-- ```
myinvestor-challenge/
├─ src/
│  ├─ ui/                      # Componentes UI más atómicos
│  ├─ components/              # Componentes complejos compuestos por ui
│  ├─ features/                # Pantallas / secciones
│  └─ main.tsx                 # Entry point
│
├─ e2e/                        # Tests E2E

``` -->
