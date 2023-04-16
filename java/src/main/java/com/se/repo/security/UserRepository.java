package com.se.repo.security;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.se.entity.security.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	public User findByUsername(String username);
}
