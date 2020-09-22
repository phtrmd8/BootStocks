-- Drops the stock_db if it exists currently --
DROP DATABASE IF EXISTS portfolio_db;
-- Creates the "stock_db" database --
CREATE DATABASE portfolio_db;

-- Makes it so all of the following code will affect stock_db --
USE portfolio_db;

CREATE TABLE stocks (
  id serial,       -- int NOT NULL AUTO_INCREMENT --
  user_id varchar(100) NOT NULL,
  stock_name varchar(100) NOT NULL,
  category_id varchar(100) NOT NULL,
  buying_price ,
  stock_gain ,
  is_sold ,
  stock_quantity ,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id, category_id),
  UNIQUE (buying_price)
);

CREATE TABLE categories (
  id serial,
  user_id integer NOT NULL,
  category_name varchar(100),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) 
);
