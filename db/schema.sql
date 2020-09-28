-- Drops the bootstocks_db if it exists currently --
DROP DATABASE IF EXISTS bootstocks;
-- Creates the "bootstocks_db" database --
CREATE DATABASE bootstocks;

-- Makes it so all of the following code will affect bootstocks_db --
USE bootstocks;

CREATE TABLE stocks (
  id serial,       -- int NOT NULL AUTO_INCREMENT --
  UserId varchar(100) NOT NULL,
  stock_symbol varchar(100) NOT NULL,
  CategoryId varchar(100) NOT NULL,
  buying_price decimal(10,2),       -- store any values b/w -99999999.99 to 99999999.99
  current_price decimal(10,2),
  stock_gain decimal(8,2),
  is_sold boolean,
  stock_quantity integer,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id, category_id),
  UNIQUE (buying_price)
);

CREATE TABLE categories (
  id serial,
  UserId integer NOT NULL,
  category_name varchar(100),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) 
 );