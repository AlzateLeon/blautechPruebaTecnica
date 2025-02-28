package com.login.login.repository;

import com.login.login.entities.OrdenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<OrdenEntity, Long> {

    Optional<OrdenEntity> findByUsuarioIdAndPagadoFalse(Long usuarioId);

    List<OrdenEntity> findByUsuarioIdAndPagadoTrue(Long usuarioId);

}
