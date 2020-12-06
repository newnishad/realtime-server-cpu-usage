<?php
  function get_server_cpu_usage(){

      $load = sys_getloadavg();
      return $load[0];

  }

  $response = array(
    "status" => true,
    "cpu" => get_server_cpu_usage()
  );

  echo json_encode($response);
?>