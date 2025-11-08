# Mapeo / Lógica de la app (restaurado)

Fuente de datos
- Google Sheet publicado en CSV (público): 
  https://docs.google.com/spreadsheets/d/e/2PACX-1vSg0UeYMVZj0b9H2V63XS37oXlIwJ6SL4n-m6WJEbspzM5OP9QA3QF6qSw4fr81dw/pub?gid=1861393565&single=true&output=csv

Columnas esperadas (cabeceras mínimas):
- nombre, categoria, barrio, direccion, lat, lng, imagen

Interfaz (intacta):
- Input de texto
- Botones: Buscar, 🎤 Voz, Cerca, Actualizar, Limpiar
- Mensajes de estado arriba; cards con imagen (o placeholder), nombre, categoría, barrio y dirección.
- SIN menús ni filtros adicionales; SIN autolistar al inicio.

Flujo:
1) Inicio → 'Listo. No se cargan comercios hasta que lo pidas.'
2) Buscar (texto/voz) → normalización (minúsculas, sin acentos) y filtro sobre todas las columnas
3) Cerca → Haversine, radio fijo 600 m, orden ascendente por distancia
4) Actualizar → refetch del CSV (anti-cache)
5) Limpiar → limpia input y cards

Robustez agregada (sin cambiar UI):
- Parser CSV tolerante a comillas y comas internas
- Evita 404 en imágenes inválidas (placeholder cuando no es URL http/https)
- Anti-cache en fetch (&nocache=timestamp)
