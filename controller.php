<?php
include_once 'tools.php';
$http_request = array_merge($_GET, $_POST);

//----------------------------------------------------------------------------------------
if(!isset($http_request['action']))
{
    
}

//----------------------------------------------------------------------------------------
else if($http_request['action']=='send_msg')
{
    if(isset($http_request['interest'])
        && isset($http_request['areyou'])
        && isset($http_request['email']) 
        && isset($http_request['subject']) 
        && isset($http_request['message']))
    {
        $oTools = new Tools;
        
        $interest = $oTools->sanitize($http_request['interest']);
        $areyou = $oTools->sanitize($http_request['areyou']);
        $to = 'philippe@nonuniversalnuts.com';
//        $to = 'loic.guglielmino@gmail.com';
        $email = $oTools->sanitize($http_request['email']);
        $subject = "Message from Nun: " . $oTools->sanitize($http_request['subject']);
        $message = 
            "Interesting in: " . $interest
            . "\r\n\r\n"
            . "Are you: " . $areyou
            . "\r\n\r\n"
            . "From: " . $email
            . "\r\n\r\n"
            . "Subject: " . $http_request['subject'] 
            . "\r\n\r\n"
            . "Message: \r\n" . $oTools->sanitize($http_request['message']);
        
        $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        $result = mail($to, $subject, $message, $headers);
        
        if($result) {
            echo "ok";
        }
        else {
            echo "nok";
        }
    }
    else
    {
        echo "nok";
    }
}

//----------------------------------------------------------------------------------------
else
{
    
}