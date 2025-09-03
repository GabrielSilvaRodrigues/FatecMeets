package com.fatecmeets.backend.service;

import com.fatecmeets.backend.model.Usuario;
import com.fatecmeets.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Usuario cadastrar(String email, String senha) {
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setSenha(encoder.encode(senha));
        return usuarioRepository.save(usuario);
    }

    public Usuario autenticar(String email, String senha) {
        return usuarioRepository.findByEmail(email)
            .filter(u -> encoder.matches(senha, u.getSenha()))
            .orElse(null);
    }
}
