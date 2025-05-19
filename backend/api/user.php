<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

    $app->post('/register', function (Request $request, Response $response,array $args) {
        $json = $request->getBody();
        $jsonData = json_decode($json, true);
        $conn = $GLOBALS['connect'];
        $sql = 'insert into user (email, password, name) values (?, ?, ?)';
        $hash = password_hash($jsonData['password'], PASSWORD_DEFAULT);
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sss', $jsonData['email'], $hash, $jsonData['name']);
        $stmt->execute();
        $affected = $stmt->affected_rows;
        if ($affected > 0) {
            $data = ["affected_rows" => $affected, "last_idx" => $conn->insert_id];
            $response->getBody()->write(json_encode($data));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(200);
              
        }
    });



 #login data
 $app->post('/login', function (Request $request, Response $response,array $args) {
    $json = $request->getBody();
    $jsonData = json_decode($json, true);

    $conn = $GLOBALS['connect'];
    $sql = 'select user_id, name, role, password from user where email = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $jsonData['email']);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = array();
    foreach ($result as $row) {
        if (password_verify($jsonData['password'], $row['password'])) {
            $data['user_id'] = $row['user_id'];
            $data['name'] = $row['name'];
            $data['role'] = $row['role'];
        }
    }
    $body = $response->getBody();
    $body->write(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK));
    return $response
        ->withHeader('Content-Type', 'application/json; charset=utf-8')
        ->withStatus(200);
});

$app->post('/user/logout', function (Request $request, Response $response, array $args) {
    // Clear the session data for the logged-in user
    // This could involve removing session variables, deleting session files, or any other necessary cleanup

    // Return a success message to the client
    $data = array('message' => 'Logged out successfully');
    $body = $response->getBody();
    $body->write(json_encode($data, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK));
    return $response
        ->withHeader('Content-Type', 'application/json; charset=utf-8')
        ->withStatus(200);
});


?>