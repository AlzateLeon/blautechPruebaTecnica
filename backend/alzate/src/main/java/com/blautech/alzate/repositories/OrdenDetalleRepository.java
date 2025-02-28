package com.blautech.alzate.repositories;

import com.blautech.alzate.models.OrdenDetalleEntity;
import com.blautech.alzate.models.ProductoEntity;
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
