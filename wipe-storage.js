/* Evita errores de cuota en GitHub Pages limpiando storage al cargar */
try { localStorage.clear(); } catch (e) {}
try { sessionStorage.clear(); } catch (e) {}
