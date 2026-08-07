# TODO - Hacer funcional la app y el APK

- [x] 1. Backend: quitar autenticación (Basic auth) de los endpoints PUT/PATCH/DELETE en `miAPI/app/routers/usuarios.py`
- [x] 2. Frontend: corregir `ConsultaUsuariosScreen.js` (doble setUsuarios)
- [x] 3. Frontend: corregir rutas `router.replace` en `DetallesUsuarioScreen.js` y `ActualizarUsuarioScreen.js`
- [x] 4. `app.json`: corregir el icon (usar `./assets/icon.png`)
- [x] 5. `eas.json`: agregar `appVersionSource`
- [x] 6. `package.json`: agregar `@expo/vector-icons` y `expo-font`
- [x] 7. Instalar/verificar dependencias (expo-doctor: 18/18 checks pasan)
- [x] 8. Configurar API URL para producción (APK) en `utils/api.js`
- [x] 9. Reiniciar el backend (Docker) para aplicar cambios de auth
- [x] 10. Verificado: GET/PUT/DELETE funcionan sin auth (curl OK)
- [x] 11. **Corregir permisos de `hermesc`** (EACCES) que bloqueaba la generación del APK
- [x] 12. Verificado: Android bundle genera .hbc correctamente (export OK)
- [ ] 13. Reconstruir el APK con `eas build`
