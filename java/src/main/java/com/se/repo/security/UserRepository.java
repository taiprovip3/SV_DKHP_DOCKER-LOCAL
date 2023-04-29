package com.se.repo.security;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.se.entity.security.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	@Query("SELECT u FROM User u WHERE u.username = ?1")
	public User findByUsername(String username);
}
