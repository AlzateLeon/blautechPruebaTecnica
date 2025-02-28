package com.login.login.repository;

import com.login.login.entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {

    @Query("SELECT u FROM UsuarioEntity u WHERE u.email = :email AND u.password = :password")
    Optional<UsuarioEntity> buscarPorEmailYPassword(@Param("email") String email,
                                                    @Param("password") String password);

    Optional<UsuarioEntity> findByEmail(String email);

}
