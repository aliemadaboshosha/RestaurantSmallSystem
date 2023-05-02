create database RestaurantDB ;
use RestaurantDB;

CREATE TABLE MenuItem (
    MenuItemId INT PRIMARY KEY IDENTITY(1, 1),
    Name VARCHAR(50) NOT NULL,
    Image VARCHAR(200) NOT NULL
);

CREATE TABLE Sizes (
    SizeId INT PRIMARY KEY IDENTITY(1, 1),
    Name VARCHAR(50) NOT NULL
);

CREATE TABLE MenuItemSizes (
    MenuItemId INT NOT NULL,
    SizeId INT NOT NULL,
    Price DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (MenuItemId, SizeId),
    FOREIGN KEY (MenuItemId) REFERENCES MenuItem(MenuItemId) ON DELETE CASCADE,
    FOREIGN KEY (SizeId) REFERENCES Sizes(SizeId) ON DELETE CASCADE
);

CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY(1, 1),
    OrderDate DATETIME NOT NULL,
    CustomerName VARCHAR(50) NOT NULL,
    CustomerPhone VARCHAR(20) NOT NULL,
    CustomerEmail VARCHAR(100) NOT NULL,
    CustomerAddress VARCHAR(100) NOT NULL
);

CREATE TABLE OrderItem (
    OrderId INT NOT NULL,
    MenuItemId INT NOT NULL,
    SizeId INT NOT NULL,
    Quantity INT NOT NULL,
    PRIMARY KEY (OrderId, MenuItemId, SizeId),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (MenuItemId) REFERENCES MenuItem(MenuItemId) ON DELETE CASCADE,
    FOREIGN KEY (SizeId) REFERENCES Sizes(SizeId) ON DELETE CASCADE
);





INSERT INTO MenuItem (Name, Image)
VALUES ('Hamburger', 'hamburger.jpg'),
       ('Cheeseburger', 'cheeseburger.jpg'),
       ('Chicken Sandwich', 'chicken_sandwich.jpg'),
       ('French Fries', 'french_fries.jpg'),
       ('Onion Rings', 'onion_rings.jpg'),
       ('Soft Drink', 'soft_drink.jpg'),
       ('Milkshake', 'milkshake.jpg');

INSERT INTO Sizes (Name)
VALUES
    ('Small'),
    ('Medium'),
    ('Large');

INSERT INTO MenuItemSizes (MenuItemId, SizeId, Price)
VALUES (1, 1, 5.99), (1, 2, 6.99), (1, 3, 7.99),
       (2, 1, 6.99), (2, 2, 7.99), (2, 3, 8.99),
       (3, 1, 7.99), (3, 2, 8.99), (3, 3, 9.99),
       (4, 1, 2.99), (4, 2, 3.99), (4, 3, 4.99),
       (5, 1, 3.99), (5, 2, 4.99), (5, 3, 5.99),
       (6, 1, 1.99), (6, 2, 2.99), (6, 3, 3.99),
       (7, 1, 4.99), (7, 2, 5.99), (7, 3, 6.99);

INSERT INTO Orders (OrderDate, CustomerName, CustomerPhone, CustomerEmail, CustomerAddress)
VALUES
    ('2023-04-27 10:30:00', 'John Smith', '555-1234', 'john@example.com', '123 Main St.'),
    ('2023-04-27 12:45:00', 'Jane Doe', '555-5678', 'jane@example.com', '456 Broadway');

INSERT INTO OrderItem (OrderId, MenuItemId, SizeId, Quantity)
VALUES (1, 1, 2, 1), (1, 3, 1, 2), (1, 5, 3, 1),
       (2, 2, 1, 1), (2, 4, 2, 2), (2, 6, 3, 3);


