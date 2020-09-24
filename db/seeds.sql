-- @ least 3 items: user_id, stock_symbol, price, current price, stock quantity

INSERT INTO stocks (id, user_id, stock_symbol, category_id, buying_price, stock_gain, is_sold, stock_quantity) VALUES
-- (1, 1, AAPL, 1, 107.12, 20, ),
-- (2, 2, TSLA, 1, 380.36,	10, ),
-- (3, 3, AMZN, 1, 2999.86, 5, );

INSERT INTO categories (id, user_id, category_name) VALUES
(1, 1, Technology),
(2, 1, Utilities),
(3, 1, Healthcare);