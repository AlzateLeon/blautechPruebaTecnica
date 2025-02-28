package com.login.login.repository;

import com.login.login.entities.OrdenDetalleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdenDetalleRepository extends JpaRepository<OrdenDetalleEntity, Long> {

    @Query("SELECT od FROM OrdenDetalleEntity od WHERE od.orden.id = :ordenId")
    List<OrdenDetalleEntity> findProductosByOrdenId(@Param("ordenId") Long ordenId);
}
