<?php

class Tools {
    
    public function sanitize($string) {
        $string = htmlspecialchars(strip_tags($string));
        return $string;
    }

}