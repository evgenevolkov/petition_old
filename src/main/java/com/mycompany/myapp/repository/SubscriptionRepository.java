package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Subscription;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Subscription entity.
 */
public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {

    @Query("select distinct subscription from Subscription subscription left join fetch subscription.users left join fetch subscription.petitions")
    List<Subscription> findAllWithEagerRelationships();

    @Query("select subscription from Subscription subscription left join fetch subscription.users left join fetch subscription.petitions where subscription.id =:id")
    Subscription findOneWithEagerRelationships(@Param("id") Long id);

}
