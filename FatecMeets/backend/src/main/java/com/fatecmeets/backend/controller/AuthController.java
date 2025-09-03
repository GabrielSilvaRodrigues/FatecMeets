package com.fatecmeets.backend.controller;

import com.fatecmeets.backend.model.Usuario;
import com.fatecmeets.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/signup")
    public Usuario signup(@RequestBody Map<String, String> body) {
        return usuarioService.cadastrar(body.get("email"), body.get("senha"));
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        Usuario usuario = usuarioService.autenticar(body.get("email"), body.get("senha"));
        if (usuario == null) {
            return Map.of("error", "Credenciais inválidas");
        }
        // JWT fake (apenas para exemplo)
        String token = usuario.getEmail() + "-token";
        return Map.of("token", token, "usuario", usuario.getEmail());
    }
}
