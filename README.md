# Prueba técnica My Investor Challenge

## Como arrancar

TBD

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

### Estructura del proyecto (TBD)

La elección de estructura del directorio esta basada principalmente en las funcionalidades tan marcadas, no así tanto de sus dominios.  

```
- src
  |- app: Aquí alojamos todo el bootstrap de la aplicacion, routers, providers, etc
  |- features: Todo lo relacionado con la feature, components, hooks, etc
  |- shared: UI generica, hooks, utils, types comunes
```