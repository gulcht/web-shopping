<?php
    
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


    $app->get('/cart/{id}', function (Request $request, Response $response, array $args){
        $id = $args['id'];
        $conn = $GLOBALS['connect'];
        $sql = "select products.name, orderamount.amount, orderamount.user_id, orderamount.product_id, products.image, products.price*orderamount.amount as price
        from orderamount, products, user
        where orderamount.product_id = products.product_id and orderamount.order_id is NULL and orderamount.user_id = user.user_id and user.user_id = ?" ;
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = array();
        foreach ($result as $row) {
            array_push($data, $row);
        }

        $response->getBody()->write(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK));
        return $response
            ->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withStatus(200);

    });

// $app->post('/cart/add', function (Request $request, Response $response, $args) {
//     $json = $request->getBody();
//     $jsonData = json_decode($json, true);

//     $conn = $GLOBALS['connect'];
//     $sql = 'insert into orderamount (product_id, amount, user_id) values (?,?,?)';
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param('iii', $jsonData['product_id'], $jsonData['amount'], $jsonData['user_id']);
//     $stmt->execute();
//     $affected = $stmt->affected_rows;
//     if ($affected > 0) {

//         $data = ["affected_rows" => $affected, "last_idx" => $conn->insert_id];
//         $response->getBody()->write(json_encode($data));
//         return $response
//             ->withHeader('Content-Type', 'application/json')
//             ->withStatus(200);
//     }
// });
$app->post('/cart/add', function (Request $request, Response $response, $args) {
    $json = $request->getBody();
    $jsonData = json_decode($json, true);

    $conn = $GLOBALS['connect'];

    $sql = "
        IF EXISTS (
            SELECT * FROM orderamount
            WHERE product_id = ? AND user_id = ? and order_id is NULL
        ) THEN
            BEGIN
                UPDATE orderamount SET amount = amount + ?
                WHERE product_id = ? AND user_id = ?;
            END;
        ELSE
            BEGIN
                INSERT INTO orderamount (product_id, amount, user_id)
                VALUES (?, ?, ?);
            END;
        END IF;
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iiiiiiii', $jsonData['product_id'], $jsonData['user_id'], $jsonData['amount'], $jsonData['product_id'], $jsonData['user_id'], $jsonData['product_id'], $jsonData['amount'], $jsonData['user_id']);
    $stmt->execute();
    $affected = $stmt->affected_rows;

    if ($affected > 0) {
        $data = ["affected_rows" => $affected, "last_idx" => $conn->insert_id];
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    } else {
        return $response->withStatus(500);
    }
});

$app->delete('/cart/delete/{user_id}/{product_id}', function (Request $request, Response $response, $args) {
    $product_id = $args['product_id'];
    $user_id = $args['user_id'];
    $conn = $GLOBALS['connect'];
    $sql = 'delete from orderamount where product_id = ? and user_id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $product_id, $user_id);
    $stmt->execute();
    $affected = $stmt->affected_rows;
    if ($affected > 0) {
        $data = ["affected_rows" => $affected];
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
});


$app->put('/cart/stepUp', function (Request $request, Response $response, $args) {
    $json = $request->getBody();
    $jsonData = json_decode($json, true);
    $conn = $GLOBALS['connect'];
    $sql = 'UPDATE orderamount SET amount = amount + 1 WHERE product_id = ? AND user_id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $jsonData['product_id'], $jsonData['user_id']);
    $stmt->execute();
    $affected = $stmt->affected_rows;
    if ($affected > 0) {
        $data = ["affected_rows" => $affected];
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
});

$app->put('/cart/stepDown', function (Request $request, Response $response, $args) {
    $json = $request->getBody();
    $jsonData = json_decode($json, true);
    $conn = $GLOBALS['connect'];
    $sql = 'UPDATE orderamount SET amount = amount - 1 WHERE product_id = ? AND user_id = ?;';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $jsonData['product_id'], $jsonData['user_id']);
    $stmt->execute();
    $affected = $stmt->affected_rows;
    if ($affected > 0) {
        $data = ["affected_rows" => $affected];
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }
});

$app->post('/customer/buy', function (Request $request, Response $response, $args) {
    $json = $request->getBody();
    $jsonData = json_decode($json, true);
    $conn = $GLOBALS['connect'];

    // Insert new order
    $sql = 'INSERT INTO orders (name, address, phone, user_id) VALUES (?,?,?,?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssi', $jsonData['name'], $jsonData['address'], $jsonData['phone'], $jsonData['user_id']);
    $stmt->execute();
    $affected = $stmt->affected_rows;
    if ($affected <= 0) {
        // Error handling if insert fails
        $data = ["error" => "Failed to insert order"];
        $response->getBody()->write(json_encode($data));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(400);
    }

    // Update orderamount table with new order ID
    $sql = 'UPDATE orderamount SET order_id = (
        SELECT order_id FROM orders WHERE user_id = ? ORDER BY order_id DESC LIMIT 1
    ) WHERE user_id = ? AND order_id IS NULL';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $jsonData['user_id'], $jsonData['user_id']);
    $stmt->execute();
    $affected = $stmt->affected_rows;

    // Return success response
    $data = ["affected_rows" => $affected];
    $response->getBody()->write(json_encode($data));
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(200);
});

$app->get('/cart/totalPrice/{id}', function (Request $request, Response $response, array $args){
    $id = $args['id'];
    $conn = $GLOBALS['connect'];
    $sql = "select sum(products.price*orderamount.amount) as total
    from orderamount, products
    where orderamount.product_id = products.product_id and orderamount.order_id is NULL and orderamount.user_id = ?" ;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = array();
    foreach ($result as $row) {
        array_push($data, $row);
    }

    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK));
    return $response
        ->withHeader('Content-Type', 'application/json; charset=utf-8')
        ->withStatus(200);

});

$app->get('/order/{id}', function (Request $request, Response $response, $args) {
    $conn = $GLOBALS['connect'];
    $id = $args['id'];
    $sql = 'select orders.order_id, orders.date, orders.name, orders.address, orders.phone, status.name as status 
    from orders,status 
    where orders.status_id = status.status_id and orders.user_id = ?
    order by orders.order_id';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = array();
    foreach ($result as $row) {
        array_push($data, $row);
    }
    $response->getBody()->write(json_encode($data, JSON_UNESCAPED_UNICODE));
    return $response
        ->withHeader('Content-Type', 'application/json; charset=utf-8')
        ->withStatus(200);
});

?>

