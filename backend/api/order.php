<?php
    
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

$app->get('/orderdetails/{id}', function (Request $request, Response $response, array $args){
    $conn = $GLOBALS['connect'];
    $sql = "select products.name, orderamount.amount, orderamount.user_id, orderamount.product_id, products.price*orderamount.amount as price
    from orderamount, products
    where orderamount.product_id = products.product_id and orderamount.order_id = ? " ;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $args['id']);
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
?>