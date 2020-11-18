<?php

namespace App;

use Ixudra\Curl\Facades\Curl;

class SMS
{

    private $API_Key = "";
    private $API_Secret = "";
    private $APIURL = "https://RestfulSms.com/";
    private $phone = "";

    public function __construct($phone)
    {
        $this->API_Key = env("TOKEN_SMS", "JmvEVPITlcakqwPnAvpsGFSwBm");
        $this->API_Secret = env("PASS_SMS", "1c4753384f0c32b4fdb35c19");
        $this->phone = $phone;
    }

    public static function makeParameter($key, $value)
    {
        return array("Parameter" => $key, "ParameterValue" => $value);
    }

    /**
     * Gets API Verification Code Url.
     *
     * @return string Indicates the Url
     */
    protected function getAPIVerificationCodeUrl()
    {
        return "api/VerificationCode";
    }

    /**
     * Gets API Ultra Fast Send Url.
     *
     * @return string Indicates the Url
     */
    protected function getAPIUltraFastSendUrl()
    {
        return "api/UltraFastSend";
    }

    /**
     * Gets Api Token Url.
     *
     * @return string Indicates the Url
     */
    protected function getApiTokenUrl()
    {
        return "api/Token";
    }

    public function sendUltraFastSMS($parameters, $template)
    {
        $token = $this->_getToken();
        if ($token != false) {
            $postData = array(
                "ParameterArray" => $parameters,
                "Mobile" => $this->phone,
                "TemplateId" => $template,
            );

            $url = $this->APIURL . $this->getAPIUltraFastSendUrl();
            $UltraFastSend = $this->_execute($postData, $url, $token);
            $object = (object) $UltraFastSend;
            $result = true;
            if (is_object($object)) {
                $result = true;
            } else {
                $result = false;
            }
        } else {
            $result = false;
        }
        return $result;
    }

    /**
     * Verification Code.
     *
     * @param string $Code         Code
     * @param string $MobileNumber Mobile Number
     *

     * @return string Indicates the sent sms result
     */
    public function verificationCode($Code)
    {
        $token = $this->_getToken();
        if ($token != false) {
            $postData = array(
                'Code' => $Code,
                'MobileNumber' => $this->phone,
            );

            $url = $this->APIURL . $this->getAPIVerificationCodeUrl();
            $VerificationCode = $this->_execute($postData, $url, $token);
            $object = (object) $VerificationCode;
            $result = false;
            if (is_object($object)) {
                $result = $object;
            } else {
                $result = false;
            }
        } else {
            $result = false;
        }
        return $result;
    }

    /**
     * Gets token key for all web service requests.
     *
     * @return string Indicates the token key
     */
    private function _getToken()
    {
        $postData = array(
            'UserApiKey' => $this->API_Key,
            'SecretKey' => $this->API_Secret,
            'System' => 'php_rest_v_2_0',
        );

        $result = Curl::to($this->APIURL . $this->getApiTokenUrl())->
            withContentType('application/json')->withData($postData)->asJson(true)->post();
        $result = (object) $result;
        $resp = false;
        $IsSuccessful = '';
        $TokenKey = '';
        $IsSuccessful = $result->IsSuccessful;
        if ($IsSuccessful == true) {
            $TokenKey = $result->TokenKey;
            $resp = $TokenKey;
        } else {
            $resp = false;
        }

        return $resp;
    }

    /**
     * Executes the main method.
     *
     * @param postData[] $postData array of json data
     * @param string     $url      url
     * @param string     $token    token string
     *
     * @return string Indicates the curl execute result
     */
    private function _execute($postData, $url, $token)
    {
        $result = Curl::to($url)
            ->withHeader('x-sms-ir-secure-token: ' . $token)->
            withContentType('application/json')->withData($postData)->asJson(true)->post();
        return $result;
    }

}
