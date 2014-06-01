<?php
$http_request = array_merge($_GET, $_POST);

//----------------------------------------------------------------------------------------
if(!isset($http_request['action']))
{
    
}

//----------------------------------------------------------------------------------------
else if($http_request['action']=='send_msg')
{
    if(isset($http_request['email']) && isset($http_request['subject']) && isset($http_request['message']))
    {
        $to = 'philippe@nonuniversalnuts.com';//loic.guglielmino@gmail.com
        $email = $http_request['email'];
        $subject = $http_request['subject'];
        $message = " - from {$email} - \r\n" . $http_request['message'];
        
        /*$headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();*/

        mail($to, $subject, $message);
        
        echo "ok";
        
    }
}

//----------------------------------------------------------------------------------------
else
{
    
}