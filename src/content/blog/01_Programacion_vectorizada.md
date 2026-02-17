---
title: "Programacion vectorizada: Optimizacion con indices"
description: "El poder de usar indices en los datos y no programacion funcional"
pubDate: 'Feb 16 2026'
heroImage: "../img/paisaje.jpg"
---



En este apartado hablaré sobre la importancia de programar de forma vectorizada en análisis de datos, sustituyendo el uso innecesario de `apply`, `lambda` y `for` anidados, los cuales suelen introducir ineficiencia cuando trabajamos con grandes volúmenes de información

## ¿Qué es la programación vectorizada?

La programación vectorizada consiste en realizar operaciones sobre columnas completas en lugar de iterar elemento por elemento

En bibliotecas como `pandas` y `numpy`, muchas operaciones están optimizadas internamente en bajo nivel (C), lo que permite ejecutar cálculos y validaciones de manera mucho más eficiente que utilizando bucles tradicionales en Python

En lugar de:

> “Recorrer cada fila y validar el valor”

Trabajamos así:

> “Aplicar una condición directamente sobre toda la columna”

Esto mejora el rendimiento, la claridad del código y la escalabilidad del proceso.

---

## Caso práctico: Filtrar órdenes alfanuméricas

Supongamos que ya existe una columna llamada `ORDER_ID` y queremos filtrar únicamente aquellas órdenes que sean alfanuméricas, es decir, que contengan al menos una letra y al menos un número.

### ❌ Enfoque no recomendado (iterativo)

```python
resultado = []

for order in df["ORDER_ID"]:
    if any(c.isalpha() for c in order) and any(c.isdigit() for c in order):
        resultado.append(order)
```

Este enfoque itera por elemento, ejecuta multiples validaciones por registro y no escala de la mejor manera ejemplo peude tardar 9 minutos si con vectorizado tardaria segundos ya que no itera a todos los valores 

### ✅ Enfoque recomendado 

```python
#  ORDER_ID es la columnas id e.j: 27457253, 18374hkjh81379
# y queremos filtrar únicamente aquellas órdenes que
# contengan al menos una letra y al menos un número
# (es decir, que sean alfanuméricas reales)

mask = df["ORDER_ID"].str.contains(
    r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$',
    regex=True
    )

df_alfanumericas = df[mask]

df_alfanumericas.head()
```



### Ejemplo practica real

En un proyecto de negocio se tenía la tarea de limpiar y estandarizar las columnas correspondientes a los empleados que generaban órdenes. Era fundamental mantener esta información correctamente normalizada, ya que un mismo empleado podía trabajar para distintos proveedores (lo cual estaba permitido bajo el modelo de outsourcing).

El problema surgía porque los nombres no seguían un formato consistente. Por ejemplo, podían encontrarse registros como:

- Oscar Amaro 3457  
- Oscar 8739KL Amaro  
- Proveedor1 18371 Oscar Amaro J  
- Oscar Amaro  

Aunque aparentemente se trata de la misma persona, cada registro representaba un proveedor distinto bajo el cual podía operar. En este modelo, el empleado no pertenecía directamente a la empresa, sino que actuaba como proveedor externo dependiendo del contrato activo.

La regla de negocio establecida indicaba que:

- Si el registro contenía un identificador numérico o alfanumérico, se consideraba un proveedor específico.
- Si solo contenía el nombre (sin valores numéricos o alfanuméricos), se consideraba como empleado directo.

Por ello, era necesario aplicar validaciones y limpieza de texto que permitieran identificar correctamente cuándo se trataba de un proveedor y cuándo de un empleado interno

veamos ejemplos vecorizados con .iloc y sin

```python
import numpy as np

df["CARRIER"] = None
# Máscaras vectorizadas
mask_proveedor1 = df["EMPLOYEE_RAW"].str.contains(r'Proveedor1', regex=True)

mask_numeric = df["EMPLOYEE_RAW"].str.contains(
    r'\b\d+\b', regex=True
) & ~df["EMPLOYEE_RAW"].str.contains(
    r'[A-Za-z]*\d+[A-Za-z]+|\d+[A-Za-z]+', regex=True
)

mask_alphanumeric = df["EMPLOYEE_RAW"].str.contains(
    r'(?=.*[A-Za-z])(?=.*\d)', regex=True
)

mask_worker = ~df["EMPLOYEE_RAW"].str.contains(r'\d', regex=True)

# Asignación usando iloc
df.iloc[mask_proveedor1.values, df.columns.get_loc("CARRIER")] = "PROVEDOR_1"
df.iloc[mask_numeric.values, df.columns.get_loc("CARRIER")] = "NUMERIC_CARRIER"
df.iloc[mask_alphanumeric.values, df.columns.get_loc("CARRIER")] = "ALPHA_NUMERIC_CARRIER"
df.iloc[mask_worker.values, df.columns.get_loc("CARRIER")] = "WORKER"
```
esto crea mascara booleanas dodne solo iterara dodne sea True (o lo que definamos) por eso es que a nivel de optimizacion es mas rapido iterara solo dodne cumple sin crear condicionales solo iteraciones por lo cual 

- Creamos máscaras booleanas vectorizadas.
- Usamos `.iloc` con posiciones booleanas.
- No usamos loops.
- No usamos `apply`.
- Toda la clasificación es por operaciones sobre la columna completa

Esto mantiene el código eficiente y escalable incluso con millones de registros 

### Ejemplo sin iloc, usando select
```python
import numpy as np
# Máscaras vectorizadas
mask_proveedor1 = df["EMPLOYEE_RAW"].str.contains(r'Proveedor1', regex=True)

mask_alphanumeric = df["EMPLOYEE_RAW"].str.contains(
    r'(?=.*[A-Za-z])(?=.*\d)', regex=True
)

mask_numeric = df["EMPLOYEE_RAW"].str.contains(
    r'\b\d+\b', regex=True
) & ~mask_alphanumeric

mask_worker = ~df["EMPLOYEE_RAW"].str.contains(r'\d', regex=True)

# Clasificación vectorizada
df["CARRIER"] = np.select(
    [
        mask_proveedor1,
        mask_numeric,
        mask_alphanumeric,
        mask_worker
    ],
    [
        "PROVEDOR_1",
        "NUMERIC_CARRIER",
        "ALPHA_NUMERIC_CARRIER",
        "WORKER"
    ],
    default="UNCLASSIFIED"
)
```

- No usamos `.iloc`
- No usamos `apply`
- No usamos loops
- Toda la lógica está centralizada
- Es más legible y mantenible
- Escala perfectamente en producción

### ¿Cual usar?

Todo dependera del nivel de complejidad del negocio y escalabilidad, ambas son buenas pero ya dependere de que tan como este el equipo de leer y añadir 

## Conclusión

Programar de forma vectorizada no es solo una optimización, es una mentalidad orientada a eficiencia y escalabilidad. En entornos donde los datos crecen exponencialmente, sustituir `apply`, `lambda` y `for` anidados por operaciones vectorizadas permite reducir tiempos de ejecución, mejorar la legibilidad del código y construir pipelines preparados para producción

En ciencia de datos e ingeniería moderna, escribir código que piense en columnas y no en filas es una decisión estratégica. La vectorización no solo acelera procesos: habilita sistemas más robustos, mantenibles y alineados con arquitecturas de alto rendimiento
 🚀✨