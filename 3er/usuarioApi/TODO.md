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
- [x] 13. Reconstruir el APK con `eas build`

## Nuevos pasos - Conectar API con app móvil

- [x] 14. `screens/DetallesUsuarioScreen.js`: usar `getApiUrl()` dinámico en lugar de `API_URL` estático
- [x] 15. `screens/ActualizarUsuarioScreen.js`: usar `getApiUrl()` dinámico en lugar de `API_URL` estático
- [x] 16. `screens/AltaUsuariosScreen.js`: usar `getApiUrl()` dinámico en lugar de `API_URL` estático
- [x] 17. `../miAPI/app/main.py`: ampliar CORS para permitir cualquier origen en desarrollo
- [x] 18. Reiniciar backend Docker para aplicar cambios CORS
- [x] 19. Configurar IP definitiva `192.168.0.128` en `app.json` y `utils/api.js`
- [x] 20. Verificado: API responde en `http://192.168.0.128:5000/v1/usuarios/` (7 usuarios)
- [x] 21. APK reconstruido con IP definitiva `192.168.0.128` (build c546b969, commit 393bd3f)
- [x] 22. QR de descarga directa del APK: https://expo.dev/artifacts/eas/pzGSMj_kc_CKa8bLPOydiLXPgjBsvAWY0R1_LdfvM98.apk
